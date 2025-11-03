import type React from 'react';
import { useState, useCallback, useEffect, useRef } from 'react';

interface UseResizableHorizontalOptions {
  initialWidth: number;
  minWidth: number;
  maxWidth: number;
  onResize?: (width: number) => void;
}

interface UseResizableHorizontalReturn {
  width: number;
  isResizing: boolean;
  handleMouseDown: (e: React.MouseEvent) => void;
  setWidth: (width: number) => void;
}

export function useResizableHorizontal({
  initialWidth,
  minWidth,
  maxWidth,
  onResize,
}: UseResizableHorizontalOptions): UseResizableHorizontalReturn {
  const [width, setWidth] = useState(initialWidth);
  const [isResizing, setIsResizing] = useState(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(0);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    startXRef.current = e.clientX;
    startWidthRef.current = width;
  }, [width]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing) return;

    // Calculate the delta (positive when moving right)
    const deltaX = e.clientX - startXRef.current;
    const newWidth = Math.max(
      minWidth,
      Math.min(maxWidth, startWidthRef.current + deltaX)
    );

    setWidth(newWidth);
    onResize?.(newWidth);
  }, [isResizing, minWidth, maxWidth, onResize]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      // Prevent text selection while dragging
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'ew-resize';

      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.userSelect = '';
        document.body.style.cursor = '';
      };
    }
    return undefined;
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return {
    width,
    isResizing,
    handleMouseDown,
    setWidth,
  };
}
