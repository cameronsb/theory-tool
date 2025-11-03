/**
 * usePointerEvents Hook
 *
 * Unified abstraction for mouse and touch events.
 * Provides a consistent interface for handling pointer interactions
 * across different input devices.
 *
 * @example
 * ```typescript
 * const handlers = usePointerEvents({
 *   onPointerDown: (x, y) => console.log('Pointer down at', x, y),
 *   onPointerMove: (x, y) => console.log('Pointer moving at', x, y),
 *   onPointerUp: () => console.log('Pointer up'),
 * });
 *
 * <div {...handlers}>Interactive area</div>
 * ```
 */

import { useCallback, useRef } from 'react';

/**
 * Pointer position
 */
export interface PointerPosition {
  x: number;
  y: number;
}

/**
 * Pointer event options
 */
export interface UsePointerEventsOptions {
  /**
   * Called when pointer goes down (mouse down or touch start)
   */
  onPointerDown?: (position: PointerPosition, event: React.MouseEvent | React.TouchEvent) => void;

  /**
   * Called when pointer moves (mouse move or touch move)
   */
  onPointerMove?: (position: PointerPosition, event: React.MouseEvent | React.TouchEvent) => void;

  /**
   * Called when pointer goes up (mouse up or touch end)
   */
  onPointerUp?: (event: React.MouseEvent | React.TouchEvent) => void;

  /**
   * Called when pointer leaves the element
   */
  onPointerLeave?: (event: React.MouseEvent) => void;

  /**
   * Whether to prevent default browser behavior
   */
  preventDefault?: boolean;

  /**
   * Whether to stop event propagation
   */
  stopPropagation?: boolean;
}

/**
 * Pointer event handlers return value
 */
export interface UsePointerEventsReturn {
  onMouseDown: (e: React.MouseEvent) => void;
  onMouseMove: (e: React.MouseEvent) => void;
  onMouseUp: (e: React.MouseEvent) => void;
  onMouseLeave: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: (e: React.TouchEvent) => void;
  onTouchCancel: (e: React.TouchEvent) => void;
}

/**
 * Custom hook for unified pointer event handling
 *
 * Abstracts the differences between mouse and touch events,
 * providing a consistent interface for pointer interactions.
 */
export function usePointerEvents(
  options: UsePointerEventsOptions
): UsePointerEventsReturn {
  const {
    onPointerDown,
    onPointerMove,
    onPointerUp,
    onPointerLeave,
    preventDefault: shouldPreventDefault = true,
    stopPropagation: shouldStopPropagation = false,
  } = options;

  // Track active touch ID for multi-touch scenarios
  const activeTouchIdRef = useRef<number | null>(null);

  // ===== Mouse Handlers =====

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (shouldPreventDefault) e.preventDefault();
    if (shouldStopPropagation) e.stopPropagation();

    onPointerDown?.({ x: e.clientX, y: e.clientY }, e);
  }, [onPointerDown, shouldPreventDefault, shouldStopPropagation]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (shouldPreventDefault) e.preventDefault();
    if (shouldStopPropagation) e.stopPropagation();

    onPointerMove?.({ x: e.clientX, y: e.clientY }, e);
  }, [onPointerMove, shouldPreventDefault, shouldStopPropagation]);

  const handleMouseUp = useCallback((e: React.MouseEvent) => {
    if (shouldPreventDefault) e.preventDefault();
    if (shouldStopPropagation) e.stopPropagation();

    onPointerUp?.(e);
  }, [onPointerUp, shouldPreventDefault, shouldStopPropagation]);

  const handleMouseLeave = useCallback((e: React.MouseEvent) => {
    if (shouldPreventDefault) e.preventDefault();
    if (shouldStopPropagation) e.stopPropagation();

    onPointerLeave?.(e);
  }, [onPointerLeave, shouldPreventDefault, shouldStopPropagation]);

  // ===== Touch Handlers =====

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (shouldPreventDefault) e.preventDefault();
    if (shouldStopPropagation) e.stopPropagation();

    if (e.touches.length > 0 && activeTouchIdRef.current === null) {
      const touch = e.touches[0];
      activeTouchIdRef.current = touch.identifier;
      onPointerDown?.({ x: touch.clientX, y: touch.clientY }, e);
    }
  }, [onPointerDown, shouldPreventDefault, shouldStopPropagation]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (activeTouchIdRef.current === null) return;
    if (shouldPreventDefault) e.preventDefault();
    if (shouldStopPropagation) e.stopPropagation();

    const touch = Array.from(e.touches).find(t => t.identifier === activeTouchIdRef.current);
    if (touch) {
      onPointerMove?.({ x: touch.clientX, y: touch.clientY }, e);
    }
  }, [onPointerMove, shouldPreventDefault, shouldStopPropagation]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (shouldPreventDefault) e.preventDefault();
    if (shouldStopPropagation) e.stopPropagation();

    const changedTouches = Array.from(e.changedTouches);
    if (activeTouchIdRef.current !== null &&
        changedTouches.some(t => t.identifier === activeTouchIdRef.current)) {
      activeTouchIdRef.current = null;
      onPointerUp?.(e);
    }
  }, [onPointerUp, shouldPreventDefault, shouldStopPropagation]);

  const handleTouchCancel = useCallback((e: React.TouchEvent) => {
    if (shouldPreventDefault) e.preventDefault();
    if (shouldStopPropagation) e.stopPropagation();

    if (activeTouchIdRef.current !== null) {
      activeTouchIdRef.current = null;
      onPointerUp?.(e);
    }
  }, [onPointerUp, shouldPreventDefault, shouldStopPropagation]);

  return {
    onMouseDown: handleMouseDown,
    onMouseMove: handleMouseMove,
    onMouseUp: handleMouseUp,
    onMouseLeave: handleMouseLeave,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchCancel,
  };
}

