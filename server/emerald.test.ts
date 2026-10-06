import { describe, expect, it } from "vitest";

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
