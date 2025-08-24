import type { Book } from "../types";

type FavoriteCartProps = {
  favorites: Book[];
  visible: boolean;
  onRemove: (id: string) => void;
  onClose: () => void;
};

export default function FavoriteCart({
  favorites,
  visible,
  onRemove,
  onClose,
}: FavoriteCartProps) {
  if (!visible) return null;

  // Klick på overlay = stäng
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className='cart-overlay'
      role='presentation'
      onClick={handleBackdropClick}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "flex-end",
        zIndex: 100,
      }}
    >
      <aside
        role='complementary'
        aria-label='Favoritkorg'
        className='cart-panel'
        style={{
          width: "320px",
          height: "100%",
          background: "white",
          padding: "1rem",
          boxShadow: "-4px 0 12px rgba(0,0,0,0.2)",
        }}
      >
        <h2>Favoriter</h2>

        {favorites.length === 0 ? (
          <p
            style={{
              color: "white",
            }}
          >
            Inga favoriter än.
          </p>
        ) : (
          <ul>
            {favorites.map((f) => (
              <li key={f.id}>
                {f.image ? (
                  <img src={f.image} alt={f.title} width={40} height={60} />
                ) : (
                  <div aria-hidden />
                )}
                <span>{f.title}</span>
                <button
                  aria-label={`Ta bort ${f.title} från favoriter`}
                  onClick={() => onRemove(f.id)}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </div>
  );
}
