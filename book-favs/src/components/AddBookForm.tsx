import { type FormEvent, useState } from "react";
import type { Book } from "../types";


type AddBookFormProps = {
  onAdd: (book: Book) => void;
};

export default function AddBookForm({ onAdd }: AddBookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      setError("Titel och författare måste fyllas i.");
      return;
    }
    setError(null);
    const newBook: Book = {
      id: String(Date.now()),
      title: title.trim(),
      author: author.trim(),
      image: image.trim() || undefined,
    };
    onAdd(newBook);
    setTitle("");
    setAuthor("");
    setImage("");
  };

  return (
    <form aria-label="Lägg till bok" onSubmit={handleSubmit}>
      <h2>Lägg till bok</h2>

      <label htmlFor="title">Titel</label>
      <input
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Sagan om ringen"
      />

      <label htmlFor="author">Författare</label>
      <input
        id="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="J.R.R. Tolkien"
      />

      <label htmlFor="image">Bild-URL</label>
      <input
        id="image"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        placeholder="https://exempel.com/omslag.jpg"
      />

      {error && (
        <p role="alert" style={{ color: "red" }}>
          {error}
        </p>
      )}

      <button type="submit">+ Lägg till</button>
    </form>
  );
}