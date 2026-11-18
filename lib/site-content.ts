import { eq } from 'drizzle-orm'
import { db } from '@/lib/db'
import { siteContent, siteContentSources, siteSources } from '@/lib/db/schema'

function safeExternalUrl(value: string): string | null {
  try {
    const url = new URL(value)
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.toString() : null
  } catch {
    return null
  }
}

export async function getHistoryContent() {
  const [record] = await db
    .select({ data: siteContent.contentData })
    .from(siteContent)
    .where(eq(siteContent.contentKey, 'history-overview'))
    .limit(1)

  if (!record) {
    throw new Error('The history content record is missing from the database.')
  }

  const citations = await db
    .select({
      sourceId: siteSources.sourceId,
      title: siteSources.title,
      url: siteSources.sourceUrl,
      locator: siteContentSources.locator,
      attributionNote: siteContentSources.attributionNote,
    })
    .from(siteContentSources)
    .innerJoin(siteSources, eq(siteContentSources.sourceId, siteSources.sourceId))
    .where(eq(siteContentSources.contentKey, 'history-overview'))

  return {
    ...record.data,
    citations: citations.map((citation) => ({ ...citation, url: safeExternalUrl(citation.url) })),
  }
}

export async function getSourceRegistry() {
  const sources = await db
    .select({
      id: siteSources.sourceId,
      title: siteSources.title,
      organization: siteSources.organization,
      url: siteSources.sourceUrl,
      sourceType: siteSources.sourceType,
      licenseStatus: siteSources.licenseStatus,
      requiredCredit: siteSources.requiredCredit,
      checkedAt: siteSources.checkedAt,
      notes: siteSources.notes,
    })
    .from(siteSources)
    .orderBy(siteSources.title)

  return sources.map((source) => ({ ...source, url: safeExternalUrl(source.url) }))
}
