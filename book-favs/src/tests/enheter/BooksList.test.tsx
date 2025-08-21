import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import BooksList from "../../components/BooksList";
import type { Book } from "../../types";

const book = (overrides: Partial<Book> = {}): Book => ({
  id: "1",
  title: "The Hobbit",
  author: "J.R.R. Tolkien",
  image: undefined,
  ...overrides,
});

describe("BooksList", () => {
  it("visar tomt-meddelande när det inte finns böcker", () => {
    render(<BooksList books={[]} favorites={[]} onToggleFavorite={vi.fn()} />);
    expect(screen.getByText(/inga böcker tillagda än\./i)).toBeInTheDocument();
  });

  it("renderar boklista med korrekt aria-label", () => {
    render(
      <BooksList books={[book()]} favorites={[]} onToggleFavorite={vi.fn()} />
    );
    const list = screen.getByRole("list", { name: /boklista/i });
    expect(within(list).getByText(/the hobbit/i)).toBeInTheDocument();
    expect(within(list).getByText(/j\.r\.r\. tolkien/i)).toBeInTheDocument();
  });

  it("kallar onToggleFavorite när favoritknappen klickas", async () => {
    const onToggleFavorite = vi.fn();
    const user = userEvent.setup();
    render(
      <BooksList
        books={[book()]}
        favorites={[]}
        onToggleFavorite={onToggleFavorite}
      />
    );
    await user.click(
      screen.getByRole("button", { name: /favorit the hobbit/i })
    );
    expect(onToggleFavorite).toHaveBeenCalledTimes(1);
    expect(onToggleFavorite).toHaveBeenCalledWith(
      expect.objectContaining({ id: "1" })
    );
  });

  it("visar stjärna fylld när boken finns i favorites", () => {
    render(
      <BooksList
        books={[book()]}
        favorites={[book({ id: "1" })]}
        onToggleFavorite={vi.fn()}
      />
    );
    const btn = screen.getByRole("button", { name: /favorit the hobbit/i });
    expect(btn).toHaveTextContent("★");
  });

  it('visar "Ta bort"-knapp när onRemove skickas in och kallar den vid klick', async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();
    render(
      <BooksList
        books={[book()]}
        favorites={[]}
        onToggleFavorite={vi.fn()}
        onRemove={onRemove}
      />
    );
    await user.click(
      screen.getByRole("button", { name: /ta bort the hobbit/i })
    );
    expect(onRemove).toHaveBeenCalledWith("1");
  });
});
