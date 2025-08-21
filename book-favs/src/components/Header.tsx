type HeaderProps = {
  favCount: number;
  onToggleCart: () => void;
};

export default function Header({ favCount, onToggleCart }: HeaderProps) {
  return (
    <header>
      <h1>📚 Mina Favoritböcker</h1>

      <button className="favoritknapp" aria-label="Öppna favoritkorg" onClick={onToggleCart}>
        ⭐ Favoriter
        {favCount > 0 && (
          <span aria-label="Antal favoriter">{favCount}</span>
        )}
      </button>
    </header>
  );
}