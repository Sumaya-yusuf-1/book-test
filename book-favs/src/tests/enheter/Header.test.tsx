import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import Header from "../../components/Header";

describe("Header", () => {
  it("renderar rubrik och favoritknapp", () => {
    render(<Header favCount={0} onToggleCart={() => {}} />);
    expect(
      screen.getByRole("heading", { name: /mina favoritböcker/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /öppna favoritkorg/i })
    ).toBeInTheDocument();
  });

  it("visar badge med favCount endast när > 0", () => {
    const { rerender } = render(
      <Header favCount={0} onToggleCart={() => {}} />
    );
    expect(screen.queryByLabelText(/antal favoriter/i)).not.toBeInTheDocument();

    rerender(<Header favCount={3} onToggleCart={() => {}} />);
    expect(screen.getByLabelText(/antal favoriter/i)).toHaveTextContent("3");
  });

  it("kallar onToggleCart vid klick", async () => {
    const onToggleCart = vi.fn();
    const user = userEvent.setup();
    render(<Header favCount={0} onToggleCart={onToggleCart} />);

    await user.click(
      screen.getByRole("button", { name: /öppna favoritkorg/i })
    );
    expect(onToggleCart).toHaveBeenCalledTimes(1);
  });
});
