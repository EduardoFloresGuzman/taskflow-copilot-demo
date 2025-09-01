# TaskFlow - Smart Todo List Application

> **Demo Project**: Showcasing GitHub Copilot's specification-driven development capabilities

## 🎯 Project Overview

TaskFlow is a modern, intelligent todo list application built with Next.js 15, demonstrating how detailed specifications enable GitHub Copilot to generate perfectly aligned code.

### Key Features
- ✅ Smart task management with priorities and categories
- ✅ Real-time search and filtering
- ✅ Drag & drop task reordering
- ✅ Dark/Light theme support
- ✅ Local storage persistence
- ✅ Responsive design with mobile-first approach

---

## 🏗️ Architecture & Design Decisions

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: TailwindCSS v4 (following design system)
- **State Management**: React hooks with Context API
- **Storage**: Browser localStorage with JSON serialization
- **Icons**: Lucide React (consistent icon family)
- **TypeScript**: Strict mode enabled

### Design Principles
1. **Component Composition**: Small, focused, reusable components
2. **Separation of Concerns**: Business logic separated from UI
3. **Accessibility First**: WCAG 2.1 AA compliance
4. **Performance**: Zero unnecessary re-renders
5. **Type Safety**: 100% TypeScript coverage

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main todo page
│   └── globals.css        # Global styles
├── components/            # Reusable UI components
│   ├── ui/               # Base UI components (buttons, inputs)
│   ├── task/             # Task-related components
│   └── layout/           # Layout components (header, footer)
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and constants
├── types/                # TypeScript type definitions
└── contexts/             # React context providers
```

---

## 🎨 Design System

### Color Palette
```css
Primary: #2563eb (blue-600)
Secondary: #64748b (slate-500)
Success: #059669 (emerald-600)
Warning: #d97706 (amber-600)
Error: #dc2626 (red-600)
Background: #ffffff / #0f172a
Text: #1e293b / #f1f5f9
```

### Typography
- **Font Family**: Inter (system font fallback)
- **Headings**: font-semibold, tracking-tight
- **Body**: font-normal, leading-relaxed
- **Code**: font-mono

### Spacing
- Base unit: 4px (0.25rem)
- Component padding: 12px, 16px, 24px
- Section margins: 24px, 32px, 48px

---

## 🔧 Component Conventions

### Naming
- **Components**: PascalCase (`TaskCard`, `PriorityBadge`)
- **Files**: kebab-case (`task-card.tsx`, `priority-badge.tsx`)
- **Props**: camelCase with descriptive names
- **CSS Classes**: Tailwind utilities (no custom CSS)

### Component Structure
```typescript
// Standard component template
interface ComponentProps {
  // Props with JSDoc comments
}

export function ComponentName({ prop1, prop2 }: ComponentProps) {
  // 1. Hooks
  // 2. Derived state
  // 3. Event handlers
  // 4. JSX return
}
```

### State Management Patterns
- **Local State**: `useState` for component-specific data
- **Shared State**: Context API for cross-component data
- **Derived State**: Computed values using `useMemo`
- **Side Effects**: `useEffect` with proper dependencies

---

## 📝 Data Models

### Task Interface
```typescript
interface Task {
  id: string;              // UUID v4
  title: string;           // Max 100 characters
  description?: string;    // Optional, max 500 characters
  completed: boolean;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;        // User-defined categories
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;         // Optional deadline
}
```

### Application State
```typescript
interface AppState {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
  searchTerm: string;
  selectedCategory: string | null;
  theme: 'light' | 'dark';
}
```

---

## 🎪 User Experience Patterns

### Interactions
- **Add Task**: Enter key or click "Add" button
- **Complete Task**: Checkbox click with smooth animation
- **Edit Task**: Double-click to enable inline editing
- **Delete Task**: Swipe gesture on mobile, hover action on desktop
- **Priority Change**: Color-coded dropdown selection

### Feedback
- **Loading States**: Skeleton placeholders
- **Success Actions**: Subtle animations (checkmark, fade)
- **Error States**: Inline validation messages
- **Empty States**: Helpful illustrations and CTAs

### Accessibility
- **Keyboard Navigation**: Full tab order support
- **Screen Readers**: Proper ARIA labels and descriptions
- **Color Contrast**: Minimum 4.5:1 ratio
- **Focus Management**: Visible focus indicators

---

## 🚀 Development Workflow

### Code Style
- **Prettier**: 2-space indentation, single quotes
- **ESLint**: Strict TypeScript rules
- **Import Order**: External → Internal → Relative
- **File Organization**: Index files for clean imports

### Testing Approach
- **Unit Tests**: Component logic and utilities
- **Integration Tests**: User workflows
- **E2E Tests**: Critical user journeys
- **Accessibility Tests**: Automated a11y checks

### Performance Targets
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Bundle Size**: < 250KB gzipped
- **Lighthouse Score**: > 95/100

---

## 🛠️ Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### MCP (Model Context Protocol) Demo Commands

This project includes demonstration commands showcasing the difference between AI-generated code with and without database schema context:

```bash
# Show all available demo commands
npm run demo:help

# Show query generated WITHOUT MCP context (generic/incorrect)
npm run demo:before

# Show query generated WITH MCP context (schema-aware/accurate)  
npm run demo:after

# Side-by-side comparison of both approaches
npm run demo:compare

# View the actual database schema
npm run demo:schema

# Complete demonstration with schema + before/after comparison
npm run demo:mcp-full
```

### Real Database Query Execution

Execute the MCP-enhanced `getUserTasksQuery` against the actual database with real data:

```bash
# Execute getUserTasksQuery for user ID 1 (default)
npm run demo:query

# Execute for a specific user ID
npm run demo:query-user -- --user-id 2

# Show database contents overview (users, categories, task summary)
npm run demo:db-contents
```

**What this demonstrates:**
- **Without MCP**: Generic queries with incorrect table names, missing columns, and improper relationships
- **With MCP**: Schema-aware queries using actual table names, proper JOINs, correct constraints, and intelligent ordering
- **Real Execution**: Shows the MCP-enhanced query returning actual data with proper sorting by priority and due dates

This showcases how Model Context Protocol enables AI to generate production-ready database queries by understanding your actual schema structure.

### Environment Requirements
- Node.js 18.17.0 or later
- npm 9.x or later
- Modern browser with ES2022 support

---

## 📚 Implementation Guidelines

### When adding new features:
1. **Start with types**: Define interfaces first
2. **Component first**: Build UI before logic
3. **Test driven**: Write tests alongside code
4. **Document as you go**: Update this README

### Code review checklist:
- [ ] TypeScript strict compliance
- [ ] Accessibility considerations
- [ ] Performance implications
- [ ] Design system adherence
- [ ] Test coverage maintained

---

## 🎯 Success Metrics

This specification enables GitHub Copilot to:
- Generate components following exact naming conventions
- Suggest state management patterns aligned with architecture
- Propose UI implementations matching design system
- Recommend accessibility attributes automatically
- Follow established file organization patterns

**Result**: Faster development with consistent, high-quality code generation.
