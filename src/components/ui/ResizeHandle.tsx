/**
 * ResizeHandle Component
 * 
 * Unified resize handle for both horizontal and vertical resizing.
 * Provides consistent styling and behavior across the app.
 * 
 * @example
 * ```typescript
 * <ResizeHandle
 *   direction="vertical"
 *   isResizing={isResizing}
 *   onMouseDown={handleMouseDown}
 *   onTouchStart={handleTouchStart}
 *   title="Drag to resize"
 * />
 * ```
 */

import React from 'react';
import './ResizeHandle.css';

export type ResizeDirection = 'horizontal' | 'vertical';

export interface ResizeHandleProps {
  /** Resize direction */
  direction: ResizeDirection;
  
  /** Whether currently resizing */
  isResizing: boolean;
  
  /** Mouse down handler */
  onMouseDown: (e: React.MouseEvent) => void;
  
  /** Touch start handler */
  onTouchStart: (e: React.TouchEvent) => void;
  
  /** Tooltip text */
  title?: string;
  
  /** Additional className */
  className?: string;
  
  /** Custom styles (e.g., position for horizontal handles) */
  style?: React.CSSProperties;
}

/**
 * Unified resize handle component
 * 
 * Provides consistent visual feedback and interaction for resizing panels.
 * Automatically adjusts cursor and layout based on direction.
 */
export function ResizeHandle({
  direction,
  isResizing,
  onMouseDown,
  onTouchStart,
  title = 'Drag to resize',
  className = '',
  style,
}: ResizeHandleProps) {
  const directionClass = direction === 'horizontal' ? 'horizontal' : 'vertical';
  const resizingClass = isResizing ? 'resizing' : '';

  return (
    <div
      className={`resize-handle resize-handle-${directionClass} ${resizingClass} ${className}`}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      title={title}
      style={style}
    >
      <div className="resize-handle-indicator" />
    </div>
  );
}

