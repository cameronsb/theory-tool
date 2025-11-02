import './BuildMode.css';

export function BuildMode() {
  return (
    <div className="build-mode">
      <div className="chord-palette">
        <div className="palette-placeholder">
          Chord Palette
        </div>
      </div>
      <div className="timeline-section">
        <div className="timeline-placeholder">
          Timeline (Chord/Melody/Drum Tracks)
        </div>
      </div>
    </div>
  );
}
