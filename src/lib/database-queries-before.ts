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
