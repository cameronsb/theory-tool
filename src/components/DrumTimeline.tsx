import { useRef, useMemo, useState } from 'react';
import { useMusic } from '../hooks/useMusic';
import { useGrid } from '../hooks/useGrid';
import { Ruler } from './Ruler';
import { DrumBlock } from './DrumBlock';
import type { DrumBlock as DrumBlockType, DrumPattern } from '../types/music';
import './DrumTimeline.css';

export function DrumTimeline() {
  const { state, actions } = useMusic();
  const grid = useGrid();
  const timelineRef = useRef<HTMLDivElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [dropPosition, setDropPosition] = useState<number | null>(null);

  const drumBlocks = state.song.tracks.drums.blocks;

  const totalDurationInEighths = useMemo(() => {
    if (drumBlocks.length === 0) return 0;
    return Math.max(...drumBlocks.map(block => block.position + block.duration));
  }, [drumBlocks]);

  const totalMeasures = Math.max(8, Math.ceil(totalDurationInEighths / grid.config.eighthsPerMeasure) + 2);
  const timelineWidth = totalMeasures * grid.config.measureWidth;

  const handleBlockDelete = (id: string) => {
    actions.removeDrumBlock(id);
  };

  const handleBlockResize = (id: string, newDuration: number) => {
    const block = drumBlocks.find(b => b.id === id);
    if (block) {
      const updatedBlock = { ...block, duration: newDuration };
      actions.updateDrumBlock(updatedBlock);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);

    if (timelineRef.current) {
      const rect = timelineRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left + timelineRef.current.scrollLeft;
      const timePosition = grid.pixelsToTime(x);
      const snappedPosition = grid.snapToGrid(timePosition);
      setDropPosition(snappedPosition);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (e.currentTarget === e.target) {
      setIsDragOver(false);
      setDropPosition(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setDropPosition(null);

    try {
      const patternData = e.dataTransfer.getData('application/json');
      if (!patternData) return;

      const pattern: DrumPattern = JSON.parse(patternData);

      if (timelineRef.current) {
        const rect = timelineRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left + timelineRef.current.scrollLeft;
        const timePosition = grid.pixelsToTime(x);
        const snappedPosition = grid.snapToGrid(timePosition);

        const patternLengthInEighths = pattern.measures * 8;
        const defaultRepeatCount = 4;

        const newBlock: DrumBlockType = {
          id: `drum-block-${Date.now()}-${Math.random()}`,
          patternId: pattern.id,
          position: Math.max(0, snappedPosition),
          duration: patternLengthInEighths * defaultRepeatCount,
          repeatCount: defaultRepeatCount,
        };

        actions.addDrumBlock(newBlock);
      }
    } catch (error) {
      console.error('Failed to drop pattern:', error);
    }
  };

  return (
    <div className="drum-timeline">
      <div className="drum-timeline-header">
        <h3>Drum Timeline</h3>
        <div className="drum-timeline-info">
          {drumBlocks.length} {drumBlocks.length === 1 ? 'block' : 'blocks'}
        </div>
      </div>

      <div className="drum-timeline-scroll-container">
        <div
          className="drum-timeline-content"
          ref={timelineRef}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <Ruler totalMeasures={totalMeasures} />

          <div
            className={`drum-timeline-track ${isDragOver ? 'drag-over' : ''}`}
            style={{ width: timelineWidth }}
          >
            {drumBlocks.map((block) => (
              <DrumBlock
                key={block.id}
                block={block}
                pattern={state.song.tracks.drums.patterns.find(p => p.id === block.patternId)}
                onDelete={() => handleBlockDelete(block.id)}
                onResize={(newDuration) => handleBlockResize(block.id, newDuration)}
              />
            ))}

            {isDragOver && dropPosition !== null && (
              <div
                className="drop-indicator"
                style={{ left: `${grid.timeToPixels(dropPosition)}px` }}
              />
            )}

            {drumBlocks.length === 0 && !isDragOver && (
              <div className="drum-timeline-empty">
                <div className="empty-state-icon">🎵</div>
                <p>Drag patterns from the library below to add drums</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
