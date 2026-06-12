export const ENV = {
  appId: process.env.VITE_APP_ID ?? "",
  cookieSecret: process.env.JWT_SECRET ?? "",
  databaseUrl: process.env.DATABASE_URL ?? "",
  oAuthServerUrl: process.env.OAUTH_SERVER_URL ?? "",
  ownerOpenId: process.env.OWNER_OPEN_ID ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
};

const REQUIRED_IN_PRODUCTION: (keyof typeof ENV)[] = [
  "cookieSecret",
  "databaseUrl",
  "oAuthServerUrl",
];

if (ENV.isProduction) {
  const missing = REQUIRED_IN_PRODUCTION.filter(k => !ENV[k]);
  if (missing.length) {
    console.error(`[ENV] Missing required production env vars: ${missing.join(", ")}`);
    process.exit(1);
  }
} else {
  const RECOMMENDED: (keyof typeof ENV)[] = ["cookieSecret", "databaseUrl", "oAuthServerUrl"];
  const missing = RECOMMENDED.filter(k => !ENV[k]);
  if (missing.length) {
    console.warn(`[ENV] Warning: missing recommended env vars: ${missing.join(", ")}`);
  }
}
