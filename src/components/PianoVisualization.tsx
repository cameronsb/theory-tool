import React from 'react';
import type { Note } from '../types/music';
import { NOTES } from '../utils/musicTheory';
import './PianoVisualization.css';

interface PianoVisualizationProps {
  rootNote: Note;
  intervals: number[];
  showLabels?: boolean;
  labelFontSize?: number;
  onClick?: (e: React.MouseEvent) => void;
  isSelected?: boolean;
  className?: string;
}

export function PianoVisualization({
  rootNote,
  intervals,
  showLabels = true,
  labelFontSize = 10,
  onClick,
  isSelected = false,
  className = ''
}: PianoVisualizationProps) {
  const whiteKeyPositions = [0, 2, 4, 5, 7, 9, 11]; // C, D, E, F, G, A, B
  const blackKeyPositions = [
    { key: 1, x: 8 },    // C#
    { key: 3, x: 18 },   // D#
    { key: 6, x: 38 },   // F#
    { key: 8, x: 48 },   // G#
    { key: 10, x: 58 }   // A#
  ];

  // Get the chromatic position of the root note (0-11 where C=0)
  const rootIndex = NOTES.indexOf(rootNote);

  // Calculate which chromatic keys should be highlighted
  // Map chord intervals to actual chromatic positions based on root note
  const activeKeys = new Map<number, number>(); // chromatic position -> interval
  intervals.forEach(interval => {
    const chromaticPosition = (rootIndex + interval) % 12;
    activeKeys.set(chromaticPosition, interval);
  });

  const isNoteActive = (chromaticKey: number) => activeKeys.has(chromaticKey);

  const getNoteLabel = (chromaticKey: number): string | null => {
    const interval = activeKeys.get(chromaticKey);
    if (interval === undefined) return null;
    return getIntervalLabel(interval);
  };

  // Helper: Get interval label for display (1, 3, 5, ♭7, 9, etc.)
  const getIntervalLabel = (interval: number): string => {
    const labels: Record<number, string> = {
      0: '1',
      1: '♭2',
      2: '2',
      3: '♭3',
      4: '3',
      5: '4',
      6: '♭5',
      7: '5',
      8: '♯5',
      9: '6',
      10: '♭7',
      11: '7',
      14: '9',
      17: '11',
      21: '13',
    };
    return labels[interval] || String(interval);
  };

  return (
    <svg
      viewBox="-1 -1 72 38"
      className={`piano-visualization ${isSelected ? 'selected' : ''} ${className}`}
      onClick={onClick}
    >
      {/* White Keys */}
      {whiteKeyPositions.map((keyNum, idx) => {
        const active = isNoteActive(keyNum);
        const label = getNoteLabel(keyNum);
        const x = idx * 10;

        return (
          <g key={keyNum}>
            <rect
              x={x}
              y="0"
              width="10"
              height="24"
              className={`white-key ${active ? "active" : ""}`}
            />
            {showLabels && label && (
              <text
                x={x + 5}
                y="34"
                fill="white"
                fontSize={labelFontSize}
                fontWeight="600"
                textAnchor="middle"
              >
                {label}
              </text>
            )}
          </g>
        );
      })}

      {/* Black Keys */}
      {blackKeyPositions.map(({ key, x }) => {
        const active = isNoteActive(key);
        const label = getNoteLabel(key);

        return (
          <g key={key}>
            <rect
              x={x}
              y="0"
              width="4"
              height="14"
              className={`black-key ${active ? "active" : ""}`}
            />
            {showLabels && label && (
              <text
                x={x + 2}
                y="34"
                fill="white"
                fontSize={labelFontSize}
                fontWeight="600"
                textAnchor="middle"
              >
                {label}
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}
