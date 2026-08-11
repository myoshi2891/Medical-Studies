/**
 * Google Identity Services（GIS）トークンモデルのラッパー（設計書 第 6.3 章）。
 * accounts.google.com/gsi/client を動的読み込み（多重防止）し、
 * requestAccessToken を Promise<Result<{ accessToken, expiresIn? }>> として提供する。
 * GIS レスポンスでは expires_in が省略される場合がある。
 * トークンはメモリ（呼び出し元 React state）にのみ保持し、localStorage へは書かない。
 */
import { err, ok, type Result } from "@/lib/prom/types";

const GIS_SRC = "https://accounts.google.com/gsi/client";
/** アプリ作成ファイルだけにアクセスできる最小スコープ（データ最小化）。 */
const SCOPE = "https://www.googleapis.com/auth/drive.file";

let scriptPromise: Promise<void> | null = null;

/**
 * Loads the Google Identity Services script once and shares the in-progress load with subsequent callers.
 *
 * @throws Rejects when called outside a browser environment or when the script fails to load.
 */
function loadGisScript(): Promise<void> {
  if (scriptPromise) return scriptPromise;
  scriptPromise = new Promise<void>((resolve, reject) => {
    if (typeof document === "undefined") {
      reject(new Error("ブラウザ環境ではありません"));
      return;
    }
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${GIS_SRC}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = GIS_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("GIS スクリプトの読み込みに失敗しました"));
    document.head.appendChild(script);
  });
  return scriptPromise;
}

/**
 * Obtains a Google Drive access token through Google Identity Services.
 *
 * @param clientId - The Google OAuth client ID.
 * @returns A successful result containing the access token and optional expiration time in seconds, or an error result.
 */
export async function requestAccessToken(
  clientId: string
): Promise<Result<{ accessToken: string; expiresIn?: number }>> {
  if (!clientId) {
    return err("Google Client ID が未設定です（NEXT_PUBLIC_GOOGLE_CLIENT_ID）");
  }
  try {
    await loadGisScript();
  } catch (e) {
    return err(e instanceof Error ? e.message : String(e));
  }
  const google = window.google;
  if (!google) return err("Google Identity Services を初期化できません");

  return new Promise<Result<{ accessToken: string; expiresIn?: number }>>((resolve) => {
    const tokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: SCOPE,
      callback: (response) => {
        if (response.error || !response.access_token) {
          resolve(err(`認証に失敗しました: ${response.error ?? "トークンがありません"}`));
          return;
        }
        resolve(
          ok({
            accessToken: response.access_token,
            ...(response.expires_in === undefined ? {} : { expiresIn: response.expires_in }),
          })
        );
      },
      error_callback: (e) => resolve(err(`認証エラー: ${String(e)}`)),
    });
    tokenClient.requestAccessToken();
  });
}
