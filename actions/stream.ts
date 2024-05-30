"use server";

import { client } from "./client";

import { currentUser } from "@clerk/nextjs/server";

export const tokenProvider = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User is not logged in");

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60;

  const issued = Math.floor(Date.now() / 1000) - 60;

  const token = client.createToken(user.id, exp, issued);

  return token;
};
