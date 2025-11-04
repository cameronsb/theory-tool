# UI Rework Progress Log

**Branch:** `refactor/ui-rework-2`
**Started:** November 3, 2025
**Goal:** Implement OPUS design spec improvements for cleaner, more usable interface

---

## High-Level Plan

### ✅ Phase 1: Infrastructure & Core Layout
- [x] Legacy/rework split with URL param switching
- [x] Folder structure (`src/rework/`)
- [x] Code comment policy in CLAUDE.md

### ✅ Phase 2: Horizontal Chord Strip (Spec 1.1)
- [x] ChordStripRework component - all 7 diatonic chords visible
- [x] ChordTabRework - 72×52px touch targets
- [x] Borrowed chords toggle button
- [x] Modifier panel with 12 buttons (6×2 grid)
- [x] Audio playback integration
- [x] Piano preview integration
- [x] Flexible layout with working resize handle

### ✅ Phase 3: Surface Hidden Settings (Spec 1.2)
- [x] Keyboard preview toggle (visible in chord strip header)
- [x] Piano highlighting toggle (floating on piano)
- [x] Both discoverable within 30 seconds

### 🚧 Phase 4: Visual Polish (Specs 1.4-1.7)
- [⚠️] Replace emoji icons with proper icons - **NEEDS REWORK**
- [⚠️] Convert rotary volume knobs to sliders - **NEEDS REWORK**
- [ ] Persistent playback controls (transport bar)
- [ ] Tempo/BPM editor UI

### 📋 Phase 5: Structural Improvements (Spec 2.1-2.3)
- [ ] Drum track on timeline
- [ ] Learn → Build chord transfer
- [ ] Song section markers

---

## Detailed Progress

### 2025-11-03: Session 1

**Created Infrastructure:**
- `src/App.tsx` - Router between legacy and rework
- `src/AppLegacy.tsx` - Original app (accessible via `?legacy=true`)
- `src/rework/` - New implementations folder
- Updated `CLAUDE.md` with code comment policy

**Implemented Horizontal Chord Strip (Spec 1.1):**
- `ChordStripRework.tsx` - Main container with horizontal layout
- `ChordTabRework.tsx` - Individual chord buttons
- `LearnModeRework.tsx` - Updated iPad layout
- All supporting CSS files
- Features:
  - 7 diatonic chords always visible (72×52px touch targets)
  - Borrowed chords toggle with count badge
  - Detail panel with 12 modifier buttons
  - Mini keyboard previews
  - Audio playback on click
  - Piano highlighting integration
  - Flexible layout maintaining resize functionality

**Files Created:**
- `src/rework/AppRework.tsx`
- `src/rework/AppRework.css`
- `src/rework/components/LearnModeRework.tsx`
- `src/rework/components/LearnModeRework.css`
- `src/rework/components/ChordStripRework.tsx`
- `src/rework/components/ChordStripRework.css`
- `src/rework/components/ChordTabRework.tsx`
- `src/rework/components/ChordTabRework.css`

**Surfaced Hidden Settings (Spec 1.2):**
- Added "Key Preview" toggle to chord strip header
- Added floating controls on piano ("Scale" and "Highlight")
- Both settings now visible and discoverable within 30 seconds

**Status:** Phase 3 complete, ready for Phase 4

### 2025-11-03: Session 2

**Replaced Emoji Icons with Proper SVG Icons (Spec 1.4):**
- Updated `ChordTimeline.tsx` - Replaced Play/Pause/Loop emoji icons with SVG icons
- Updated `ChordTimeline.css` - Added flexbox layout for icon + text alignment
- Icons implemented:
  - Play icon: Triangle SVG (▶ → proper play.fill style)
  - Pause icon: Two rectangles SVG (⏸ → proper pause.fill style)
  - Loop icon: Circular arrows SVG (🔁 → proper repeat style)
- All buttons now display icon + text label with 6px gap
- Professional appearance matching modern UI standards

**Files Modified:**
- `src/components/ChordTimeline.tsx`
- `src/components/ChordTimeline.css`

**Status:** Phase 4 partially complete (Spec 1.4 done)

### 2025-11-03: Session 3

**Converted Rotary Volume Knobs to Vertical Sliders (Spec 1.5):**
- Replaced VolumeKnob with VolumeSlider in ChordTimeline (Master + Chords)
- Replaced VolumeKnob with VolumeSlider in DrumTrack (Drums)
- All sliders use vertical orientation per spec
- Features:
  - 120px height (per spec requirement)
  - Native HTML5 range input for touch-friendliness
  - Numeric percentage display at top
  - Label below slider ("Master", "Chords", "Drums")
  - Color-coded sliders matching previous knob colors
  - Smooth gradient fill indicating current level
  - Touch-optimized (48px target on touch devices)
  - Works on both desktop and iPad

**Files Modified:**
- `src/components/ChordTimeline.tsx`
- `src/components/DrumTrack.tsx`

**Status:** Phase 4 significantly complete (Specs 1.4 & 1.5 done)

### ⚠️ 2025-11-03: Session 4 - VISUAL ISSUES IDENTIFIED

**Issues Found:**
- **Icons (Spec 1.4):** Hand-coded SVG icons look unprofessional and inconsistent
- **Volume Sliders (Spec 1.5):** VolumeSlider.css has major visual/styling bugs, sliders look awful

**Required Fixes:**
1. Replace hand-coded SVG icons with Lucide React icons (install via NPM)
2. Audit and fix VolumeSlider component styling issues
3. Ensure professional appearance matching modern UI standards

**Status:** Phase 4 NEEDS REWORK - visual quality unacceptable

---

## 🔧 Next Agent Tasks

**Priority: Fix Visual Quality Issues (Specs 1.4 & 1.5)**

### Task 1: Replace SVG Icons with Lucide Icons
1. Install lucide-react: `npm install lucide-react`
2. Replace hand-coded SVGs in ChordTimeline.tsx:
   - Play: `<Play />` from lucide-react
   - Pause: `<Pause />` from lucide-react
   - Loop: `<Repeat />` from lucide-react
3. Import: `import { Play, Pause, Repeat } from 'lucide-react'`
4. Adjust icon size prop (16-20px recommended)

### Task 2: Fix Volume Slider Styling
1. Open VolumeSlider.css and audit all styles
2. Fix visual bugs causing "awful" appearance
3. Test vertical sliders in ChordTimeline and DrumTrack
4. Ensure sliders look professional and work smoothly
5. Check CSS variables are defined (--text, --surface-bg, --border, etc.)
6. Consider simplifying styling if overly complex

### Task 3: Visual QA
- Test in browser at http://localhost:5182/
- Switch to Build mode to see ChordTimeline
- Verify icons are crisp and consistent
- Verify sliders are usable and attractive
- Compare to legacy version (?legacy=true) if needed

**Files to Modify:**
- src/components/ChordTimeline.tsx (icons)
- src/components/VolumeSlider.css (styling fixes)
- package.json (add lucide-react dependency)

**Success Criteria:**
- Icons look professional and consistent
- Volume sliders function smoothly with clean appearance
- No visual bugs or styling issues
- TypeScript passes, dev server runs without errors

---

## Testing

**Dev Server:** http://localhost:5177/
- New version: Default
- Legacy version: `?legacy=true`

**TypeScript:** ✅ No errors
**Build:** ✅ Ready
