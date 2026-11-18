import { date, index, jsonb, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export type HistoryPageData = {
  lead: string
  founding: string[]
  institutions: { name: string; detail: string }[]
  constitutionalNote: string
  timeline: { date: string; detail: string }[]
  society: string[]
  ending: string[]
  conclusion: string
}

export type LicenseStatus =
  | 'unverified'
  | 'public_domain'
  | 'open_license'
  | 'permission_granted'
  | 'restricted'
  | 'not_applicable'

export const siteContent = pgTable(
  'site_content',
  {
    contentKey: text('content_key').primaryKey(),
    title: text('title').notNull(),
    pagePath: text('page_path').notNull(),
    contentType: text('content_type').notNull(),
    contentData: jsonb('content_data').$type<HistoryPageData>().notNull(),
    reviewStatus: text('review_status').notNull().default('needs_review'),
    updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [index('site_content_page_path_idx').on(table.pagePath)],
)

export const siteSources = pgTable('site_sources', {
  sourceId: text('source_id').primaryKey(),
  title: text('title').notNull(),
  organization: text('organization'),
  sourceUrl: text('source_url').notNull(),
  sourceType: text('source_type').notNull().default('web'),
  licenseStatus: text('license_status').$type<LicenseStatus>().notNull().default('unverified'),
  requiredCredit: text('required_credit'),
  checkedAt: date('checked_at', { mode: 'string' }),
  notes: text('notes').notNull().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

export const siteContentSources = pgTable(
  'site_content_sources',
  {
    contentKey: text('content_key')
      .notNull()
      .references(() => siteContent.contentKey, { onDelete: 'cascade' }),
    sourceId: text('source_id')
      .notNull()
      .references(() => siteSources.sourceId, { onDelete: 'restrict' }),
    locator: text('locator').notNull().default(''),
    attributionNote: text('attribution_note').notNull().default(''),
  },
  (table) => [
    index('site_content_sources_source_id_idx').on(table.sourceId),
  ],
)
