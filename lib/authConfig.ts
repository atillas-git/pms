import { AuthOptions, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import Employee from "@/models/Employee";

export interface NSession extends Session{
  id:string | undefined
}
const authConfig : AuthOptions = {
    secret:process.env.SECRET,
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "email", placeholder: "example@example.com" },
            password: { label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            if(!credentials?.email || !credentials?.password){
                return null;
            }

            const user =await Employee.findOne({
                email:credentials.email
            })
            if(!user){
                return null;
            }
            const compared = await bcrypt.compare(credentials.password,user.password ?? "");
            if(!compared){
                return null;
            }
            return user;
          }

        })
      ],
      pages:{
        signIn:"/signin"
      },
      callbacks:{
        async session({ session, user, token }) {
          (session as NSession).id = token.sub;
          return session
        },
      }
}
export default authConfig;