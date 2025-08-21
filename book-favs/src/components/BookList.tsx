import type { Book } from '../types'

type BooksListProps = {
  books: Book[]
  favorites: Book[]
  onToggleFavorite: (book: Book) => void
  onRemove?: (id: string) => void
}

export default function BooksList({ books, favorites, onToggleFavorite, onRemove }: BooksListProps) {
  if (books.length === 0) return <p>Inga böcker tillagda än.</p>

  return (
    <ul aria-label="Boklista" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {books.map((b) => {
        const isFav = favorites.some((f) => f.id === b.id)
        return (
          <li
            key={b.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              background: '#fff',
              borderRadius: 12,
              padding: '0.75rem',
              marginBottom: '0.75rem',
              boxShadow: '0 1px 6px rgba(0,0,0,0.06)'
            }}
          >
            {b.image ? (
              <img
                src={b.image}
                alt={b.title}
                width={60}
                height={90}
                style={{ objectFit: 'cover', borderRadius: 6 }}
              />
            ) : (
              <div
                aria-hidden
                style={{
                  width: 60,
                  height: 90,
                  borderRadius: 6,
                  background: '#e5e7eb'
                }}
              />
            )}

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700 }}>{b.title}</div>
              <div style={{ color: '#6b7280' }}>{b.author}</div>
            </div>

            <button
              aria-label={`Favorit ${b.title}`}
              onClick={() => onToggleFavorite(b)}
              style={{
                border: 0,
                background: 'transparent',
                fontSize: 22,
                cursor: 'pointer'
              }}
              title={isFav ? 'Ta bort från favoriter' : 'Lägg till favorit'}
            >
              {isFav ? '★' : '☆'}
            </button>

            {onRemove && (
              <button
                aria-label={`Ta bort ${b.title}`}
                onClick={() => onRemove(b.id)}
                style={{ marginLeft: 8, border: 0, background: '#EF4444', color: 'white', borderRadius: 8, padding: '0.35rem 0.6rem', cursor: 'pointer' }}
              >
                Ta bort
              </button>
            )}
          </li>
        )
      })}
    </ul>
  )
}