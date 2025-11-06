import { useRef, useCallback, useEffect } from 'react';
import type { ChordBlock, DrumBlock, DrumPattern } from '../types/music';
import type { Player } from 'soundfont-player';

interface ScheduledEvent {
  blockId: string;
  scheduledTime: number;
}

interface UsePlaybackOptions {
  tempo: number;
  chordBlocks: ChordBlock[];
  drumBlocks: DrumBlock[];
  drumPatterns: DrumPattern[];
  loop: boolean;
  eighthsPerMeasure: number;
  isPlaying: boolean;
  playChord: (frequencies: number[]) => void;
  playKick: (time?: number) => void;
  playSnare: (time?: number) => void;
  playHiHat: (time?: number) => void;
  onTimeUpdate?: (timeInEighths: number) => void;
  onPlaybackEnd?: () => void;
}

const LOOKAHEAD_TIME = 0.1;
const SCHEDULE_INTERVAL = 25;

export function usePlayback({
  tempo,
  chordBlocks,
  drumBlocks,
  drumPatterns,
  loop,
  eighthsPerMeasure,
  isPlaying,
  playChord,
  playKick,
  playSnare,
  playHiHat,
  onTimeUpdate,
  onPlaybackEnd,
}: UsePlaybackOptions) {
  const isPlayingRef = useRef(false);
  const schedulerIdRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const rafIdRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const currentTimeInEighthsRef = useRef<number>(0);
  const scheduledEventsRef = useRef<ScheduledEvent[]>([]);

  const getSecondsPerEighth = useCallback(() => {
    return (60 / tempo) / 2;
  }, [tempo]);

  const getTotalDurationInEighths = useCallback(() => {
    // Calculate duration from chord blocks
    const chordDuration = chordBlocks.length > 0
      ? Math.max(...chordBlocks.map(b => b.position + b.duration))
      : 0;

    // Calculate duration from drum blocks
    const drumDuration = drumBlocks.length > 0
      ? Math.max(...drumBlocks.map(b => b.position + b.duration))
      : 0;

    // Return the longer of the two
    return Math.max(chordDuration, drumDuration);
  }, [chordBlocks, drumBlocks]);

  const scheduleChord = useCallback(
    (block: ChordBlock, when: number) => {
      if (!instrument || !audioContext) return;

      const frequencies = getChordFrequenciesForBlock(block);
      const durationInSeconds = block.duration * getSecondsPerEighth();

      frequencies.forEach((freq) => {
        const midiNote = frequencyToMidi(freq);
        instrument.play(midiNote, audioContext.currentTime + when, {
          duration: durationInSeconds,
          gain: 0.6,
        });
      });
    },
    [instrument, audioContext, getSecondsPerEighth]
  );

  const scheduleDrumHit = useCallback(
    (drumType: 'kick' | 'snare' | 'hihat', when: number) => {
      if (!audioContext) return;

      const absoluteTime = audioContext.currentTime + when;

      if (drumType === 'kick') playKick(absoluteTime);
      else if (drumType === 'snare') playSnare(absoluteTime);
      else if (drumType === 'hihat') playHiHat(absoluteTime);
    },
    [audioContext, playKick, playSnare, playHiHat]
  );

  const scheduleAheadEvents = useCallback(() => {
    if (!audioContext || !isPlayingRef.current) return;

    const currentTime = audioContext.currentTime;
    const elapsedTime = currentTime - startTimeRef.current;
    const currentTimeInEighths = elapsedTime / getSecondsPerEighth();

    const scheduleAheadTime = currentTimeInEighths + (LOOKAHEAD_TIME / getSecondsPerEighth());

    // Schedule chord blocks
    for (const block of chordBlocks) {
      const blockStartTime = block.position;

      const alreadyScheduled = scheduledEventsRef.current.some(
        (event) => event.blockId === block.id && event.scheduledTime === blockStartTime
      );

      if (alreadyScheduled) continue;

      if (blockStartTime >= currentTimeInEighths && blockStartTime < scheduleAheadTime) {
        const timeUntilBlock = blockStartTime - currentTimeInEighths;
        const whenToPlay = timeUntilBlock * getSecondsPerEighth();

        scheduleChord(block, whenToPlay);

        scheduledEventsRef.current.push({
          blockId: block.id,
          scheduledTime: blockStartTime,
        });
      }
    }

    // Schedule drum blocks
    for (const block of drumBlocks) {
      const pattern = drumPatterns.find(p => p.id === block.patternId);
      if (!pattern) continue;

      // Calculate how many times the pattern repeats in this block
      const patternLengthInEighths = pattern.measures * 8; // 8 eighths per measure

      // Schedule each repeat of the pattern
      for (let repeat = 0; repeat < block.repeatCount; repeat++) {
        const repeatStartTime = block.position + (repeat * patternLengthInEighths);

        // Schedule each step in the pattern (16 steps per measure)
        const stepsPerMeasure = 16;
        const totalSteps = pattern.measures * stepsPerMeasure;

        for (let step = 0; step < totalSteps; step++) {
          // Each step is 1/2 eighth note
          const stepTime = repeatStartTime + (step * 0.5);

          const eventId = `drum-${block.id}-${repeat}-${step}`;
          const alreadyScheduled = scheduledEventsRef.current.some(
            (event) => event.blockId === eventId && event.scheduledTime === stepTime
          );

          if (alreadyScheduled) continue;

          if (stepTime >= currentTimeInEighths && stepTime < scheduleAheadTime) {
            const timeUntilStep = stepTime - currentTimeInEighths;
            const whenToPlay = timeUntilStep * getSecondsPerEighth();

            // Use modulo to wrap around if pattern is shorter than total steps
            const patternStep = step % (pattern.measures * stepsPerMeasure);

            if (pattern.kick[patternStep]) scheduleDrumHit('kick', whenToPlay);
            if (pattern.snare[patternStep]) scheduleDrumHit('snare', whenToPlay);
            if (pattern.hihat[patternStep]) scheduleDrumHit('hihat', whenToPlay);

            scheduledEventsRef.current.push({
              blockId: eventId,
              scheduledTime: stepTime,
            });
          }
        }
      }
    }
  }, [
    audioContext,
    chordBlocks,
    drumBlocks,
    drumPatterns,
    getSecondsPerEighth,
    scheduleChord,
    scheduleDrumHit,
  ]);

  const pause = useCallback(() => {
    if (!isPlayingRef.current) return;

    isPlayingRef.current = false;

    if (schedulerIdRef.current) {
      clearInterval(schedulerIdRef.current);
      schedulerIdRef.current = null;
    }

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const updatePlayhead = useCallback(() => {
    if (!audioContext || !isPlayingRef.current) return;

    const currentTime = audioContext.currentTime;
    const elapsedTime = currentTime - startTimeRef.current;
    const currentTimeInEighths = elapsedTime / getSecondsPerEighth();

    currentTimeInEighthsRef.current = currentTimeInEighths;

    if (onTimeUpdate) {
      onTimeUpdate(currentTimeInEighths);
    }

    const totalDuration = getTotalDurationInEighths();

    if (currentTimeInEighths >= totalDuration) {
      if (loop) {
        startTimeRef.current = audioContext.currentTime;
        currentTimeInEighthsRef.current = 0;
        scheduledEventsRef.current = [];
        scheduleAheadEvents();
      } else {
        pause();
        currentTimeInEighthsRef.current = 0;
        scheduledEventsRef.current = [];
        if (onTimeUpdate) {
          onTimeUpdate(0);
        }
        if (onPlaybackEnd) {
          onPlaybackEnd();
        }
        return;
      }
    }

    rafIdRef.current = requestAnimationFrame(updatePlayhead);
  }, [
    audioContext,
    getSecondsPerEighth,
    getTotalDurationInEighths,
    loop,
    onTimeUpdate,
    onPlaybackEnd,
    pause,
    scheduleAheadEvents,
  ]);

  const play = useCallback(() => {
    if (!audioContext || !instrument) return;
    // Allow playback if there are either chord blocks or drum patterns
    if (chordBlocks.length === 0 && drumPatterns.length === 0) return;
    if (isPlayingRef.current) return;

    if (audioContext.state === 'suspended') {
      audioContext.resume();
    }

    isPlayingRef.current = true;
    startTimeRef.current = audioContext.currentTime;
    currentTimeInEighthsRef.current = 0;
    scheduledEventsRef.current = [];

    scheduleAheadEvents();

    schedulerIdRef.current = setInterval(() => {
      scheduleAheadEvents();
    }, SCHEDULE_INTERVAL);

    rafIdRef.current = requestAnimationFrame(updatePlayhead);
  }, [audioContext, instrument, chordBlocks, drumPatterns, scheduleAheadEvents, updatePlayhead]);

  const stop = useCallback(() => {
    pause();
    currentTimeInEighthsRef.current = 0;
    scheduledEventsRef.current = [];
    if (onTimeUpdate) {
      onTimeUpdate(0);
    }
  }, [pause, onTimeUpdate]);

  useEffect(() => {
    return () => {
      if (schedulerIdRef.current) {
        clearInterval(schedulerIdRef.current);
      }
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return {
    play,
    pause,
    stop,
    isPlaying: isPlayingRef.current,
    currentTimeInEighths: currentTimeInEighthsRef.current,
  };
}

function getChordFrequenciesForBlock(block: ChordBlock): number[] {
  const rootFreq = noteToFrequency(block.rootNote, 4);
  const frequencies = [rootFreq];

  block.intervals.forEach((interval) => {
    const freq = rootFreq * Math.pow(2, interval / 12);
    frequencies.push(freq);
  });

  return frequencies;
}

function noteToFrequency(note: string, octave: number): number {
  const A4 = 440;
  const notes: { [key: string]: number } = {
    'C': -9, 'C#': -8, 'D': -7, 'D#': -6, 'E': -5, 'F': -4,
    'F#': -3, 'G': -2, 'G#': -1, 'A': 0, 'A#': 1, 'B': 2
  };

  const semitonesFromA4 = notes[note] + (octave - 4) * 12;
  return A4 * Math.pow(2, semitonesFromA4 / 12);
}

function frequencyToMidi(frequency: number): number {
  return Math.round(69 + 12 * Math.log2(frequency / 440));
}

