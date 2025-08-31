---
applyTo: "src/app/**/*.tsx"
---

# Next.js App Router Instructions

## Page Component Structure
- Use TypeScript functional components for all page components
- Include proper metadata using Next.js 15 metadata API
- Implement loading.tsx and error.tsx files for better UX
- Use async components for data fetching when needed

## Layout Guidelines
- Root layout should include global providers and metadata
- Implement proper HTML structure with semantic elements
- Include theme providers and global styles
- Add proper viewport and meta tags for responsive design

## Routing Conventions
- Use file-based routing with App Router conventions
- Implement proper nested layouts where beneficial
- Create loading and error boundaries for each route segment
- Use dynamic routes with proper TypeScript typing

## Data Fetching Patterns
- Use server components for initial data loading when possible
- Implement proper error handling for async operations
- Apply proper caching strategies for data fetching
- Use suspense boundaries for loading states

## SEO and Metadata
- Include proper page titles and descriptions
- Add Open Graph and Twitter Card metadata
- Implement structured data where appropriate
- Use proper canonical URLs and meta tags

## Performance Considerations
- Optimize images using Next.js Image component
- Implement proper code splitting and lazy loading
- Use static generation where possible
- Apply proper caching headers and strategies

## Styling Integration
- Import global styles in root layout only
- Use CSS modules or TailwindCSS for component styling
- Implement proper responsive design patterns
- Ensure consistent theming across all pages
