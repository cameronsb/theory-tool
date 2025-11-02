import { Piano } from './Piano';
import './LearnMode.css';

export function LearnMode() {
  return (
    <div className="learn-mode">
      <div className="piano-section">
        <Piano startOctave={4} octaveCount={2} showScaleDegrees={true} />
      </div>
      <div className="chord-display">
        <div className="chord-placeholder">
          Chord Display (Roman Numerals)
        </div>
      </div>
    </div>
  );
}
