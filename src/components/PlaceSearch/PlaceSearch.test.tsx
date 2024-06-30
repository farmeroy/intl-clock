import {describe, expect, it} from "vitest";
import PlaceSearch from "./PlaceSearch";
import {render, screen} from '@testing-library/react'

describe("PlaceSearch", () => {
  it("should render search field", () => {
    render(<PlaceSearch />);
    expect(screen.getByLabelText("Find a place")).toBeDefined();
  });
});
