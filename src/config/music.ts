/**
 * Music Configuration
 * 
 * Centralized configuration for all music theory constants including:
 * - Notes and scales
 * - Piano ranges
 * - Key groupings (sharp vs flat keys)
 * - Default song parameters
 * - MIDI constants
 * 
 * This file enables easy music theory customization.
 */

import type { Note, Mode } from '../types/music';

/**
 * All 12 chromatic notes
 * Using sharp enharmonics by default
 */
export const NOTES: Note[] = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
] as const;

/**
 * Key groupings by enharmonic spelling preference
 * Based on circle of fifths conventions
 */
export const KEY_GROUPS = {
  /**
   * Sharp keys: Use sharp enharmonics (C, G, D, A, E, B, F#)
   * These keys have sharps in their key signatures
   */
  sharpKeys: ['C', 'G', 'D', 'A', 'E', 'B', 'F#'] as Note[],
  
  /**
   * Flat keys: Use flat enharmonics (F, A#/Bb, D#/Eb, G#/Ab, C#/Db)
   * These keys have flats in their key signatures
   */
  flatKeys: ['F', 'A#', 'D#', 'G#', 'C#'] as Note[],
} as const;

/**
 * Scale interval patterns (in semitones)
 */
export const SCALE_INTERVALS = {
  major: [0, 2, 4, 5, 7, 9, 11],
  minor: [0, 2, 3, 5, 7, 8, 10],
} as const;

/**
 * Piano range presets
 * MIDI note numbers where 60 = C4 (middle C)
 * Full piano range: A0 (21) to C8 (108) = 88 keys
 */
export const PIANO_RANGES = {
  /**
   * Full 88-key piano
   * A0 to C8
   */
  full88: {
    label: 'Full Piano (88 keys)',
    startMidi: 21,  // A0
    endMidi: 108,   // C8
    octaves: 7.25,
  },
  
  /**
   * 2 octaves centered on middle C
   * C4 to B5 (default for app)
   */
  twoOctaves: {
    label: '2 Octaves (C4-B5)',
    startMidi: 60,  // C4
    endMidi: 83,    // B5
    octaves: 2,
  },
  
  /**
   * 3 octaves for expanded range
   * C3 to B5
   */
  threeOctaves: {
    label: '3 Octaves (C3-B5)',
    startMidi: 48,  // C3
    endMidi: 83,    // B5
    octaves: 3,
  },
  
  /**
   * 4 octaves for wider range
   * C3 to B6
   */
  fourOctaves: {
    label: '4 Octaves (C3-B6)',
    startMidi: 48,  // C3
    endMidi: 95,    // B6
    octaves: 4,
  },
  
  /**
   * 5 octaves for very wide range
   * C2 to B6
   */
  fiveOctaves: {
    label: '5 Octaves (C2-B6)',
    startMidi: 36,  // C2
    endMidi: 95,    // B6
    octaves: 5,
  },
} as const;

/**
 * Default song configuration
 */
export const DEFAULT_SONG_CONFIG = {
  /**
   * Default tempo in beats per minute
   */
  tempo: 120,
  
  /**
   * Default time signature (4/4)
   */
  timeSignature: {
    numerator: 4,
    denominator: 4,
  },
  
  /**
   * Default key (C major)
   */
  key: 'C' as Note,
  
  /**
   * Default mode (major scale)
   */
  mode: 'major' as Mode,
  
  /**
   * Default song name
   */
  name: 'Untitled Song',
} as const;

/**
 * MIDI note number constants
 * For reference and calculations
 */
export const MIDI_NOTES = {
  /**
   * Middle C (C4) - standard reference point
   */
  MIDDLE_C: 60,
  
  /**
   * A4 (concert A) - standard tuning reference
   */
  A4: 69,
  
  /**
   * Piano range boundaries
   */
  PIANO_MIN: 21,  // A0
  PIANO_MAX: 108, // C8
  
  /**
   * MIDI value range
   */
  MIN: 0,
  MAX: 127,
} as const;

/**
 * Octave constants
 */
export const OCTAVE = {
  /**
   * Semitones per octave
   */
  SEMITONES: 12,
  
  /**
   * Notes per octave (including all chromatic notes)
   */
  NOTES: 12,
  
  /**
   * Frequency ratio between octaves
   */
  FREQUENCY_RATIO: 2,
} as const;

/**
 * Time signature presets
 */
export const TIME_SIGNATURES = {
  '4/4': { label: '4/4 (Common Time)', numerator: 4, denominator: 4 },
  '3/4': { label: '3/4 (Waltz)', numerator: 3, denominator: 4 },
  '6/8': { label: '6/8 (Compound)', numerator: 6, denominator: 8 },
  '2/4': { label: '2/4 (March)', numerator: 2, denominator: 4 },
  '5/4': { label: '5/4 (Jazz)', numerator: 5, denominator: 4 },
  '7/8': { label: '7/8 (Odd Meter)', numerator: 7, denominator: 8 },
} as const;

/**
 * Common tempo ranges and labels
 */
export const TEMPO_RANGES = {
  largo: { min: 40, max: 60, label: 'Largo (Very Slow)' },
  adagio: { min: 60, max: 80, label: 'Adagio (Slow)' },
  andante: { min: 80, max: 100, label: 'Andante (Walking)' },
  moderato: { min: 100, max: 120, label: 'Moderato (Moderate)' },
  allegro: { min: 120, max: 150, label: 'Allegro (Fast)' },
  presto: { min: 150, max: 200, label: 'Presto (Very Fast)' },
} as const;

