import React, { useMemo, useRef } from 'react';
import { useMusic } from '../hooks/useMusic';
import { usePianoLayout } from '../hooks/usePianoLayout';
import { useGlissando } from '../hooks/useGlissando';
import { PianoKey } from './PianoKey';
import { generatePianoKeys, getWhiteKeyCount } from '../utils/pianoUtils';
import { getScaleNotes, NOTES } from '../utils/musicTheory';
import type { Note } from '../types/music';
import './Piano.css';

interface PianoProps {
  startOctave?: number;
  octaveCount?: number;
  showScaleDegrees?: boolean;
  flexible?: boolean; // Enable dynamic width (octave count) based on container
  adjustHeight?: boolean; // Enable dynamic height adjustment (disabled by default)
}

export function Piano({
  startOctave = 4,
  octaveCount = 2,
  showScaleDegrees = false,
  flexible = true,
  adjustHeight = false
}: PianoProps) {
  const { state, audio } = useMusic();
  const pianoContainerRef = useRef<HTMLDivElement>(null);

  // Use flexible layout if enabled
  const layout = usePianoLayout(pianoContainerRef as React.RefObject<HTMLDivElement>, {
    startOctave,
    octaveCount,
    adjustHeight,
  });

  // Use layout values if flexible, otherwise use props
  const effectiveStartOctave = flexible ? layout.startOctave : startOctave;
  const effectiveOctaveCount = flexible ? layout.octaveCount : octaveCount;

  // Generate piano keys
  const keys = useMemo(() => {
    return generatePianoKeys(effectiveStartOctave, effectiveOctaveCount);
  }, [effectiveStartOctave, effectiveOctaveCount]);

  const whiteKeyCount = useMemo(() => getWhiteKeyCount(keys), [keys]);

  // Get scale notes for highlighting
  const scaleNotes = useMemo(() => {
    const notes = getScaleNotes(state.song.key, state.song.mode);
    return new Set(notes);
  }, [state.song.key, state.song.mode]);

  // Get chord notes for highlighting
  const chordNotes = useMemo(() => {
    const notes = new Set<Note>();
    state.selectedChords.forEach((chord) => {
      const rootIndex = NOTES.indexOf(chord.rootNote);
      chord.intervals.forEach((interval) => {
        const noteIndex = (rootIndex + interval) % 12;
        notes.add(NOTES[noteIndex]);
      });
    });
    return notes;
  }, [state.selectedChords]);

  const handleKeyPress = async (frequency: number) => {
    await audio.playNote(frequency);
  };

  // Unified glissando support for both mouse and touch
  const { isActive: isGlissandoActive, handlers: glissandoHandlers } = useGlissando({
    onTrigger: async (keyNote: string) => {
      const keyData = keys.find(k => k.note === keyNote);
      if (keyData) {
        await audio.playNote(keyData.frequency);
      }
    },
    selector: '.piano-key',
    getIdentifier: (element) => element.getAttribute('aria-label'),
    preventDefault: true,
  });

  return (
    <div className="piano" ref={pianoContainerRef}>
      <div
        className={`piano-keys ${isGlissandoActive ? 'glissando-active' : ''}`}
        style={{
          '--white-key-count': whiteKeyCount,
          '--white-key-width': flexible ? `${layout.whiteKeyWidth}px` : undefined,
          '--white-key-height': flexible ? `${layout.whiteKeyHeight}px` : undefined,
          '--black-key-width': flexible ? `${layout.blackKeyWidth}px` : undefined,
          '--black-key-height': flexible ? `${layout.blackKeyHeight}px` : undefined,
        } as React.CSSProperties}
        {...glissandoHandlers}
      >
        {keys.map((keyData) => (
          <PianoKey
            key={keyData.note}
            keyData={keyData}
            onPress={handleKeyPress}
            isInScale={state.showInScaleColors && scaleNotes.has(keyData.baseNote)}
            isInChord={chordNotes.has(keyData.baseNote)}
            showScaleDegree={showScaleDegrees}
            selectedKey={state.song.key}
            mode={state.song.mode}
            showScaleLabels={scaleNotes.has(keyData.baseNote)}
          />
        ))}
      </div>
    </div>
  );
}
