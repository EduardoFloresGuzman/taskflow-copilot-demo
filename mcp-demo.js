#!/usr/bin/env node

/**
 * MCP Demo Test Runner
 * Demonstrates the difference between queries generated with and without MCP context
 */

const fs = require('fs');
const path = require('path');

// Read and display the "before" query (without MCP)
function showBeforeQuery() {
  console.log('🚫 === WITHOUT MCP CONTEXT (Generic/Incorrect) ===\n');
  
  const beforeFile = path.join(__dirname, 'src/lib/database-queries-before.ts');
  const beforeContent = fs.readFileSync(beforeFile, 'utf8');
  
  // Extract the getUserTasksQuery function content
  const beforeMatch = beforeContent.match(/getUserTasksQuery\([\s\S]*?return `([\s\S]*?)`;/);
  if (beforeMatch) {
    console.log('Generated Query:');
    console.log('```sql');
    console.log(beforeMatch[1].trim());
    console.log('```\n');
    
    console.log('❌ Issues with this query:');
    console.log('   • Uses incorrect table name "user_tasks" (should be "tasks")');
    console.log('   • Uses generic status "active" (actual values: pending, in_progress, completed, cancelled)');
    console.log('   • Missing important columns (priority_level, due_date, category info)');
    console.log('   • No proper ordering or relationships\n');
  }
}

// Read and display the "after" query (with MCP)
function showAfterQuery() {
  console.log('✅ === WITH MCP CONTEXT (Schema-Aware/Accurate) ===\n');
  
  const afterFile = path.join(__dirname, 'src/lib/database-queries-after.ts');
  const afterContent = fs.readFileSync(afterFile, 'utf8');
  
  // Extract the getUserTasksQuery function content
  const afterMatch = afterContent.match(/getUserTasksQuery\([\s\S]*?return `([\s\S]*?)`;/);
  if (afterMatch) {
    console.log('Generated Query:');
    console.log('```sql');
    console.log(afterMatch[1].trim());
    console.log('```\n');
    
    console.log('✅ Improvements with MCP context:');
    console.log('   • Uses correct table name "tasks"');
    console.log('   • Uses actual status values from CHECK constraints');
    console.log('   • Includes all relevant columns with proper aliases');
    console.log('   • Proper JOINs with categories table');
    console.log('   • Intelligent ORDER BY with priority and due_date');
    console.log('   • Handles NULL values correctly (NULLS LAST)');
    console.log('   • Uses actual foreign key relationships\n');
  }
}

// Show database schema for reference
function showSchema() {
  console.log('📊 === DATABASE SCHEMA (from demo.db) ===\n');
  
  try {
    const { execSync } = require('child_process');
    const schema = execSync('sqlite3 demo.db ".schema tasks"', { encoding: 'utf8' });
    console.log('Tasks Table Schema:');
    console.log('```sql');
    console.log(schema.trim());
    console.log('```\n');
    
    const categories = execSync('sqlite3 demo.db ".schema categories"', { encoding: 'utf8' });
    console.log('Categories Table Schema:');
    console.log('```sql');
    console.log(categories.trim());
    console.log('```\n');
    
  } catch (error) {
    console.log('⚠️  Could not read database schema. Make sure demo.db exists.');
    console.log('   Run: sqlite3 demo.db < demo-database.sql\n');
  }
}

// Main execution
function main() {
  const command = process.argv[2];
  
  switch (command) {
    case 'before':
      showBeforeQuery();
      break;
    case 'after':
      showAfterQuery();
      break;
    case 'compare':
      showBeforeQuery();
      console.log('─'.repeat(80) + '\n');
      showAfterQuery();
      break;
    case 'schema':
      showSchema();
      break;
    case 'full':
      showSchema();
      console.log('─'.repeat(80) + '\n');
      showBeforeQuery();
      console.log('─'.repeat(80) + '\n');
      showAfterQuery();
      break;
    default:
      console.log('MCP Demo Commands:');
      console.log('  npm run demo:before    - Show query without MCP context');
      console.log('  npm run demo:after     - Show query with MCP context');
      console.log('  npm run demo:compare   - Show side-by-side comparison');
      console.log('  npm run demo:schema    - Show database schema');
      console.log('  npm run demo:full      - Show complete demonstration');
      break;
  }
}

main();
