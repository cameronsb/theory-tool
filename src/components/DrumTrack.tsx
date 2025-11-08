import { useState } from 'react';
import { useMusic } from '../hooks/useMusic';
import { PatternBrowser } from './PatternBrowser';
import { VolumeSlider } from './VolumeSlider';
import type { DrumPattern } from '../types/music';
import './DrumTrack.css';

export function DrumTrack() {
  const { state, settings, actions, audio } = useMusic();
  const [selectedPattern, setSelectedPattern] = useState<DrumPattern | null>(null);
  const patterns = state.song.tracks.drums.patterns;

  const handlePatternSelect = (pattern: DrumPattern) => {
    setSelectedPattern(pattern);

    // Preview the pattern by playing the first few hits
    const previewSteps = Math.min(8, pattern.kick.length);
    let stepIndex = 0;

    const playPreview = () => {
      if (stepIndex >= previewSteps) return;

      const currentTime = audio.audioContext?.currentTime || 0;
      const stepTime = currentTime + (stepIndex * 0.1);

      if (pattern.kick[stepIndex]) audio.playKick(stepTime);
      if (pattern.snare[stepIndex]) audio.playSnare(stepTime);
      if (pattern.hihat[stepIndex]) audio.playHiHat(stepTime);

      stepIndex++;
      if (stepIndex < previewSteps) {
        setTimeout(playPreview, 100);
      }
    };

    playPreview();
  };

  return (
    <div className="drum-track">
      <div className="drum-track-header">
        <h3>Drum Patterns</h3>
        <div className="drum-track-header-right">
          <div className="drum-track-info">
            {patterns.length} {patterns.length === 1 ? 'pattern' : 'patterns'}
          </div>
          <VolumeSlider
            value={settings.volume.tracks.drums}
            onChange={(v) => actions.setTrackVolume('drums', v)}
            color="#4facfe"
            label="Vol"
            orientation="horizontal"
          />
        </div>
      </div>
      <div className="drum-track-content">
        <PatternBrowser
          patterns={patterns}
          onPatternSelect={handlePatternSelect}
          selectedPatternId={selectedPattern?.id}
        />
      </div>
    </div>
  );
}
