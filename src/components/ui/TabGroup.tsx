/**
 * TabGroup Component
 *
 * Unified tab/toggle group for consistent tab UI across the app.
 * Supports both toggle mode (Learn/Build) and tab mode (Piano/Drums).
 *
 * @example
 * ```typescript
 * <TabGroup
 *   variant="toggle"
 *   value={currentMode}
 *   onChange={setMode}
 *   tabs={[
 *     { value: 'learn', label: 'Learn' },
 *     { value: 'build', label: 'Build' },
 *   ]}
 * />
 * ```
 */

import './TabGroup.css';

export type TabVariant = 'toggle' | 'tabs';

export interface Tab<T = string> {
  value: T;
  label: string;
  disabled?: boolean;
}

export interface TabGroupProps<T = string> {
  /** Visual style variant */
  variant?: TabVariant;

  /** Currently selected tab value */
  value: T;

  /** Change handler */
  onChange: (value: T) => void;

  /** Tab options */
  tabs: Tab<T>[];

  /** Additional className */
  className?: string;

  /** Accessible label */
  'aria-label'?: string;
}

/**
 * Unified tab group component
 *
 * Provides consistent tab/toggle UI with two visual variants:
 * - `toggle`: Compact toggle buttons with gradient active state (for mode switching)
 * - `tabs`: Traditional tabs with bottom border active state (for view switching)
 */
export function TabGroup<T extends string = string>({
  variant = 'toggle',
  value,
  onChange,
  tabs,
  className = '',
  'aria-label': ariaLabel,
}: TabGroupProps<T>) {
  return (
    <div
      className={`tab-group tab-group-${variant} ${className}`}
      role="tablist"
      aria-label={ariaLabel}
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`tab-button ${value === tab.value ? 'active' : ''}`}
          onClick={() => onChange(tab.value)}
          disabled={tab.disabled}
          role="tab"
          aria-selected={value === tab.value}
          aria-controls={`${tab.value}-panel`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

