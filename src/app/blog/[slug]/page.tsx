import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Calendar, User, Tag, Share2, Clock } from 'lucide-react'
import Container from '@/components/ui/Container'
import { getBlogPost, getBlogPosts } from '@/lib/odoo'

export const revalidate = 300 // Revalidate every 5 minutes

interface PageProps {
  params: { slug: string }
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim()
}

function estimateReadTime(content: string): number {
  const text = stripHtml(content)
  const wordsPerMinute = 200
  const wordCount = text.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const result = await getBlogPost(params.slug)

  if (!result.success || !result.post) {
    return {
      title: 'Beitrag nicht gefunden | WARMANO Blog',
    }
  }

  const post = result.post
  const description = post.website_meta_description || stripHtml(post.content).substring(0, 160)

  return {
    title: `${post.website_meta_title || post.name} | WARMANO Blog`,
    description,
    openGraph: {
      title: post.website_meta_title || post.name,
      description,
      type: 'article',
      publishedTime: post.published_date || post.create_date,
      modifiedTime: post.write_date,
    },
  }
}

export async function generateStaticParams() {
  const result = await getBlogPosts(100, 0)

  if (!result.success || !result.posts) {
    return []
  }

  return result.posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const result = await getBlogPost(params.slug)

  if (!result.success || !result.post) {
    notFound()
  }

  const post = result.post
  const date = post.published_date || post.create_date
  const readTime = estimateReadTime(post.content)

  return (
    <main className="min-h-screen bg-warmano-black pt-24 pb-16">
      <Container>
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-warmano-gray-400 hover:text-warmano-orange transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zum Blog
        </Link>

        <article className="max-w-3xl mx-auto">
          {/* Header */}
          <header className="mb-8">
            {/* Tags */}
            {post.tag_ids && post.tag_ids.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tag_ids.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 text-sm font-medium bg-warmano-orange/10 text-warmano-orange rounded-full"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-warmano-white mb-4 leading-tight">
              {post.name}
            </h1>

            {/* Subtitle */}
            {post.subtitle && (
              <p className="text-xl text-warmano-gray-400 mb-6">
                {post.subtitle}
              </p>
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-warmano-gray-500 pb-6 border-b border-warmano-gray-800">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(date)}
              </span>
              {post.author_name && (
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4" />
                  {post.author_name}
                </span>
              )}
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readTime} Min. Lesezeit
              </span>
            </div>
          </header>

          {/* Content */}
          <div
            className="prose prose-invert prose-orange max-w-none
              prose-headings:text-warmano-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-warmano-gray-300 prose-p:leading-relaxed
              prose-a:text-warmano-orange prose-a:no-underline hover:prose-a:underline
              prose-strong:text-warmano-white
              prose-ul:text-warmano-gray-300 prose-ol:text-warmano-gray-300
              prose-li:marker:text-warmano-orange
              prose-blockquote:border-warmano-orange prose-blockquote:bg-warmano-gray-800/50 prose-blockquote:rounded-r-lg prose-blockquote:py-2 prose-blockquote:not-italic
              prose-code:text-warmano-orange prose-code:bg-warmano-gray-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-img:rounded-xl"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-warmano-gray-800">
            {/* Share */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-warmano-gray-400">
                <Share2 className="w-5 h-5" />
                <span className="text-sm">Artikel teilen</span>
              </div>

              <div className="flex gap-2">
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://warmano.de/blog/${post.slug}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-warmano-gray-800 flex items-center justify-center text-warmano-gray-400 hover:text-warmano-orange hover:bg-warmano-gray-700 transition-colors"
                  aria-label="Auf LinkedIn teilen"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://warmano.de/blog/${post.slug}`)}&text=${encodeURIComponent(post.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-warmano-gray-800 flex items-center justify-center text-warmano-gray-400 hover:text-warmano-orange hover:bg-warmano-gray-700 transition-colors"
                  aria-label="Auf X teilen"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(post.name)}&body=${encodeURIComponent(`https://warmano.de/blog/${post.slug}`)}`}
                  className="w-10 h-10 rounded-lg bg-warmano-gray-800 flex items-center justify-center text-warmano-gray-400 hover:text-warmano-orange hover:bg-warmano-gray-700 transition-colors"
                  aria-label="Per E-Mail teilen"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 p-6 bg-gradient-to-br from-warmano-orange/20 to-amber-500/10 border border-warmano-orange/30 rounded-2xl">
              <h3 className="text-xl font-bold text-warmano-white mb-2">
                Wärmepumpen-Wartung gesucht?
              </h3>
              <p className="text-warmano-gray-400 mb-4">
                Professionelle Wartung zum Festpreis. Online buchen, Termin wählen, fertig.
              </p>
              <Link
                href="/#booking"
                className="inline-flex items-center gap-2 px-6 py-3 bg-warmano-orange text-white font-semibold rounded-xl hover:bg-warmano-orange-light transition-colors"
              >
                Jetzt Wartung buchen
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </Link>
            </div>
          </footer>
        </article>
      </Container>
    </main>
  )
}
