import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { getSdk } from "./sdk"; // ✅ ALTERADO

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    const state = getQueryParam(req, "state");

    if (!code || !state) {
      res.status(400).json({ error: "code and state are required" });
      return;
    }

    try {
      const sdk = getSdk();

      let tokenResponse;
      try {
        tokenResponse = await sdk.exchangeCodeForToken(code, state);
      } catch (err) {
        console.error("[OAuth] Step 1 failed — token exchange:", err);
        res.status(502).json({ error: "Token exchange failed" });
        return;
      }

      let userInfo;
      try {
        userInfo = await sdk.getUserInfo(tokenResponse.accessToken);
      } catch (err) {
        console.error("[OAuth] Step 2 failed — getUserInfo:", err);
        res.status(502).json({ error: "Failed to retrieve user info" });
        return;
      }

      if (!userInfo.openId) {
        console.error("[OAuth] Step 2 failed — openId missing from user info");
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      try {
        await db.upsertUser({
          openId: userInfo.openId,
          name: userInfo.name || null,
          email: userInfo.email ?? null,
          loginMethod: userInfo.loginMethod ?? userInfo.platform ?? null,
          lastSignedIn: new Date(),
        });
      } catch (err) {
        console.error("[OAuth] Step 3 failed — upsertUser:", err);
        res.status(500).json({ error: "Failed to save user" });
        return;
      }

      const sessionToken = await sdk.createSessionToken(userInfo.openId, {
        name: userInfo.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, {
        ...cookieOptions,
        maxAge: ONE_YEAR_MS,
      });

      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback unexpected error:", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}