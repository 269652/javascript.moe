"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { IconButton } from "./Button";
import { sign } from "crypto";

export const LoginButton = ({ session }: any) => {
  return session?.user ? (
    <IconButton icon="FaUser" onClick={() => signOut("google")}></IconButton>
  ) : (
    <IconButton icon="FaGoogle" onClick={() => signIn("google")}></IconButton>
  );
};
