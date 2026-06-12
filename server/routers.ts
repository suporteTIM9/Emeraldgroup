import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";

// ── Contact form schema ────────────────────────────────────────────────────────
export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  subject: z.string().max(100).optional(),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  contact: router({
    submit: publicProcedure
      .input(contactSchema)
      .mutation(async ({ input }) => {
        // ── TODO: configure delivery method ───────────────────────────────────
        // Option A — Email (e.g. nodemailer / SendGrid / Resend):
        //   await sendEmail({ to: "info@emeraldgroup-inc.com", ...input });
        //
        // Option B — Save to database:
        //   await db.insertContactSubmission(input);
        //
        // Option C — Webhook / Slack notification:
        //   await fetch(process.env.CONTACT_WEBHOOK_URL!, { method: "POST", body: JSON.stringify(input) });
        // ─────────────────────────────────────────────────────────────────────
        console.log("[Contact] New submission:", {
          name: input.name,
          email: input.email,
          subject: input.subject,
        });

        return { success: true } as const;
      }),
  }),
});

export type AppRouter = typeof appRouter;
