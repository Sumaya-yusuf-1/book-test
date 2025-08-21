import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

import "@testing-library/jest-dom";
import App from "../App";

// Nollställ localStorage innan varje test
beforeEach(() => {
  localStorage.clear();
});

describe("App integration", () => {
  it("lägger till en bok via formuläret och visar den i boklistan", async () => {
    const user = userEvent.setup();
    render(<App />);


    await user.type(screen.getByLabelText(/titel/i), "Dune");
    await user.type(screen.getByLabelText(/författare/i), "Frank Herbert");
    await user.type(
      screen.getByLabelText(/bild-url/i),
      "https://exempel.com/bhbjh.jpg"
    );

 
    await user.click(screen.getByRole("button", { name: /\+ lägg till/i }));

    // kontrollera att boken syns i listan
    const list = screen.getByRole("list", { name: /boklista/i });
    expect(within(list).getByText(/dune/i)).toBeInTheDocument();
    expect(within(list).getByText(/frank herbert/i)).toBeInTheDocument();
  });

  it("kan lägga till en bok som favorit och se den i favoritkorgen", async () => {
    const user = userEvent.setup();
    render(<App />);

  
    await user.type(screen.getByLabelText(/titel/i), "The Hobbit");
    await user.type(screen.getByLabelText(/författare/i), "J.R.R. Tolkien");
    await user.click(screen.getByRole("button", { name: /\+ lägg till/i }));

    
    await user.click(
      screen.getByRole("button", { name: /favorit the hobbit/i })
    );

    // badge ska visa "1"
    expect(screen.getByLabelText(/antal favoriter/i)).toHaveTextContent("1");

    // öppna favoritkorgen
    await user.click(
      screen.getByRole("button", { name: /öppna favoritkorg/i })
    );

    // kontrollera att boken finns i favoritkorgen
    const cart = screen.getByRole("complementary", { name: /favoritkorg/i });
    expect(within(cart).getByText(/the hobbit/i)).toBeInTheDocument();
  });
});
