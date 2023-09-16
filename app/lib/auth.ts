import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import prisma from "./db";

type CustomGoogleProviderConfig = {
    clientId: string;
    clientSecret: string;
    callbacks: {
      session: (session: any, user: any) => Promise<any>;
    };
  };

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            callbacks: {
                session: async (session : any, user: any) => {
                  session.id = user.id;
                  return Promise.resolve(session);
                },
              },
        } as CustomGoogleProviderConfig)
    ]
}