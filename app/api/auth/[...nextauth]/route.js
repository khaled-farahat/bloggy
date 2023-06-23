import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import user from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      const sessionUser = await user.findOne({
        email: session.user.email,
      });

      // if(sessionUser){
      session.user.id = sessionUser._id.toString();
      return session;
      // }
    },

    async signIn({ profile }) {
      try {
        // serverless -> lambda -> open only when it get called
        await connectToDB();

        // check if a user already exists
        const userExists = await user.findOne({
          email: profile.email,
        });

        // if not, create a new user
        if (!userExists) {
          await user.create({
            email: profile.email,
            username: profile.name.replace(" ", ""),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
