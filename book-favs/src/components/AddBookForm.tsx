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
    <form
      onSubmit={handleSubmit}
      aria-label='Lägg till bok'
      style={{
        background: "#fff",
        padding: "1rem",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        marginBottom: "1rem",
      }}
    >
      <h2 style={{ marginTop: 0 }}>Lägg till bok</h2>

      <div style={{ marginBottom: "0.5rem" }}>
        <label htmlFor='title'>Titel</label>
        <input
          id='title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Sagan om ringen'
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "0.5rem" }}>
        <label htmlFor='author'>Författare</label>
        <input
          id='author'
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder='J.R.R. Tolkien'
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      <div style={{ marginBottom: "0.5rem" }}>
        <label htmlFor='image'>Bild-URL</label>
        <input
          id='image'
          value={image}
          onChange={(e) => setImage(e.target.value)}
          placeholder='https://exempel.com/omslag.jpg'
          style={{ width: "100%", padding: "0.5rem" }}
        />
      </div>

      {error && (
        <p role='alert' style={{ color: "#EF4444", marginTop: 0 }}>
          {error}
        </p>
      )}

      <button
        type='submit'
        style={{
          background: "#3B82F6",
          color: "white",
          border: 0,
          padding: "0.6rem 1rem",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: 600,
        }}
      >
        + Lägg till
      </button>
    </form>
  );
}
