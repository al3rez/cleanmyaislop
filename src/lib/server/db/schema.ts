import { pgTable, serial, text, timestamp, varchar, boolean, integer, decimal, pgEnum, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Enums
export const userRoleEnum = pgEnum('user_role', ['client', 'developer', 'admin']);
export const projectStatusEnum = pgEnum('project_status', ['draft', 'open', 'in_progress', 'completed', 'cancelled']);
export const proposalStatusEnum = pgEnum('proposal_status', ['pending', 'accepted', 'rejected', 'withdrawn']);
export const platformEnum = pgEnum('platform', ['replit', 'lovable', 'v0', 'cursor', 'other']);

// Waitlist table
export const waitlist = pgTable('waitlist', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).notNull(),
  role: userRoleEnum('role').notNull().default('client'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  ipAddress: varchar('ip_address', { length: 45 }),
  userAgent: text('user_agent'),
  referrer: varchar('referrer', { length: 512 })
}, (table) => {
  return {
    // Ensure same email can't sign up as both client and developer
    emailRoleUnique: unique().on(table.email, table.role)
  };
});

// Users table
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  email: varchar('email', { length: 256 }).notNull().unique(),
  name: varchar('name', { length: 256 }).notNull(),
  password: varchar('password', { length: 256 }).notNull(),
  role: userRoleEnum('role').notNull().default('client'),
  emailVerified: boolean('email_verified').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Sessions table
export const sessions = pgTable('sessions', {
  id: varchar('id', { length: 256 }).primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  expiresAt: timestamp('expires_at').notNull()
});

// Developer profiles (extends users)
export const developerProfiles = pgTable('developer_profiles', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull().unique().references(() => users.id, { onDelete: 'cascade' }),
  bio: text('bio'),
  skills: text('skills').array(),
  platforms: platformEnum('platforms').array(),
  hourlyRate: decimal('hourly_rate', { precision: 10, scale: 2 }),
  availability: varchar('availability', { length: 50 }),
  githubUrl: varchar('github_url', { length: 256 }),
  portfolioUrl: varchar('portfolio_url', { length: 256 }),
  featured: boolean('featured').notNull().default(false),
  rating: decimal('rating', { precision: 3, scale: 2 }),
  reviewCount: integer('review_count').notNull().default(0),
  completedProjects: integer('completed_projects').notNull().default(0),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Projects/Jobs
export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  clientId: integer('client_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description').notNull(),
  platform: platformEnum('platform').notNull(),
  budget: decimal('budget', { precision: 10, scale: 2 }),
  timeframe: varchar('timeframe', { length: 100 }),
  skills: text('skills').array(),
  status: projectStatusEnum('status').notNull().default('draft'),
  developerId: integer('developer_id').references(() => users.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Proposals from developers
export const proposals = pgTable('proposals', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  developerId: integer('developer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  coverLetter: text('cover_letter').notNull(),
  proposedRate: decimal('proposed_rate', { precision: 10, scale: 2 }).notNull(),
  estimatedHours: integer('estimated_hours'),
  status: proposalStatusEnum('status').notNull().default('pending'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow()
});

// Reviews
export const reviews = pgTable('reviews', {
  id: serial('id').primaryKey(),
  projectId: integer('project_id').notNull().references(() => projects.id, { onDelete: 'cascade' }),
  reviewerId: integer('reviewer_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  revieweeId: integer('reviewee_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  rating: integer('rating').notNull(),
  comment: text('comment'),
  createdAt: timestamp('created_at').notNull().defaultNow()
});

// Relations
export const usersRelations = relations(users, ({ one, many }) => ({
  developerProfile: one(developerProfiles),
  clientProjects: many(projects, { relationName: 'clientProjects' }),
  developerProjects: many(projects, { relationName: 'developerProjects' }),
  proposals: many(proposals),
  reviewsGiven: many(reviews, { relationName: 'reviewsGiven' }),
  reviewsReceived: many(reviews, { relationName: 'reviewsReceived' }),
  sessions: many(sessions)
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id]
  })
}));

export const developerProfilesRelations = relations(developerProfiles, ({ one }) => ({
  user: one(users, {
    fields: [developerProfiles.userId],
    references: [users.id]
  })
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  client: one(users, {
    fields: [projects.clientId],
    references: [users.id],
    relationName: 'clientProjects'
  }),
  developer: one(users, {
    fields: [projects.developerId],
    references: [users.id],
    relationName: 'developerProjects'
  }),
  proposals: many(proposals),
  reviews: many(reviews)
}));

export const proposalsRelations = relations(proposals, ({ one }) => ({
  project: one(projects, {
    fields: [proposals.projectId],
    references: [projects.id]
  }),
  developer: one(users, {
    fields: [proposals.developerId],
    references: [users.id]
  })
}));

export const reviewsRelations = relations(reviews, ({ one }) => ({
  project: one(projects, {
    fields: [reviews.projectId],
    references: [projects.id]
  }),
  reviewer: one(users, {
    fields: [reviews.reviewerId],
    references: [users.id],
    relationName: 'reviewsGiven'
  }),
  reviewee: one(users, {
    fields: [reviews.revieweeId],
    references: [users.id],
    relationName: 'reviewsReceived'
  })
}));