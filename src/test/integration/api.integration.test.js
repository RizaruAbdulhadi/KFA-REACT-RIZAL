import api from "../../services/api";
import { describe, it, expect } from "vitest";

describe("API Integration Test", () => {
  beforeAll(() => {
    localStorage.setItem(
      "token",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5Aa2ZhLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NDIxMjUxNCwiZXhwIjoxNzY0ODE3MzE0fQ.t5exo2KJTomn94-fH8wW-HR8y94Kl4ncEtjJmMRu23k"
    );
  });

  it("should fetch users succesfully", async () => {
    const response = await api.get("/health");
    expect(response.status).toBe(200);
  });
});
