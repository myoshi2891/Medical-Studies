import { describe, expect, it, vi } from "vitest";
import { requestAccessToken } from "./gis";

describe("requestAccessToken", () => {
  it("GIS レスポンスのアクセストークンと有効期間（秒）を返す", async () => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    document.head.appendChild(script);

    const initTokenClient = vi.fn(
      (config: GisTokenClientConfig): GisTokenClient => ({
        requestAccessToken: () => config.callback({ access_token: "token", expires_in: 1800 }),
      })
    );
    window.google = { accounts: { oauth2: { initTokenClient } } };

    const result = await requestAccessToken("client-id");

    expect(result).toEqual(okResult({ accessToken: "token", expiresIn: 1800 }));
  });
});

function okResult<T>(value: T) {
  return { ok: true, value };
}
