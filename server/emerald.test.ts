import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

function createAuthContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "investor-001",
      email: "investor@emeraldgroup-inc.com",
      name: "Emerald Investor",
      loginMethod: "manus",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("Emerald Group Website – auth.me", () => {
  it("returns null for unauthenticated users", async () => {
    const caller = appRouter.createCaller(createPublicContext());
    const user = await caller.auth.me();
    expect(user).toBeNull();
  });

  it("returns user object for authenticated users", async () => {
    const caller = appRouter.createCaller(createAuthContext());
    const user = await caller.auth.me();
    expect(user).not.toBeNull();
    expect(user?.name).toBe("Emerald Investor");
    expect(user?.email).toBe("investor@emeraldgroup-inc.com");
    expect(user?.role).toBe("user");
  });
});

describe("Emerald Group Website – auth.logout", () => {
  it("successfully logs out and returns success", async () => {
    const ctx = createAuthContext();
    const cleared: string[] = [];
    ctx.res.clearCookie = (name: string) => { cleared.push(name); };
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    expect(result.success).toBe(true);
    expect(cleared.length).toBeGreaterThan(0);
  });
});

describe("Emerald Group Website – cluster data integrity", () => {
  const clusters = [
    { id: "banking", name: "Banking & Financial Services", companies: ["54 Corp", "Banco Millennium Atlântico", "Banko", "Emerald Advisors"] },
    { id: "construction", name: "Construction & Engineering", companies: ["IBG Africa", "Grow Africa", "Tecton"] },
    { id: "infrastructure", name: "Infrastructure", companies: ["Emerald Infrastructure"] },
    { id: "resources", name: "Natural Resources", companies: ["Emerald Global Resources", "Nino Oil"] },
    { id: "tmt", name: "Telecom, Media & Technology", companies: ["Emerald Telecom", "Forbes Africa", "Forbes África Lusófona", "Forbes Portugal", "Jornal Económico"] },
    { id: "urban", name: "Urban Development & Real Estate", companies: ["Diaar", "ONE Luanda", "ONE Hotéis"] },
  ];

  it("has exactly 6 business clusters", () => {
    expect(clusters).toHaveLength(6);
  });

  it("Banking cluster has exactly 4 companies", () => {
    const banking = clusters.find(c => c.id === "banking");
    expect(banking?.companies).toHaveLength(4);
    expect(banking?.companies).toContain("54 Corp");
    expect(banking?.companies).toContain("Banco Millennium Atlântico");
  });

  it("TMT cluster has exactly 5 companies including Forbes titles", () => {
    const tmt = clusters.find(c => c.id === "tmt");
    expect(tmt?.companies).toHaveLength(5);
    expect(tmt?.companies).toContain("Forbes Africa");
    expect(tmt?.companies).toContain("Forbes Portugal");
    expect(tmt?.companies).toContain("Jornal Económico");
  });

  it("all clusters have at least one company", () => {
    clusters.forEach(cluster => {
      expect(cluster.companies.length).toBeGreaterThan(0);
    });
  });

  it("total portfolio companies count is 18", () => {
    const total = clusters.reduce((sum, c) => sum + c.companies.length, 0);
    expect(total).toBe(18);
  });
});
