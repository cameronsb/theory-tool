# Claude Agent Instructions for Piano Redesign Project

## 🚨 CRITICAL: Test Early, Test Often

**THINGS WILL BREAK.** This is a complex audio application with multiple interacting systems. Every change you make has the potential to break something else. Your job is to catch breaks early before they cascade.

## Before You Start ANY Work

1. **Verify the current state works:**
   ```bash
   npm run typecheck  # MUST pass
   npm run dev        # MUST start without errors
   ```

2. **Open the browser and manually test:**
   - Can you click piano keys?
   - Does audio play?
   - Do the modes (Learn/Build) switch properly?

3. **If anything is broken, STOP and fix it first**

## Working Protocol

### For EVERY Change You Make:

1. **Before editing:** Read the file completely first
2. **After each edit:** Run `npm run typecheck`
3. **After related edits:** Test in the browser (`npm run dev`)
4. **Before moving on:** Verify you didn't break existing functionality

### The Testing Mantra

Repeat this constantly:
- Edit → TypeCheck → Browser Test → Repeat
- **Never make more than 2-3 changes without testing**
- **If TypeScript complains, STOP and fix it immediately**

## Common Breaking Points to Watch

### 1. Audio Engine (`src/hooks/useAudioEngine.ts`)
- **FRAGILE**: The audio context and soundfont loading are delicate
- **Test after changes**: Click multiple piano keys rapidly
- **Watch for**: Silent failures, keys not playing, console errors

### 2. Music Context (`src/contexts/MusicContext.tsx`)
- **COMPLEX**: State management affects entire app
- **Test after changes**: Switch modes, change scales, test keyboard input
- **Watch for**: State not updating, infinite loops, React errors

### 3. Piano Components (`src/components/Piano*.tsx`)
- **VISUAL**: Breaking these is immediately obvious
- **Test after changes**: All keys render, click responses work, visual feedback shows
- **Watch for**: Keys not rendering, click areas misaligned, CSS breaks

## Red Flags - STOP If You See These

1. **TypeScript errors** - Never ignore, always fix immediately
2. **Console errors in browser** - Something is broken, investigate now
3. **Silent failures** - If clicking keys doesn't play sound, STOP
4. **React errors** - White screen, component errors, hooks violations
5. **Build failures** - If `npm run build` fails, the code is not shippable

## Testing Checklist

Run through this checklist frequently:

```bash
# 1. Type checking passes
npm run typecheck

# 2. Dev server starts
npm run dev

# 3. In browser, test:
- [ ] Piano keys are visible
- [ ] Clicking keys plays sound
- [ ] Learn mode works (scales, progression detection)
- [ ] Build mode works (recording, playback)
- [ ] No console errors
- [ ] Mode switching works smoothly

# 4. Production build works
npm run build
```

## Working with the Audio System

The audio system is particularly fragile. When working with audio:

1. **Never assume the audio context is ready** - It needs user interaction
2. **Test with different browsers** - Audio APIs vary
3. **Check the console** - Audio errors often only show there
4. **Test rapid interactions** - Click keys quickly to test concurrency

## Safe Refactoring Strategy

When refactoring or adding features:

1. **Make the smallest possible change**
2. **Test that change works**
3. **Commit if it works** (git commit)
4. **Only then make the next change**

Never refactor multiple files at once without testing between changes.

## If You Break Something

1. **Don't panic**
2. **Check git status** - See what you changed
3. **Run `npm run typecheck`** - Fix type errors first
4. **Check browser console** - Look for runtime errors
5. **Revert if needed** - `git checkout .` to start fresh
6. **Ask for help** - Describe what broke and what you were trying to do

## The Golden Rules

1. **🧪 Test more than you code**
2. **🔍 Read errors carefully - TypeScript is trying to help**
3. **🚶 Make small steps - Big changes = Big breaks**
4. **💾 Commit working states - You can always go back**
5. **🎹 Actually use the app - Click things, play with it**

## Remember

This is a musical instrument app. It needs to:
- **Respond instantly** to user input
- **Never lose audio** during interaction
- **Feel smooth and reliable**

Every change you make should maintain or improve these qualities. If something feels sluggish or broken after your change, it probably is.

## Final Words

**You are not just editing code, you are maintaining a musical instrument.**

Test everything. Trust nothing. Verify constantly.

When in doubt, run `npm run typecheck` and test in the browser.