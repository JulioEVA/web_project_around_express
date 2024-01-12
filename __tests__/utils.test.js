const { validateURL, validateEmail } = require("../utils/utils");

describe("Test utils functionality", () => {
  test("validateURL function should return true for valid URLs", () => {
    expect(validateURL("https://example.com")).toBe(true);
    expect(validateURL("http://example.com")).toBe(true);
    expect(validateURL("https://www.example.com")).toBe(true);
    expect(validateURL("http://www.example.com")).toBe(true);
    expect(validateURL("https://example.com/")).toBe(true);
    expect(validateURL("http://example.com/")).toBe(true);
    expect(validateURL("https://www.example.com/")).toBe(true);
    expect(validateURL("http://www.example.com/")).toBe(true);
    expect(validateURL("https://example.com/go/even/deeper/")).toBe(true);
    expect(validateURL("http://example.com/go/even/deeper/")).toBe(true);
    expect(validateURL("https://example-example-example.com")).toBe(true);
    expect(validateURL("http://example-example-example.com")).toBe(true);
    expect(
      validateURL(
        "https://uploads-ssl.webflow.com/5d7e8885cad5174a2fcb98d7/5eddd950e5cf1ec1fa5c2d83_virtual-influencer-john-pork.jpg",
      ),
    ).toBe(true);
    expect(
      validateURL(
        "https://lh3.googleusercontent.com/a/ACg8ocLjHwLvoLN88jnPGrYk3mfN6z_tOkvph9iK4F47dW23BX0=s288-c-no",
      ),
    ).toBe(true);
  });

  test("validateURL function should return false for invalid URLs", () => {
    expect(validateURL("example.com")).toBe(false);
    expect(validateURL("www.example.com")).toBe(false);
    expect(validateURL("example.com/")).toBe(false);
    expect(validateURL("www.example.com/")).toBe(false);
    expect(validateURL("example.com/go/even/deeper/")).toBe(false);
    expect(validateURL("example-example-example.com")).toBe(false);
    expect(
      validateURL(
        "uploads-ssl.webflow.com/5d7e8885cad5174a2fcb98d7/5eddd950e5cf1ec1fa5c2d83_virtual-influencer-john-pork.jpg",
      ),
    ).toBe(false);
    expect(
      validateURL(
        "lh3.googleusercontent.com/a/ACg8ocLjHwLvoLN88jnPGrYk3mfN6z_tOkvph9iK4F47dW23BX0=s288-c-no",
      ),
    ).toBe(false);
  });

  test("validateURL function should return false for non-strings", () => {
    expect(validateURL(123)).toBe(false);
    expect(validateURL({})).toBe(false);
    expect(validateURL([])).toBe(false);
    expect(validateURL(true)).toBe(false);
    expect(validateURL(null)).toBe(false);
    expect(validateURL(undefined)).toBe(false);
  });

  test("validateURL function should return false for empty strings", () => {
    expect(validateURL("")).toBe(false);
  });

  test("validateURL function should return false for whitespace strings", () => {
    expect(validateURL(" ")).toBe(false);
    expect(validateURL("  ")).toBe(false);
    expect(validateURL("   ")).toBe(false);
    expect(validateURL("    ")).toBe(false);
  });

  test("validateEmail function should return true for valid emails", () => {
    expect(validateEmail("julio-emmanuel@hotmail.com")).toBe(true);
    expect(validateEmail("fabian.gastelum216634@potros.itson.edu.mx")).toBe(
      true,
    );
  });

  test("validateEmail function should return false for invalid emails", () => {
    expect(validateEmail("julio-emmanuelhotmail.com")).toBe(false);
    expect(validateEmail("julio-emmanuel@hotmailcom")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmailcom")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmailcom")).toBe(false);
    expect(validateEmail("julio-emmanuel@hotmail")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail.")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail.")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail.")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail.")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail.")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail.")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail.")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail.")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail.")).toBe(false);
    expect(validateEmail("julio-emmanuelhotmail")).toBe(false);
    expect(validateEmail("julioemmanuelhotmail.")).toBe(false);
  });
});
