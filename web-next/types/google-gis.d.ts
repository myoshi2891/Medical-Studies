/**
 * Google Identity Services（GIS）トークンモデルの最小型定義（設計書 第 6.3 章）。
 * `window.google.accounts.oauth2` のうち本アプリが用いる範囲のみを宣言する。
 * `any` は使用しない。未知の実体は呼び出し側で型ガードして絞り込む。
 */

/** requestAccessToken のコールバックへ渡るトークンレスポンス。 */
interface GisTokenResponse {
  access_token?: string;
  expires_in?: number;
  scope?: string;
  token_type?: string;
  error?: string;
  error_description?: string;
}

interface GisTokenClientConfig {
  client_id: string;
  scope: string;
  callback: (response: GisTokenResponse) => void;
  error_callback?: (error: unknown) => void;
}

interface GisTokenClient {
  requestAccessToken(overrideConfig?: { prompt?: string }): void;
}

interface GisOAuth2 {
  initTokenClient(config: GisTokenClientConfig): GisTokenClient;
}

interface GisAccounts {
  oauth2: GisOAuth2;
}

interface GisGoogle {
  accounts: GisAccounts;
}

interface Window {
  google?: GisGoogle;
}
