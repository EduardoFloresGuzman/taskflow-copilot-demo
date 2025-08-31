---
applyTo: "src/types/**/*.ts"
---

# TypeScript Type Definition Instructions

## Interface Design
- Create clear, descriptive interface names using PascalCase
- Include comprehensive JSDoc comments for all interfaces
- Use proper optional vs required property definitions
- Implement proper inheritance and composition patterns

## Type Safety
- Use strict TypeScript configuration
- Implement proper union types and discriminated unions
- Create type guards for runtime type checking
- Use generic types where appropriate for reusability

## Data Model Types
- Define clear data models that match the application domain
- Use readonly properties where data shouldn't be mutated
- Implement proper nested type structures
- Create utility types for common transformations

## API and Response Types
- Define clear request and response types for all API calls
- Use proper error response typing
- Implement pagination and filtering types
- Create proper validation schemas that match types

## Component Prop Types
- Create clear prop interfaces for all components
- Use proper event handler typing
- Implement children and ref types correctly
- Define clear callback function signatures

## State and Context Types
- Define clear state interfaces for context providers
- Use proper action types for state reducers
- Implement proper dispatch function typing
- Create selector types for state access

## Utility Types
- Create reusable utility types for common patterns
- Use proper conditional types where beneficial
- Implement mapped types for transformations
- Export utility types for cross-application use

## Documentation
- Include usage examples in JSDoc comments
- Document type relationships and dependencies
- Explain complex type logic with comments
- Provide clear deprecation notices when needed
