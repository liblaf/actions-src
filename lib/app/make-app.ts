import crypto from "node:crypto";
import { App } from "octokit";

type MakeAppOptions = {
  appId: number;
  privateKey: string;
};

export function makeApp({ appId, privateKey }: MakeAppOptions): App {
  privateKey = crypto
    .createPrivateKey(privateKey)
    .export({ type: "pkcs8", format: "pem" })
    .toString();
  const app = new App({ appId, privateKey });
  return app;
}
