import { useRef, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useGrid } from '../hooks/useGrid';
import type { DrumBlock as DrumBlockType, DrumPattern } from '../types/music';
import './DrumBlock.css';

interface DrumBlockProps {
  block: DrumBlockType;
  pattern?: DrumPattern;
  onDelete: () => void;
  onResize: (newDuration: number) => void;
}

export function DrumBlock({ block, pattern, onDelete, onResize }: DrumBlockProps) {
  const grid = useGrid();
  const blockRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);

  const left = grid.timeToPixels(block.position);
  const width = grid.timeToPixels(block.duration);

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsResizing(true);

    const startX = e.clientX;
    const startWidth = width;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const newWidth = Math.max(grid.config.measureWidth / 2, startWidth + deltaX);
      const newDuration = grid.pixelsToTime(newWidth);
      const snappedDuration = grid.snapToGrid(newDuration);
      onResize(snappedDuration);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const repeatText = block.repeatCount > 1 ? `×${block.repeatCount}` : '';

  return (
    <div
      ref={blockRef}
      className={`drum-block ${isResizing ? 'resizing' : ''}`}
      style={{
        left: `${left}px`,
        width: `${width}px`,
      }}
    >
      <div className="drum-block-content">
        <div className="drum-block-header">
          <div className="drum-block-name">
            {pattern?.name || 'Unknown Pattern'}
          </div>
          <button
            className="drum-block-delete"
            onClick={onDelete}
            title="Delete block"
          >
            <Trash2 size={12} />
          </button>
        </div>
        <div className="drum-block-info">
          <span className="drum-block-category">{pattern?.category}</span>
          {repeatText && <span className="drum-block-repeat">{repeatText}</span>}
        </div>
      </div>

      <div
        className="drum-block-resize-handle"
        onMouseDown={handleResizeStart}
        title="Drag to resize"
      />
    </div>
  );
}
