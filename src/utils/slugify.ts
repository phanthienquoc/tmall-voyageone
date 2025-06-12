import slugify from 'slugify'

export function generateProductSlug(title: string, code: string): string {
  const slug = slugify(title, { lower: true, strict: true })
  return `${slug}-${code}`
}

export function extractProductCode(slug: string): string {
  return slug.split('-').pop() || ''
}
