import { NextApiHandler } from 'next';
import NextAuth from 'next-auth';


import prisma from '../../../lib/prisma';
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter"

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
    adapter: PrismaAdapter(prisma),
    secret: process.env.AUTH0_SECRET,
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        })
      ],
}