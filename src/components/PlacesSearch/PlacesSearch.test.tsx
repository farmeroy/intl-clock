import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import PlacesSearch from "./PlacesSearch";
import { NominatimPlace } from "../../App";

describe("PlacesSearch", () => {
  const mockOnSelectPlace = vi.fn();
  const mockPlace: NominatimPlace = {
    place_id: 123,
    lat: 51.5074,
    lon: -0.1278,
    name: "London, Greater London, England, United Kingdom",
    display_name: "London",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the search form correctly", () => {
    render(<PlacesSearch onSelectPlace={mockOnSelectPlace} />);

    expect(screen.getByText("International Clock")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Search for a location...")
    ).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("updates search input value when typing", () => {
    render(<PlacesSearch onSelectPlace={mockOnSelectPlace} />);

    const input = screen.getByPlaceholderText("Search for a location...");
    fireEvent.change(input, { target: { value: "London" } });

    expect(input).toHaveValue("London");
  });

  it("calls API when form is submitted", async () => {
    const mockFetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve([]),
    });
    vi.stubGlobal("fetch", mockFetch);

    render(<PlacesSearch onSelectPlace={mockOnSelectPlace} />);

    const input = screen.getByPlaceholderText("Search for a location...");
    const searchButton = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "London" } });
    act(() => {
      fireEvent.click(searchButton);
    });

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(
          "https://nominatim.openstreetmap.org/search?q=London"
        )
      );
    });
  });

  it("handles API error gracefully", async () => {
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    vi.stubGlobal(
      "fetch",
      vi.fn().mockRejectedValueOnce(new Error("API Error"))
    );

    render(<PlacesSearch onSelectPlace={mockOnSelectPlace} />);

    const input = screen.getByPlaceholderText("Search for a location...");
    const searchButton = screen.getByText("Search");

    fireEvent.change(input, { target: { value: "London" } });
    fireEvent.click(searchButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });
  });

  it("handles timezone fetch and calls onSelectPlace", async () => {
    vi.stubEnv("VITE_TIME_ZONE_URL", "https://tz.test");

    const mockFetch = vi
      .fn()
      // 1st call: places search
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([mockPlace]),
      })
      // 2nd call: timezone lookup
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ timezone: "Europe/London" }),
      });
    vi.stubGlobal("fetch", mockFetch);

    render(<PlacesSearch onSelectPlace={mockOnSelectPlace} />);

    // Trigger search
    fireEvent.change(screen.getByPlaceholderText("Search for a location..."), {
      target: { value: "London" },
    });
    fireEvent.click(screen.getByText("Search"));

    // Wait for places modal to open and select a place
    await waitFor(() => {
      expect(screen.getByText(mockPlace.display_name)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText(mockPlace.display_name));

    await waitFor(() => {
      expect(mockOnSelectPlace).toHaveBeenCalledWith(
        mockPlace,
        "Europe/London"
      );
    });
  });
});
