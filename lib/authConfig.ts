import { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import Employee from "@/models/Employee";
import Group from "@/models/Group";
import { AdapterUser } from "next-auth/adapters";

export interface NSession extends Session {
  id: string | undefined;
  permissions: any;
}
interface User extends AdapterUser {
  permissions: string[];
}
const authConfig: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await Employee.findOne({
          email: credentials.email,
        });
        if (!user) {
          return null;
        }
        const compared = await bcrypt.compare(
          credentials.password,
          user.password ?? "",
        );
        if (!compared) {
          return null;
        }
        const groups = await Group.find({
          _id: {
            $in: user.groupIds,
          },
        });
        return user;
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, user, account, profile }) {
      return token;
    },
    async session({ session, token }) {
      const user = await Employee.findById(token.sub);
      (session as NSession).id = token.sub;
      (session as NSession).permissions = user.permissions
        ? user.permissions
        : [];
      return session;
    },
  },
};
export default authConfig;
