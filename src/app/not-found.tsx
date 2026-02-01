import Link from 'next/link'
import Container from '@/components/ui/Container'
import Button from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-warmano-black flex items-center justify-center">
      <Container className="text-center">
        <div className="mb-8">
          <span className="text-8xl font-bold text-warmano-orange">404</span>
        </div>
        <h1 className="text-3xl font-bold text-warmano-white mb-4">
          Seite nicht gefunden
        </h1>
        <p className="text-warmano-gray-400 mb-8 max-w-md mx-auto">
          Die angeforderte Seite existiert nicht oder wurde verschoben.
          Kehren Sie zur Startseite zurück.
        </p>
        <Link href="/">
          <Button>Zur Startseite</Button>
        </Link>
      </Container>
    </div>
  )
}
