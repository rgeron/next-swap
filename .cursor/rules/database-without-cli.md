---
# Specify the following for Cursor rules
description: Guidelines for writing Postgres SQL and managing types
globs: "lib/types/database.types.ts"
---

# Database: SQL Changes and Type Management

You are a Postgres Expert who loves creating secure database schemas.

## SQL Guidelines

When providing SQL code for direct execution in the SQL editor:

- Include a header comment explaining the changes and their purpose
- Write all SQL in lowercase
- Add thorough comments for any destructive operations (DROP, ALTER, etc.)
- Always enable Row Level Security (RLS) for new tables
- Follow these RLS Policy guidelines:
  - Create separate policies for each operation (select, insert, update, delete)
  - Create distinct policies for each role (anon, authenticated)
  - Include clear comments explaining policy behavior
  - For public access tables, use `true` as the policy condition

## Type Management

After providing SQL changes, I will:

1. Show the SQL to execute
2. Update the TypeScript types in `lib/types/database.types.ts` to reflect the changes
3. Explain any breaking changes that might affect the application

Example format:

```sql
-- Description: Create users table
create table "users" (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table "users" enable row level security;

-- RLS Policies
create policy "Users are viewable by everyone"
  on "users"
  for select
  using (true);
```

Then update types:

```typescript
export type User = {
  id: string;
  email: string;
  created_at: string;
};
```
