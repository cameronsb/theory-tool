/**
 * Audio Configuration
 * 
 * Centralized configuration for all audio-related constants including:
 * - Soundfont settings
 * - Drum synthesis parameters
 * - Playback scheduling
 * - Default volume levels
 * 
 * This file enables easy audio engine customization.
 */

/**
 * Soundfont configuration for piano sounds
 */
export const SOUNDFONT_CONFIG = {
  instrument: 'acoustic_grand_piano',
  library: 'MusyngKite', // Alternative: 'FluidR3_GM'
} as const;

/**
 * Drum synthesis parameters
 * Each drum type has specific frequency/timing characteristics for synthesis
 */
export const DRUM_SOUNDS = {
  kick: {
    // Frequency sweep parameters
    initialFreq: 150,        // Hz - starting frequency
    minFreq: 0.01,           // Hz - ending frequency (near silence)
    
    // Timing
    duration: 0.35,          // seconds
    
    // Gain envelope
    gainStart: 1.0,          // Normalized gain (0-1)
    gainEnd: 0.001,          // Near zero for exponential ramp
    stopPadding: 0.01,       // Extra time before stopping oscillator
  },
  
  snare: {
    // Noise component
    noiseGain: 0.7,
    noiseDuration: 0.2,      // seconds
    
    // Tonal component
    tonalFreq: 200,          // Hz
    tonalGain: 0.3,
    tonalDuration: 0.1,      // seconds
    
    // Buffer size for noise generation
    bufferMultiplier: 0.2,   // Multiplied by sample rate
  },
  
  hihat: {
    // Filter parameters
    highpassFreq: 7000,      // Hz - cutoff frequency
    
    // Timing
    duration: 0.05,          // seconds
    
    // Gain
    gain: 0.3,
    gainEnd: 0.01,
    
    // Buffer size for noise generation
    bufferMultiplier: 0.05,  // Multiplied by sample rate
  },
} as const;

/**
 * Playback scheduling parameters
 * Used by the playback engine for timing accuracy
 */
export const PLAYBACK_CONFIG = {
  /**
   * How far ahead to schedule audio events (seconds)
   * Lower = more precise timing, higher CPU usage
   * Higher = less precise, lower CPU usage
   */
  lookaheadTime: 0.1,
  
  /**
   * How often to check schedule (milliseconds)
   * Should be less than lookaheadTime
   */
  scheduleInterval: 25,
} as const;

/**
 * Default volume levels
 * All volumes are normalized (0.0 - 1.0)
 * 
 * Volume calculation chain:
 * Final volume = note_volume * track_volume * master_volume
 */
export const VOLUME_DEFAULTS = {
  // Master volume
  master: 0.7,
  
  // Track volumes
  tracks: {
    chords: 0.6,      // Chord playback volume
    melody: 0.8,      // Melody/single note volume
    drums: 1.0,       // Drum track volume
  },
  
  // Individual note durations and volumes
  notes: {
    singleNote: {
      duration: 0.3,   // seconds
      volume: 0.8,
    },
    chord: {
      duration: 0.8,   // seconds
      volume: 0.6,
    },
  },
  
  // Individual drum sound volumes
  drumSounds: {
    kick: 1.0,
    snare: 1.0,
    hihat: 1.0,
  },
} as const;

/**
 * MIDI conversion constants
 */
export const MIDI_CONSTANTS = {
  /**
   * A4 reference frequency (Hz)
   * Standard tuning: A4 = 440 Hz
   */
  A4_FREQUENCY: 440,
  
  /**
   * A4 MIDI note number
   */
  A4_MIDI: 69,
  
  /**
   * Semitones per octave
   */
  SEMITONES_PER_OCTAVE: 12,
} as const;

/**
 * Audio context configuration
 */
export const AUDIO_CONTEXT_CONFIG = {
  /**
   * Supported AudioContext classes
   * Try these in order for browser compatibility
   */
  contextClasses: ['AudioContext', 'webkitAudioContext'] as const,
  
  /**
   * Timeout for audio initialization (milliseconds)
   */
  initTimeout: 5000,
} as const;

