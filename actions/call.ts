"use server";

import { currentUser } from "@clerk/nextjs/server";

import { getClient } from "./client";

export const getFirstUpcomingCall = async () => {
  const user = await currentUser();
  if (!user) throw new Error("User is not logged in");

  const client = getClient();

  const { calls } = await client.video.queryCalls({
    sort: [{ field: "starts_at", direction: -1 }],
    filter_conditions: {
      starts_at: {
        $gt: new Date().toISOString(),
      },
      $or: [
        {
          created_by_user_id: user.id,
        },
        {
          members: { $in: [user.id] },
        },
      ],
    },
  });
  const upcomingCallStr = calls[0]?.call?.starts_at;
  return upcomingCallStr ? new Date(upcomingCallStr) : null;
};
