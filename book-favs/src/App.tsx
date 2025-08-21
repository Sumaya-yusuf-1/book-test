import { useEffect, useState } from "react";
import AddBookForm from "./components/AddBookForm";
import Header from "./components/Header";
import type { Book } from "./types";

import BooksList from "./components/BooksList";
import FavoriteCart from "./components/FavoriteCart";

function App() {
  const [books, setBooks] = useState<Book[]>(() => {
    const stored = localStorage.getItem("books")
    return stored ? JSON.parse(stored) : []
  })

  const [favorites, setFavorites] = useState<Book[]>(() => {
    const stored = localStorage.getItem("favorites")
    return stored ? JSON.parse(stored) : []
  })

  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books))
  }, [books])

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const handleAdd = (book: Book) => setBooks((prev) => [book, ...prev]);
  const handleRemove = (id: string) =>
    setBooks((prev) => prev.filter((b) => b.id !== id));

  const toggleFavorite = (book: Book) => {
    setFavorites((prev) =>
      prev.find((b) => b.id === book.id)
        ? prev.filter((b) => b.id !== book.id)
        : [...prev, book]
    );
  };

  const removeFavorite = (id: string) =>
    setFavorites((prev) => prev.filter((b) => b.id !== id));

  return (
    <>
      <Header
        favCount={favorites.length}
        onToggleCart={() => setShowCart((s) => !s)}
      />

      <main
        style={{
          maxWidth: 920,
          margin: "1.5rem auto",
          padding: "0 1rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <AddBookForm onAdd={handleAdd} />

        <section>
          <h2>Böcker</h2>
          <BooksList
            books={books}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
            onRemove={handleRemove}
          />
        </section>
      </main>

      <FavoriteCart
        favorites={favorites}
        visible={showCart}
        onRemove={removeFavorite}
      />
    </>
  );
}

export default App;
