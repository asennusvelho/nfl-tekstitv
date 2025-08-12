# GitHub Copilot Instructions

## Project Overview

This is a Next.js monorepo that renders NFL scores in a teletext-style grid. The codebase follows strict quality standards and modern development practices.

## Architecture & Structure

- **Monorepo**: Uses pnpm workspaces with packages/core (domain logic) and apps/web (Next.js app)
- **Domain-driven design**: Core business logic separated from UI concerns
- **Ports & Adapters**: Clean architecture with ScoreProvider interface and mock/api adapters
- **Type safety**: Strict TypeScript configuration across all packages

## Coding Standards

### TypeScript

- Use strict TypeScript configuration
- Prefer `interface` over `type` for object shapes
- Export types explicitly with `export type` for type-only exports
- Use proper generic constraints and utility types
- Avoid `any` - use `unknown` for truly unknown types

### React & Next.js

- Use Next.js 14 App Router patterns exclusively
- Prefer Server Components by default, mark Client Components with `'use client'`
- Use proper TypeScript for component props with interfaces
- Implement proper error boundaries and loading states
- Follow React best practices for hooks and state management

### Code Quality

- **Zero warnings policy**: All lint warnings must be fixed (enforced by `--max-warnings 0`)
- Use Prettier for consistent formatting
- Write descriptive variable and function names
- Keep functions small and focused (single responsibility)
- Use early returns to reduce nesting

### Testing

- Write unit tests for all business logic (packages/core)
- Write E2E tests for user workflows using Playwright
- Use proper mocking strategies (Next.js router, external dependencies)
- Test both happy path and edge cases

### File Organization

- Use absolute imports with path aliases (`@nfl-tekstitv/core/*`)
- Group related functionality in dedicated modules
- Keep component files focused (one component per file)
- Use barrel exports (`index.ts`) sparingly, prefer explicit imports

### Performance

- Optimize bundle size with proper tree shaking
- Use Next.js built-in performance features (Image, Link, etc.)
- Implement proper caching strategies
- Consider loading states and progressive enhancement

### Accessibility

- Follow WCAG guidelines for accessible UI
- Use semantic HTML elements
- Implement keyboard navigation where appropriate
- Provide proper ARIA labels and descriptions
- Test with screen readers when adding interactive elements

### Styling

- Use Tailwind CSS utility classes
- Maintain the teletext aesthetic (monospace fonts, high contrast colors)
- Ensure responsive design works across devices
- Use consistent spacing and color schemes

## Development Workflow

1. Run `pnpm check` before committing (format, lint, type-check, tests)
2. Use `pnpm fix` to auto-fix formatting and linting issues
3. Write tests for new functionality before implementation
4. Update documentation when adding new features
5. Use descriptive commit messages following conventional commits

## Code Patterns

### Component Structure

```typescript
interface ComponentProps {
  // Use interface for props
}

export default function Component({ prop }: ComponentProps) {
  // Implementation
}
```

### Error Handling

- Use proper error boundaries in React
- Handle async operations with try/catch
- Provide meaningful error messages
- Log errors appropriately for debugging

### Data Fetching

- Use Next.js Server Components for data fetching when possible
- Implement proper loading and error states
- Cache data appropriately
- Handle empty states gracefully

## Git Practices

- Use feature branches for new development
- Write descriptive commit messages
- Keep commits focused and atomic
- Use conventional commit format when possible
- Ensure all tests pass before merging

## Dependencies

- Prefer fewer, well-maintained dependencies
- Use exact versions for critical dependencies
- Keep dependencies up to date
- Document reasons for major dependency choices
