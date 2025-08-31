# TaskFlow - GitHub Copilot Repository Instructions

## Project Overview
TaskFlow is a modern Next.js 15 todo application demonstrating specification-driven development with GitHub Copilot. This project showcases how detailed instructions enable Copilot to generate perfectly aligned code.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS v4
- **TypeScript**: Strict mode enabled
- **State Management**: React hooks with Context API
- **Storage**: Browser localStorage with JSON serialization
- **Icons**: Lucide React

## Build & Development Commands
- `npm install` - Install dependencies
- `npm run dev` - Start development server (http://localhost:3000)
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main todo page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components
│   ├── task/             # Task-related components
│   └── layout/           # Layout components
├── lib/                  # Utility functions and constants
├── types/                # TypeScript type definitions
└── contexts/             # React context providers
```

## Component Architecture Guidelines
- Use TypeScript functional components with proper JSDoc
- Export as named exports (not default exports)
- Follow PascalCase for component names, kebab-case for file names
- Apply proper ARIA labels and accessibility standards
- Use React.memo for performance optimization where needed

## Styling Standards
- Use only TailwindCSS utility classes (no custom CSS)
- Follow design system: Primary #2563eb, Secondary #64748b, Success #059669
- Maintain consistent spacing using 4px base units
- Use Inter font family throughout
- Ensure 4.5:1 color contrast for accessibility

## State Management Patterns
- Use React hooks for local component state
- Implement Context API for shared application state
- Follow exact interfaces defined in src/types/index.ts
- Always update timestamps when modifying tasks
- Wrap localStorage operations in try-catch blocks

## Code Quality Standards
- Validate user inputs (title max 100 chars, description max 500 chars)
- Import organization: External libraries → Internal modules → Relative imports
- Use absolute imports with @/ prefix for src/ directory
- Apply proper error handling and user feedback
- Implement full keyboard navigation support

## Performance Guidelines
- Avoid unnecessary re-renders
- Use useCallback and useMemo for expensive operations
- Implement proper dependency arrays in useEffect
- Optimize component rendering with React.memo where appropriate

Remember: Trust these instructions and follow them consistently. Only search for additional information if these instructions are incomplete or found to be in error.
