/**
 * UI Configuration
 * 
 * Centralized configuration for all UI-related constants including:
 * - Color tokens
 * - Breakpoints
 * - Size constraints
 * - Spacing system
 * - Animation timings
 * 
 * This file enables easy theme customization and consistent design system.
 */

/**
 * Color tokens for the application theme
 * Based on dark theme with purple/blue accents
 */
export const COLORS = {
  // Background colors
  background: {
    primary: '#1a1a1a',
    surface: '#242424',
    hover: '#2a2a2a',
  },
  
  // Text colors
  text: {
    primary: '#e0e0e0',
    secondary: '#999',
  },
  
  // Border colors
  border: {
    default: '#333',
  },
  
  // Interactive colors
  interactive: {
    accent: '#4a9eff',
    accentDark: '#3a8eef',
    danger: '#ff4a4a',
    dangerBg: 'rgba(255, 74, 74, 0.1)',
    success: '#4aff4a',
    warning: '#ffaa4a',
  },
  
  // Gradient colors
  gradients: {
    // Purple gradient for primary elements
    purple: {
      start: '#667eea',
      end: '#764ba2',
      css: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    // Pink gradient for borrowed chords
    pink: {
      start: '#c44dc7',
      end: '#d63a51',
      css: 'linear-gradient(135deg, #c44dc7 0%, #d63a51 100%)',
    },
    // Header gradient
    header: {
      start: '#1a1a2e',
      end: '#16213e',
      css: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
    },
    // Chord display background
    chordDisplay: {
      css: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
    },
  },
  
  // Scrollbar colors
  scrollbar: {
    thumb: 'rgba(102, 126, 234, 0.6)',
    thumbHover: 'rgba(126, 143, 240, 1)',
    track: 'transparent',
  },
} as const;

/**
 * Responsive breakpoints (in pixels)
 * Used for media queries and responsive behavior
 */
export const BREAKPOINTS = {
  mobile: {
    max: 480,
  },
  tablet: {
    min: 481,
    max: 1024,
  },
  desktop: {
    min: 1025,
  },
  // Specific device breakpoints
  ipad: {
    min: 768,
    max: 1024,
  },
} as const;

/**
 * Size constraints for resizable panels and components
 */
export const SIZES = {
  // Learn mode sidebar (desktop layout)
  learnSidebar: {
    min: 280,
    max: 600,
    default: 420,
  },
  
  // Learn mode piano height (tablet layout)
  learnTabletPiano: {
    min: 200,
    max: 500,
    default: 300,
  },
  
  // Builder panel height (bottom panel in build mode)
  builderPanel: {
    min: 150,
    max: 600,
    default: 250,
  },
  
  // Chord palette width
  chordPalette: {
    width: 280,
    minWidth: 280,
  },
  
  // Touch target minimum (iOS guideline)
  minTouchTarget: 44,
  
  // ConfigBar heights
  configBar: {
    normal: 56,
    collapsed: 10,
  },
} as const;

/**
 * Spacing system (in pixels)
 * Use these for consistent spacing throughout the app
 */
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

/**
 * Animation and transition timings (in milliseconds)
 */
export const TRANSITIONS = {
  fast: 150,
  normal: 200,
  medium: 250,
  slow: 300,
  verySlow: 500,
  
  // Easing functions
  easing: {
    standard: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeOut: 'ease-out',
    easeIn: 'ease-in',
  },
} as const;

/**
 * Z-index layers for consistent stacking
 */
export const Z_INDEX = {
  base: 1,
  dropdown: 10,
  resizeHandle: 10,
  sidebar: 50,
  configBar: 100,
  modal: 1000,
  tooltip: 1100,
} as const;

/**
 * Border radius values for consistent rounded corners
 */
export const BORDER_RADIUS = {
  sm: '3px',
  md: '6px',
  lg: '8px',
  xl: '12px',
} as const;

/**
 * Shadow definitions for elevation
 */
export const SHADOWS = {
  sm: '0 2px 6px rgba(0, 0, 0, 0.15)',
  md: '0 4px 12px rgba(0, 0, 0, 0.4)',
  lg: '0 8px 24px rgba(0, 0, 0, 0.6)',
  
  // Colored shadows for interactive elements
  accent: '0 4px 12px rgba(102, 126, 234, 0.4)',
  danger: '0 4px 12px rgba(245, 87, 108, 0.4)',
} as const;

/**
 * Font sizes for typography scale
 */
export const FONT_SIZES = {
  xs: '11px',
  sm: '12px',
  base: '14px',
  md: '16px',
  lg: '18px',
  xl: '20px',
} as const;

/**
 * Font weights
 */
export const FONT_WEIGHTS = {
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
} as const;

