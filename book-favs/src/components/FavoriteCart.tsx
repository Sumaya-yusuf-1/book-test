import type { Book } from '../types'

type FavoriteCartProps = {
  favorites: Book[]
  visible: boolean
  onRemove: (id: string) => void
}

export default function FavoriteCart({ favorites, visible, onRemove }: FavoriteCartProps) {
  if (!visible) return null

  return (
    <aside
      role="complementary"
      aria-label="Favoritkorg"
      style={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: 300,
        height: '100%',
        background: '#fff',
        borderLeft: '1px solid #e5e7eb',
        padding: '1rem',
        boxShadow: '-4px 0 12px rgba(0,0,0,0.1)',
        overflowY: 'auto'
      }}
    >
      <h2 style={{ marginTop: 0 }}>Favoriter</h2>

      {favorites.length === 0 ? (
        <p>Inga favoriter än.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {favorites.map((f) => (
            <li
              key={f.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.5rem 0',
                borderBottom: '1px solid #f1f5f9'
              }}
            >
              {f.image ? (
                <img
                  src={f.image}
                  alt={f.title}
                  width={40}
                  height={60}
                  style={{ objectFit: 'cover', borderRadius: 4 }}
                />
              ) : (
                <div
                  aria-hidden
                  style={{ width: 40, height: 60, background: '#e5e7eb', borderRadius: 4 }}
                />
              )}
              <span style={{ flex: 1 }}>{f.title}</span>
              <button
                aria-label={`Ta bort ${f.title} från favoriter`}
                onClick={() => onRemove(f.id)}
                style={{
                  border: 0,
                  background: 'transparent',
                  color: '#EF4444',
                  cursor: 'pointer',
                  fontSize: 18
                }}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}