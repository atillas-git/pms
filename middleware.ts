import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {},
  {
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: "/signin",
    },
  },
);

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/portal/:path*", "/api/:path*"],
};
