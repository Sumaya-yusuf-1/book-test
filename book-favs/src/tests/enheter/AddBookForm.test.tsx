import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import AddBookForm from "../../components/AddBookForm";

describe("AddBookForm", () => {
  it("validerar titel och författare och visar felmeddelande", async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();
    render(<AddBookForm onAdd={onAdd} />);

    await user.click(screen.getByRole("button", { name: /\+ lägg till/i }));

    expect(onAdd).not.toHaveBeenCalled();
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Titel och författare måste fyllas i."
    );
  });

  it("skickar bokobjekt när formuläret är korrekt ifyllt och nollställer fälten", async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();
    render(<AddBookForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText(/titel/i), "  Dune  ");
    await user.type(screen.getByLabelText(/författare/i), "  Frank Herbert ");
    await user.type(
      screen.getByLabelText(/bild-url/i),
      " https://exempel.com/dune.jpg "
    );
    await user.click(screen.getByRole("button", { name: /\+ lägg till/i }));

    expect(onAdd).toHaveBeenCalledTimes(1);
    const added = onAdd.mock.calls[0][0];
    expect(added).toMatchObject({
      title: "Dune",
      author: "Frank Herbert",
      image: "https://exempel.com/dune.jpg",
    });
    // fälten ska nollställas
    expect(screen.getByLabelText(/titel/i)).toHaveValue("");
    expect(screen.getByLabelText(/författare/i)).toHaveValue("");
    expect(screen.getByLabelText(/bild-url/i)).toHaveValue("");
  });

  it("sätter image till undefined om fältet lämnas tomt", async () => {
    const onAdd = vi.fn();
    const user = userEvent.setup();
    render(<AddBookForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText(/titel/i), "Dune");
    await user.type(screen.getByLabelText(/författare/i), "Frank Herbert");
    await user.click(screen.getByRole("button", { name: /\+ lägg till/i }));

    const added = onAdd.mock.calls[0][0];
    expect(added.image).toBeUndefined();
  });
});
