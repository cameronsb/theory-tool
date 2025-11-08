import { useState } from 'react';
import type { DrumPattern } from '../types/music';
import './PatternBrowser.css';

interface PatternBrowserProps {
  patterns: DrumPattern[];
  onPatternSelect?: (pattern: DrumPattern) => void;
  selectedPatternId?: string;
}

export function PatternBrowser({ patterns, onPatternSelect, selectedPatternId }: PatternBrowserProps) {
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categories = ['all', ...new Set(patterns.map(p => p.category))];

  const filteredPatterns = filterCategory === 'all'
    ? patterns
    : patterns.filter(p => p.category === filterCategory);

  const handlePatternClick = (pattern: DrumPattern) => {
    onPatternSelect?.(pattern);
  };

  return (
    <div className="pattern-browser">
      <div className="pattern-browser-header">
        <h3>Pattern Library</h3>
        <div className="pattern-filters">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-button ${filterCategory === category ? 'active' : ''}`}
              onClick={() => setFilterCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="pattern-grid">
        {filteredPatterns.map(pattern => (
          <PatternCard
            key={pattern.id}
            pattern={pattern}
            isSelected={pattern.id === selectedPatternId}
            onClick={() => handlePatternClick(pattern)}
          />
        ))}
      </div>
    </div>
  );
}

interface PatternCardProps {
  pattern: DrumPattern;
  isSelected: boolean;
  onClick: () => void;
}

function PatternCard({ pattern, isSelected, onClick }: PatternCardProps) {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('application/json', JSON.stringify(pattern));
    e.dataTransfer.setData('text/plain', pattern.name);
  };

  return (
    <div
      className={`pattern-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
    >
      <div className="pattern-card-header">
        <div className="pattern-card-name">{pattern.name}</div>
        <div className="pattern-card-badge">{pattern.category}</div>
      </div>

      <div className="pattern-visualization">
        <PatternGrid pattern={pattern} />
      </div>

      <div className="pattern-card-info">
        {pattern.measures} {pattern.measures === 1 ? 'measure' : 'measures'}
        <span className="drag-hint">Drag to timeline</span>
      </div>
    </div>
  );
}

interface PatternGridProps {
  pattern: DrumPattern;
}

function PatternGrid({ pattern }: PatternGridProps) {
  const totalSteps = pattern.measures * 16;

  return (
    <div className="pattern-grid-container">
      <div className="pattern-grid-row">
        <div className="pattern-grid-label">K</div>
        <div className="pattern-grid-steps">
          {pattern.kick.slice(0, totalSteps).map((active, i) => (
            <div
              key={`k-${i}`}
              className={`pattern-grid-step ${active ? 'active kick' : ''} ${i % 4 === 0 ? 'beat-marker' : ''}`}
            />
          ))}
        </div>
      </div>
      <div className="pattern-grid-row">
        <div className="pattern-grid-label">S</div>
        <div className="pattern-grid-steps">
          {pattern.snare.slice(0, totalSteps).map((active, i) => (
            <div
              key={`s-${i}`}
              className={`pattern-grid-step ${active ? 'active snare' : ''} ${i % 4 === 0 ? 'beat-marker' : ''}`}
            />
          ))}
        </div>
      </div>
      <div className="pattern-grid-row">
        <div className="pattern-grid-label">H</div>
        <div className="pattern-grid-steps">
          {pattern.hihat.slice(0, totalSteps).map((active, i) => (
            <div
              key={`h-${i}`}
              className={`pattern-grid-step ${active ? 'active hihat' : ''} ${i % 4 === 0 ? 'beat-marker' : ''}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
