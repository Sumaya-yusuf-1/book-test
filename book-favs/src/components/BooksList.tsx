import type { Book } from "../types";

type BooksListProps = {
  books: Book[];
  favorites: Book[];
  onToggleFavorite: (book: Book) => void;
  onRemove?: (id: string) => void;
};

export default function BooksList({
  books,
  favorites,
  onToggleFavorite,
  onRemove,
}: BooksListProps) {
  if (books.length === 0) return <p>Inga böcker tillagda än.</p>;

  return (
    <ul role="list" aria-label="Boklista">
      {books.map((b) => {
        const isFav = favorites.some((f) => f.id === b.id);
        return (
          <li key={b.id}>
            {b.image ? <img src={b.image} alt={b.title} width={60} /> : <div aria-hidden style={{ width: 60, height: 90, background: "#ddd" }} />}

            <div>
              <div>{b.title}</div>
              <div>{b.author}</div>
            </div>

            <button
              aria-label={`Favorit ${b.title}`}
              onClick={() => onToggleFavorite(b)}
            >
              {isFav ? "★" : "☆"}
            </button>

            {onRemove && (
              <button
                aria-label={`Ta bort ${b.title}`}
                onClick={() => onRemove(b.id)}
              >
                Ta bort
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}