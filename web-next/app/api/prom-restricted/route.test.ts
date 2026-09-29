import { readFile } from "node:fs/promises";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { GET } from "./route";

vi.mock("node:fs/promises", async (importOriginal) => {
  const actual = await importOriginal<typeof import("node:fs/promises")>();
  const readFile = vi.fn();
  return { ...actual, default: { ...actual, readFile }, readFile };
});

const mockedReadFile = vi.mocked(readFile);

/** fs が投げる errno 付きエラーを再現する。 */
function fsError(code: string): NodeJS.ErrnoException {
  return Object.assign(new Error(code), { code });
}

describe("GET /api/prom-restricted", () => {
  beforeEach(() => {
    vi.spyOn(console, "error").mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
    mockedReadFile.mockReset();
  });

  it("オーバーレイがあれば JSON を 200 で返す", async () => {
    // Arrange
    mockedReadFile.mockResolvedValue('{"scales":{}}');
    // Act
    const res = await GET();
    // Assert
    expect(res.status).toBe(200);
    expect(await res.json()).toEqual({ scales: {} });
  });

  it("ファイル未配置（ENOENT）は既定の正常系として 404 を返し、ログを出さない", async () => {
    mockedReadFile.mockRejectedValue(fsError("ENOENT"));
    const res = await GET();
    expect(res.status).toBe(404);
    expect(console.error).not.toHaveBeenCalled();
  });

  it("ENOENT 以外の読み込みエラーはログに残して 500 を返す", async () => {
    mockedReadFile.mockRejectedValue(fsError("EACCES"));
    const res = await GET();
    expect(res.status).toBe(500);
    expect(console.error).toHaveBeenCalledOnce();
  });

  it("JSON の構文エラーはログに残して 500 を返す", async () => {
    mockedReadFile.mockResolvedValue("{ broken");
    const res = await GET();
    expect(res.status).toBe(500);
    expect(console.error).toHaveBeenCalledOnce();
  });
});
