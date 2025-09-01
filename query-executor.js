#!/usr/bin/env node

/**
 * MCP Database Query Executor
 * Actually executes the getUserTasksQuery against the real database
 */

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

// Function to execute the getUserTasksQuery with real data
function executeGetUserTasksQuery(userId = 1) {
  console.log('🗄️  === EXECUTING getUserTasksQuery WITH REAL DATABASE ===\n');
  
  const dbPath = path.join(__dirname, 'demo.db');
  
  // Check if database exists
  if (!fs.existsSync(dbPath)) {
    console.log('❌ Database not found at demo.db');
    console.log('   Please run: sqlite3 demo.db < demo-database.sql\n');
    return;
  }

  // Read the after query function
  const afterFile = path.join(__dirname, 'src/lib/database-queries-after.ts');
  const afterContent = fs.readFileSync(afterFile, 'utf8');
  
  // Extract the getUserTasksQuery function and get the SQL
  const afterMatch = afterContent.match(/getUserTasksQuery\([\s\S]*?return `([\s\S]*?)`;/);
  if (!afterMatch) {
    console.log('❌ Could not extract getUserTasksQuery from database-queries-after.ts');
    return;
  }

  // Replace the ${userId} placeholder with actual value
  const sqlQuery = afterMatch[1].trim().replace('${userId}', userId);
  
  console.log(`📋 Executing query for User ID: ${userId}`);
  console.log('```sql');
  console.log(sqlQuery);
  console.log('```\n');

  // Open database and execute query
  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY, (err) => {
    if (err) {
      console.log('❌ Error opening database:', err.message);
      return;
    }
  });

  db.all(sqlQuery, [], (err, rows) => {
    if (err) {
      console.log('❌ Error executing query:', err.message);
      db.close();
      return;
    }

    console.log('✅ === QUERY RESULTS ===\n');
    
    if (rows.length === 0) {
      console.log('📭 No tasks found for this user.');
      console.log('   This might be because:');
      console.log('   • User has no tasks');
      console.log('   • All tasks are completed or cancelled');
      console.log('   • User ID doesn\'t exist\n');
      
      // Show available users
      db.all('SELECT id, name FROM users LIMIT 5', [], (err, users) => {
        if (!err && users.length > 0) {
          console.log('👥 Available users in database:');
          users.forEach(user => {
            console.log(`   • User ${user.id}: ${user.name}`);
          });
          console.log('   Try: npm run demo:query -- --user-id <id>\n');
        }
        db.close();
      });
    } else {
      console.log(`📊 Found ${rows.length} active task(s):\n`);
      
      rows.forEach((row, index) => {
        console.log(`${index + 1}. 📝 ${row.title}`);
        console.log(`   Priority: ${row.priority_level} | Status: ${row.status}`);
        if (row.category_name) {
          console.log(`   Category: ${row.category_name} (${row.category_color})`);
        }
        if (row.due_date) {
          console.log(`   Due: ${row.due_date}`);
        }
        if (row.description) {
          console.log(`   Description: ${row.description}`);
        }
        console.log(`   Created: ${row.created_at}`);
        console.log('');
      });
      
      // Show summary statistics
      const urgentCount = rows.filter(r => r.priority_level === 'urgent').length;
      const highCount = rows.filter(r => r.priority_level === 'high').length;
      const overdueCount = rows.filter(r => r.due_date && new Date(r.due_date) < new Date()).length;
      
      console.log('📈 Summary:');
      console.log(`   • Total active tasks: ${rows.length}`);
      console.log(`   • Urgent priority: ${urgentCount}`);
      console.log(`   • High priority: ${highCount}`);
      console.log(`   • Overdue tasks: ${overdueCount}`);
      console.log('');
      
      db.close();
    }
  });
}

// Show database contents for reference
function showDatabaseContents() {
  console.log('📊 === DATABASE CONTENTS OVERVIEW ===\n');
  
  const dbPath = path.join(__dirname, 'demo.db');
  
  if (!fs.existsSync(dbPath)) {
    console.log('❌ Database not found at demo.db');
    return;
  }

  const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READONLY);
  
  // Show users
  db.all('SELECT id, name, email FROM users', [], (err, users) => {
    if (!err) {
      console.log('👥 Users:');
      users.forEach(user => {
        console.log(`   ${user.id}. ${user.name} (${user.email})`);
      });
      console.log('');
    }
    
    // Show categories
    db.all('SELECT id, name, color FROM categories', [], (err, categories) => {
      if (!err) {
        console.log('📁 Categories:');
        categories.forEach(cat => {
          console.log(`   ${cat.id}. ${cat.name} (${cat.color})`);
        });
        console.log('');
      }
      
      // Show task summary
      db.all(`
        SELECT 
          status, 
          priority_level, 
          COUNT(*) as count 
        FROM tasks 
        GROUP BY status, priority_level 
        ORDER BY status, priority_level
      `, [], (err, summary) => {
        if (!err) {
          console.log('📋 Task Summary:');
          summary.forEach(s => {
            console.log(`   ${s.status} | ${s.priority_level}: ${s.count} tasks`);
          });
          console.log('');
        }
        db.close();
      });
    });
  });
}

// Main execution
function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (command === 'contents') {
    showDatabaseContents();
  } else if (command === 'query') {
    // Check for user-id argument
    const userIdIndex = args.indexOf('--user-id');
    const userId = userIdIndex !== -1 && args[userIdIndex + 1] ? parseInt(args[userIdIndex + 1]) : 1;
    executeGetUserTasksQuery(userId);
  } else {
    console.log('Database Query Commands:');
    console.log('  npm run demo:query         - Execute getUserTasksQuery for user 1');
    console.log('  npm run demo:query-user -- --user-id 2  - Execute for specific user');
    console.log('  npm run demo:db-contents   - Show database overview');
  }
}

main();
