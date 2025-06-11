// frontend/pages/api/auth/[...nextauth].js
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }: any) {
      if (token) {
        session.jwt = token.jwt;
        session.id = token.id;
      }
      return session;
    },
    async jwt({ token, user, account }: any) {
      if (account && user) {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_STRAPI_BASE}/api/auth/${account.provider}/callback?access_token=${account.access_token}`
          );
          const data = await response.json();
          console.log("DATA", data);

          token.jwt = data.jwt;
          token.id = data.user.id;
        } catch (error) {
          console.error("Error in JWT callback:", error);
        }
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
