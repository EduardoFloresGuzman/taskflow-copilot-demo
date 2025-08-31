/**
 * Database queries WITH MCP context
 * This demonstrates accurate suggestions with full database schema knowledge
 */

// Accurate queries based on real schema from MCP connection

// Accurate query with proper table and column names
export function getUserTasksQuery(userId: number): string {
  // Uses correct table names and column names from actual schema
  return `
    SELECT 
      t.id,
      t.title,
      t.description,
      t.priority_level,
      t.status,
      t.due_date,
      t.created_at,
      t.updated_at,
      c.name as category_name,
      c.color as category_color
    FROM tasks t
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.user_id = ${userId} 
      AND t.status IN ('pending', 'in_progress')
    ORDER BY 
      CASE t.priority_level 
        WHEN 'urgent' THEN 1
        WHEN 'high' THEN 2
        WHEN 'medium' THEN 3
        WHEN 'low' THEN 4
      END,
      t.due_date ASC NULLS LAST
  `;
}

// Accurate CRUD with proper column names and constraints
export function createTaskQuery(
  userId: number, 
  categoryId: number, 
  title: string, 
  description: string, 
  priorityLevel: 'low' | 'medium' | 'high' | 'urgent'
): string {
  // Uses actual column names and respects CHECK constraints
  return `
    INSERT INTO tasks (
      user_id, 
      category_id, 
      title, 
      description, 
      priority_level, 
      status,
      created_at,
      updated_at
    )
    VALUES (
      ${userId}, 
      ${categoryId}, 
      '${title}', 
      '${description}', 
      '${priorityLevel}',
      'pending',
      datetime('now'),
      datetime('now')
    )
  `;
}

// Filtering with constraint knowledge
export function getTasksByPriorityQuery(priorityLevel: 'low' | 'medium' | 'high' | 'urgent'): string {
  // Knows valid priority_level values from CHECK constraint
  return `
    SELECT 
      t.id,
      t.title,
      t.description,
      t.priority_level,
      t.status,
      t.due_date,
      u.name as assigned_to,
      u.email as assigned_email,
      c.name as category,
      c.color as category_color
    FROM tasks t
    JOIN users u ON t.user_id = u.id
    LEFT JOIN categories c ON t.category_id = c.id
    WHERE t.priority_level = '${priorityLevel}'
    ORDER BY t.created_at DESC
  `;
}

// Proper relationship queries with FK understanding
export function getUsersWithTasksQuery(): string {
  // Uses proper JOINs based on foreign key relationships
  return `
    SELECT 
      u.id as user_id,
      u.name as user_name,
      u.email,
      COUNT(t.id) as total_tasks,
      COUNT(CASE WHEN t.status = 'completed' THEN 1 END) as completed_tasks,
      COUNT(CASE WHEN t.status IN ('pending', 'in_progress') THEN 1 END) as active_tasks,
      COUNT(CASE WHEN t.due_date < datetime('now') AND t.status != 'completed' THEN 1 END) as overdue_tasks
    FROM users u
    LEFT JOIN tasks t ON u.id = t.user_id
    GROUP BY u.id, u.name, u.email
    ORDER BY active_tasks DESC, u.name
  `;
}

// Advanced aggregation with full schema knowledge
export function getTaskStatisticsQuery(): string {
  // Comprehensive statistics using actual column names and constraints
  return `
    SELECT 
      COUNT(*) as total_tasks,
      COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_tasks,
      COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_tasks,
      COUNT(CASE WHEN status = 'in_progress' THEN 1 END) as in_progress_tasks,
      COUNT(CASE WHEN status = 'cancelled' THEN 1 END) as cancelled_tasks,
      COUNT(CASE WHEN priority_level = 'urgent' THEN 1 END) as urgent_tasks,
      COUNT(CASE WHEN priority_level = 'high' THEN 1 END) as high_priority_tasks,
      COUNT(CASE WHEN priority_level = 'medium' THEN 1 END) as medium_priority_tasks,
      COUNT(CASE WHEN priority_level = 'low' THEN 1 END) as low_priority_tasks,
      COUNT(CASE WHEN due_date < datetime('now') AND status != 'completed' THEN 1 END) as overdue_tasks,
      AVG(CASE 
        WHEN priority_level = 'urgent' THEN 4
        WHEN priority_level = 'high' THEN 3
        WHEN priority_level = 'medium' THEN 2
        WHEN priority_level = 'low' THEN 1
      END) as avg_priority_score
    FROM tasks
  `;
}

// Complex query leveraging views and relationships
export function getTasksWithCommentsQuery(): string {
  // Uses knowledge of related tables and their relationships
  return `
    SELECT 
      t.id as task_id,
      t.title,
      t.description,
      t.priority_level,
      t.status,
      u.name as assigned_to,
      c.name as category,
      COUNT(tc.id) as comment_count,
      MAX(tc.created_at) as last_comment_at
    FROM tasks t
    JOIN users u ON t.user_id = u.id
    LEFT JOIN categories c ON t.category_id = c.id
    LEFT JOIN task_comments tc ON t.id = tc.task_id
    GROUP BY t.id, t.title, t.description, t.priority_level, t.status, u.name, c.name
    HAVING COUNT(tc.id) > 0
    ORDER BY last_comment_at DESC
  `;
}

// Update query with proper constraint handling
export function updateTaskStatusQuery(taskId: number, status: 'pending' | 'in_progress' | 'completed' | 'cancelled'): string {
  // Knows valid status values from CHECK constraint
  return `
    UPDATE tasks 
    SET 
      status = '${status}',
      updated_at = datetime('now')
    WHERE id = ${taskId}
  `;
}

// 🎬 DEMO: Ask Copilot to generate this function with MCP context
// Prompt: "Create a function to get all overdue tasks for a user with their details"
