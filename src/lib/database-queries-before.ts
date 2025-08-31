/**
 * Database queries WITHOUT MCP context
 * This demonstrates generic suggestions without database schema knowledge
 */

// Example queries that would be generated WITHOUT MCP context

// Generic query without knowledge of actual schema
export function getUserTasksQuery(userId: number): string {
  // This query uses generic/incorrect table and column names
  return `
    SELECT * FROM user_tasks 
    WHERE user_id = ${userId} AND status = 'active'
  `;
}

// Generic CRUD operations without schema awareness
export function createTaskQuery(title: string, description: string, priority: string, userId: number): string {
  // Generic insert without knowing actual column structure
  return `
    INSERT INTO tasks (title, description, priority, user_id)
    VALUES ('${title}', '${description}', '${priority}', ${userId})
  `;
}

// Generic filtering without constraint knowledge
export function getTasksByPriorityQuery(priority: string): string {
  // No knowledge of valid priority values or correct column names
  return `
    SELECT * FROM tasks 
    WHERE priority = '${priority}'
    ORDER BY created_at DESC
  `;
}

// Generic relationship queries without FK knowledge
export function getUsersWithTasksQuery(): string {
  // Basic query without proper relationship understanding
  return `
    SELECT u.*, t.* FROM users u, tasks t 
    WHERE u.id = t.user_id
  `;
}

// Generic aggregation without schema knowledge
export function getTaskStatisticsQuery(): string {
  // Generic aggregation with assumed column names
  return `
    SELECT 
      COUNT(*) as total_tasks,
      COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
      COUNT(CASE WHEN priority = 'high' THEN 1 END) as high_priority_tasks
    FROM tasks
  `;
}

// 🎬 DEMO: Ask Copilot to generate this function
// Prompt: "Create a function to get all overdue tasks for a user with their details"
