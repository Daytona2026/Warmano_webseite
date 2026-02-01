import { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Calendar, User, Tag, ArrowRight } from 'lucide-react'
import Container from '@/components/ui/Container'
import { getBlogPosts, BlogPost } from '@/lib/odoo'

export const metadata: Metadata = {
  title: 'Blog | WARMANO - Wärmepumpen Ratgeber',
  description: 'Tipps, Tricks und Wissenswertes rund um Wärmepumpen. Erfahren Sie mehr über Wartung, Effizienz und Pflege Ihrer Wärmepumpe.',
}

export const revalidate = 300 // Revalidate every 5 minutes

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function getExcerpt(content: string, maxLength: number = 160): string {
  const text = stripHtml(content)
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

function BlogCard({ post }: { post: BlogPost }) {
  const excerpt = post.website_meta_description || getExcerpt(post.content)
  const date = post.published_date || post.create_date

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block bg-warmano-gray-800/50 border border-warmano-gray-700/50 rounded-2xl overflow-hidden hover:border-warmano-orange/50 transition-all duration-300 hover:shadow-lg hover:shadow-warmano-orange/10"
    >
      {/* Placeholder for cover image */}
      <div className="h-48 bg-gradient-to-br from-warmano-orange/20 to-amber-500/10 flex items-center justify-center">
        <span className="text-6xl opacity-50">
          {post.name.charAt(0).toUpperCase()}
        </span>
      </div>

      <div className="p-6">
        {/* Tags */}
        {post.tag_ids && post.tag_ids.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {post.tag_ids.slice(0, 3).map((tag) => (
              <span
                key={tag.id}
                className="px-2 py-1 text-xs font-medium bg-warmano-orange/10 text-warmano-orange rounded-full"
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl font-bold text-warmano-white mb-2 group-hover:text-warmano-orange transition-colors line-clamp-2">
          {post.name}
        </h2>

        {/* Subtitle or Excerpt */}
        <p className="text-warmano-gray-400 text-sm mb-4 line-clamp-3">
          {post.subtitle || excerpt}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-warmano-gray-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(date)}
            </span>
            {post.author_name && (
              <span className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                {post.author_name}
              </span>
            )}
          </div>
          <span className="flex items-center gap-1 text-warmano-orange group-hover:translate-x-1 transition-transform">
            Lesen
            <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default async function BlogPage() {
  const result = await getBlogPosts(50, 0)
  const posts = result.posts || []

  return (
    <main className="min-h-screen bg-warmano-black pt-24 pb-16">
      <Container>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-warmano-gray-400 hover:text-warmano-orange transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zur Startseite
        </Link>

        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-warmano-white mb-4">
            Wärmepumpen{' '}
            <span className="bg-gradient-to-r from-warmano-orange to-amber-500 bg-clip-text text-transparent">
              Blog
            </span>
          </h1>
          <p className="text-lg text-warmano-gray-400">
            Tipps, Tricks und Wissenswertes rund um Wärmepumpen.
            Erfahren Sie mehr über Wartung, Effizienz und Pflege.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-warmano-gray-800 flex items-center justify-center">
              <Tag className="w-10 h-10 text-warmano-gray-600" />
            </div>
            <h2 className="text-xl font-semibold text-warmano-white mb-2">
              Noch keine Blogbeiträge
            </h2>
            <p className="text-warmano-gray-400 max-w-md mx-auto">
              Hier erscheinen bald spannende Artikel rund um Wärmepumpen,
              Wartungstipps und Energieeffizienz.
            </p>
          </div>
        )}
      </Container>
    </main>
  )
}
