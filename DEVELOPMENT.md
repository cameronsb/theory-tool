# Piano Redesign Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run type checking
npm run typecheck

# Run linting
npm run lint

# Build for production
npm run build
```

## Safety Checks

This project has several safety mechanisms in place:

### 1. TypeScript Strict Mode
- All strict checks enabled
- No implicit any
- Strict null checks
- Must handle all cases in switch statements

### 2. Pre-commit Hooks
Automatically runs before each commit:
- TypeScript type checking
- ESLint validation

### 3. Available Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production (runs TypeScript checks first)
- `npm run typecheck` - Check TypeScript types without building
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Auto-fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Project Structure

```
piano-redesign/
├── src/
│   ├── components/     # React components
│   ├── hooks/          # Custom React hooks (including useAudioEngine)
│   ├── utils/          # Utility functions
│   └── App.tsx         # Main app component
├── public/             # Static assets
└── vite.config.ts     # Vite configuration
```

## Testing Changes

1. **Before making changes:**
   - Run `npm run typecheck` to ensure no existing type errors
   - Run `npm run lint` to ensure code quality

2. **After making changes:**
   - The dev server (`npm run dev`) will show compilation errors immediately
   - Run `npm run typecheck` to catch type errors
   - Run `npm run lint` to check code quality
   - Commits will automatically run these checks

## Common Issues

- **Type errors**: Check the terminal output from `npm run typecheck`
- **Lint errors**: Run `npm run lint:fix` to auto-fix most issues
- **Build failures**: Always run `npm run build` before considering changes complete

## Version Control

This project uses Git for version control. All commits must pass:
- TypeScript type checking
- ESLint validation

These checks run automatically via Husky pre-commit hooks.