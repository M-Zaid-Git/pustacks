// This file is used to set up the FaunaDB schema for the application
// It creates the necessary collections, indexes, and roles
// Run with: node setup-database.js

require('dotenv').config();
const faunadb = require('faunadb');
const q = faunadb.query;

// Check for the required environment variable
if (!process.env.FAUNA_SECRET_KEY) {
  console.error('Required FAUNA_SECRET_KEY environment variable is missing');
  process.exit(1);
}

// Initialize the FaunaDB client
const client = new faunadb.Client({
  secret: process.env.FAUNA_SECRET_KEY,
});

// Main setup function
async function setupDatabase() {
  try {
    console.log('Setting up FaunaDB schema...');

    // Create Users collection
    try {
      await client.query(
        q.CreateCollection({
          name: 'users',
          history_days: 30,
        })
      );
      console.log('✅ Users collection created');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️ Users collection already exists');
      } else {
        throw error;
      }
    }

    // Create Materials collection
    try {
      await client.query(
        q.CreateCollection({
          name: 'materials',
          history_days: 30,
        })
      );
      console.log('✅ Materials collection created');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️ Materials collection already exists');
      } else {
        throw error;
      }
    }

    // Create Categories collection
    try {
      await client.query(
        q.CreateCollection({
          name: 'categories',
          history_days: 30,
        })
      );
      console.log('✅ Categories collection created');
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('ℹ️ Categories collection already exists');
      } else {
        throw error;
      }
    }

    // Create indexes
    const indexes = [
      {
        name: 'users_by_email',
        collection: 'users',
        terms: [{ field: ['data', 'email'] }],
        unique: true,
      },
      {
        name: 'users_by_role',
        collection: 'users',
        terms: [{ field: ['data', 'role'] }],
      },
      {
        name: 'materials_by_category',
        collection: 'materials',
        terms: [{ field: ['data', 'category'] }],
      },
      {
        name: 'materials_by_uploadedBy',
        collection: 'materials',
        terms: [{ field: ['data', 'uploadedBy'] }],
      },
      {
        name: 'all_categories',
        collection: 'categories',
      },
    ];

    // Create each index
    for (const index of indexes) {
      try {
        await client.query(q.CreateIndex(index));
        console.log(`✅ Index ${index.name} created`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`ℹ️ Index ${index.name} already exists`);
        } else {
          console.error(`❌ Error creating index ${index.name}:`, error);
        }
      }
    }

    // Create sample categories if they don't exist
    const categories = [
      { id: 'books', name: 'Books', icon: 'book', description: 'Academic books for all courses' },
      { id: 'notes', name: 'Notes', icon: 'note', description: 'Class notes and handouts' },
      { id: 'papers', name: 'Previous Papers', icon: 'paper', description: 'Past exam papers and solutions' },
      {
        id: 'interviews',
        name: 'Interview Preparation',
        icon: 'interview',
        description: 'Resources for job interviews',
      },
      { id: 'coding', name: 'Coding Resources', icon: 'code', description: 'Programming tutorials and examples' },
    ];

    for (const category of categories) {
      try {
        // Check if category exists
        const existingCategory = await client.query(q.Exists(q.Match(q.Index('all_categories'), category.id)));

        if (!existingCategory) {
          await client.query(
            q.Create(q.Collection('categories'), {
              data: category,
            })
          );
          console.log(`✅ Category ${category.name} created`);
        } else {
          console.log(`ℹ️ Category ${category.name} already exists`);
        }
      } catch (error) {
        console.error(`❌ Error creating category ${category.name}:`, error);
      }
    }

    console.log('✅ Database setup completed successfully');
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  }
}

// Run the setup
setupDatabase();
