"use client";

import { signIn, signOut } from "next-auth/react";
import { IconButton } from "./Button";

export const LoginButton = ({ session }: any) => {
  return session?.user ? (
    <IconButton icon="FaUser" onClick={() => signOut()}></IconButton>
  ) : (
    <IconButton icon="FaGoogle" onClick={() => signIn("google")}></IconButton>
  );
};
