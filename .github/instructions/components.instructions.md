---
applyTo: "src/components/**/*.tsx"
---

# Component Development Instructions

## Component Structure
- Use TypeScript functional components with proper interface definitions
- Include comprehensive JSDoc comments describing component purpose and usage
- Export as named exports (never use default exports)

## Props and State Management
- Define clear interfaces for all props with descriptive names
- Use React hooks for local state management
- Implement proper state lifting when data needs to be shared
- Apply proper TypeScript typing for all state variables

## Accessibility Requirements
- Always include proper ARIA labels and roles
- Ensure full keyboard navigation support
- Maintain semantic HTML structure
- Add descriptive alt text for any images or icons
- Test with screen readers in mind

## Styling Guidelines
- Use only TailwindCSS utility classes
- Follow the established design system colors and spacing
- Apply responsive design patterns (mobile-first approach)
- Use consistent spacing units (4px, 8px, 12px, 16px, 24px)
- Ensure proper focus states for interactive elements

## Performance Optimization
- Use React.memo for components that receive complex props
- Implement useCallback for event handlers passed to child components
- Apply useMemo for expensive calculations
- Avoid creating objects or functions in render

## Error Handling
- Implement proper error boundaries where appropriate
- Handle edge cases and loading states gracefully
- Provide meaningful error messages to users
- Add fallback UI for error states

## Testing Considerations
- Write components that are easy to test
- Use data-testid attributes for testing hooks
- Ensure components are pure and predictable
- Avoid complex side effects in component logic
