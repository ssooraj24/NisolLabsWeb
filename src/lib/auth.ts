import { betterAuth } from "better-auth";
import { getPool } from "./db";

export const auth = betterAuth({
  database: getPool(),
  secret: process.env.BETTER_AUTH_SECRET || "nisol_enterprise_secret_key_8f1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d",
  baseURL: process.env.BETTER_AUTH_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: false,
        defaultValue: "client",
      },
      tenantId: {
        type: "string",
        required: false,
      },
    },
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
});
