---
applyTo: "src/lib/**/*.ts"
---

# Utility and Library Instructions

## Function Organization
- Create pure functions with single responsibilities
- Export functions as named exports for better tree-shaking
- Include comprehensive TypeScript types for all parameters and returns
- Add detailed JSDoc comments with usage examples

## Error Handling
- Always wrap potentially failing operations in try-catch blocks
- Return meaningful error objects with proper typing
- Use Result types or proper error handling patterns
- Log errors appropriately for debugging

## Performance Guidelines
- Implement memoization for expensive computations
- Use proper algorithms and data structures
- Avoid unnecessary object creation in loops
- Consider lazy loading for heavy utilities

## Data Validation
- Create reusable validation functions with proper typing
- Use schema validation for complex data structures
- Implement proper sanitization for user inputs
- Return detailed validation error messages

## Storage Operations
- Always wrap localStorage/sessionStorage in try-catch
- Implement proper JSON serialization/deserialization
- Handle storage quota exceeded errors gracefully
- Provide fallbacks for when storage is unavailable

## Type Definitions
- Create comprehensive TypeScript interfaces
- Use proper generic types where applicable
- Implement proper type guards and assertions
- Export types for use across the application

## Constants and Configuration
- Group related constants in properly named objects
- Use readonly arrays and objects where appropriate
- Implement proper environment variable handling
- Create type-safe configuration objects
