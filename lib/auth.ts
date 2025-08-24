import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db"; // your drizzle instance
import * as schema from "@/db/schema"; // your schema file

export const auth = betterAuth({
  // Configure the database adapter
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),

  // Enable email and password authentication
  emailAndPassword: {
    enabled: true,
  },

  // Enable social authentication providers
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },

  // Configure session settings
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },

  trustedOrigins: ["http://10.88.224.168:3000"],
});
