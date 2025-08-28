# Demo Script: Specification-driven Development with GitHub Copilot

## 🎬 Recording Guide for Presentation

### Setup: Before vs After Comparison

#### Part 1: "Before" - Generic README (2 minutes)
1. **Show the generic Next.js README**
   - Open original README.md (the generic one)
   - Highlight how it's just boilerplate
   - Show VS Code with basic project structure

2. **Ask Copilot to create a Task component**
   - Type: `// Create a Task component for a todo app`
   - **Expected Result**: Generic, basic component
   - **Note for presentation**: Point out generic naming, no specific patterns

3. **Ask for a complete todo page**
   - Type: `// Create a complete todo list page`
   - **Expected Result**: Basic implementation, no specific architecture

#### Part 2: "After" - Detailed Specification (3 minutes)
1. **Show the detailed README.md**
   - Scroll through the comprehensive specification
   - Highlight key sections:
     - Architecture decisions
     - Component conventions
     - Design system
     - Data models

2. **Show the supporting files**
   - `src/types/index.ts` - Complete type definitions
   - `src/lib/utils.ts` - Utility functions
   - `.copilot-instructions.md` - Custom instructions

3. **Ask Copilot to create the same components**
   - Type: `// Create a TaskCard component`
   - **Expected Result**: 
     - Follows exact naming conventions
     - Uses specified TypeScript interfaces
     - Applies design system colors
     - Includes accessibility features
     - Follows component structure template

4. **Ask for a complete feature**
   - Type: `// Create a PriorityBadge component`
   - **Expected Result**:
     - Uses the exact TaskPriority type
     - Applies getPriorityColor utility
     - Follows design system spacing
     - Includes proper accessibility

#### Part 3: Show Custom Instructions Impact (2 minutes)
1. **Demonstrate instruction following**
   - Type: `// Create a task form component`
   - **Show how Copilot**:
     - Uses kebab-case for file suggestions
     - Suggests proper import organization
     - Includes validation according to specs
     - Follows error handling patterns

2. **Show consistency across components**
   - Create multiple components
   - Highlight how they all follow the same patterns

### Key Points to Emphasize

#### 🎯 Specificity Matters
- "Before": Generic suggestions
- "After": Perfectly aligned suggestions

#### 📚 Documentation as Code
- README becomes active development tool
- Types guide implementation automatically
- Custom instructions ensure team consistency

#### 🚀 Productivity Gains
- Less context switching
- Fewer corrections needed
- Consistent patterns across team

#### 🎪 Team Alignment
- Shared understanding through documentation
- Consistent code style automatically
- Onboarding becomes faster

### 📱 Recording Tips

#### For Screen Recording:
1. Use clean VS Code setup (hide unnecessary panels)
2. Increase font size for visibility
3. Use split screen: README on left, code on right
4. Record in 1080p minimum

#### For Presentation:
1. Create GIFs for key moments:
   - Before/After component generation comparison
   - Custom instructions in action
   - Type suggestions following specification

#### Voiceover Script Ideas:
- "Notice how Copilot now suggests the exact interface we defined"
- "The component follows our naming conventions automatically"
- "It's applying our design system colors without us specifying them"
- "This is the power of specification-driven development"

### 🎯 Demo Outcome
By the end of this demo, the audience should understand:
1. How detailed specifications transform AI suggestions
2. The importance of documentation as context
3. How custom instructions enable team consistency
4. The productivity benefits of this approach

### Next Steps
This demo sets up perfectly for the next presentation sections:
- MCPs for external context
- Team integration patterns
- CLI and Smart Actions
