type HeaderProps = {
  favCount: number
  onToggleCart: () => void
}

export default function Header({ favCount, onToggleCart }: HeaderProps) {
  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        background: '#3B82F6',
        color: 'white',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12
      }}
    >
      <h1 style={{ margin: 0 }}>📚 Mina Favoritböcker</h1>

      <button
        aria-label="Öppna favoritkorg"
        onClick={onToggleCart}
        style={{
          position: 'relative',
          border: 0,
          background: 'rgba(255,255,255,0.15)',
          color: 'white',
          padding: '0.5rem 0.75rem',
          borderRadius: 8,
          cursor: 'pointer',
          fontWeight: 600
        }}
      >
        ⭐ Favoriter
        {favCount > 0 && (
          <span
            aria-label="Antal favoriter"
            style={{
              position: 'absolute',
              top: -8,
              right: -8,
              background: '#EF4444',
              color: 'white',
              borderRadius: '9999px',
              padding: '0.1rem 0.45rem',
              fontSize: 12,
              fontWeight: 700
            }}
          >
            {favCount}
          </span>
        )}
      </button>
    </header>
  )
}