import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

import express, { type NextFunction, type Request, type Response } from "express";
import { createServer } from "http";
import { ENV } from "./_core/env";
import { serveStatic, setupVite } from "./_core/vite";
import { contactSchema } from "./contact";
import { sendContactEmail } from "./mailer";

async function startServer() {
  const isDev = !ENV.isProduction;
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "1mb" }));

  app.post("/api/contact", async (req: Request, res: Response) => {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ error: parsed.error.issues[0]?.message ?? "Invalid input" });
      return;
    }

    try {
      await sendContactEmail(parsed.data);
      res.json({ success: true });
    } catch (error) {
      console.error("[Contact] Failed to send email:", error);
      res.status(502).json({ error: "Failed to send message. Please try again later." });
    }
  });

  if (isDev) {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // Global error handler — must be last
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error("[Server] Unhandled error:", err);
    res.status(500).json({ error: "Internal server error" });
  });

  server.listen(ENV.port, () => {
    console.log(`Server running on http://localhost:${ENV.port}/ [${isDev ? "development" : "production"}]`);
  });
}

startServer().catch(console.error);
