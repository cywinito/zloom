"use server";

import { currentUser } from "@clerk/nextjs/server";

export const getSelf = async () => {
  const self = await currentUser();

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  return self;
};
