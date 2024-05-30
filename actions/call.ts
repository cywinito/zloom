"use server";

import { revalidatePath } from "next/cache";
import { CallRecording } from "@stream-io/video-react-sdk";

import { client } from "./client";
import { getSelf } from "./user";

export const getFirstUpcomingCall = async () => {
  const user = await getSelf();
  if (!user) throw new Error("User is not logged in");

  const { calls } = await client.video.queryCalls({
    sort: [{ field: "starts_at", direction: 1 }],
    limit: 1,
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

export const getUpcomingCalls = async () => {
  const user = await getSelf();
  if (!user) throw new Error("User is not logged in");

  const { calls } = await client.video.queryCalls({
    sort: [{ field: "starts_at", direction: 1 }],
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

  return calls as Meeting[];
};

export const getPreviousCalls = async () => {
  const user = await getSelf();
  if (!user) throw new Error("User is not logged in");

  const { calls } = await client.video.queryCalls({
    sort: [{ field: "starts_at", direction: -1 }],
    filter_conditions: {
      $and: [
        {
          $or: [
            {
              created_by_user_id: user.id,
            },
            {
              members: { $in: [user.id] },
            },
          ],
        },
        {
          $or: [
            {
              ended_at: { $exists: true },
            },
            {
              starts_at: { $lt: new Date().toISOString() },
            },
          ],
        },
      ],
    },
  });

  return calls as Meeting[];
};

export const getRecordings = async () => {
  const user = await getSelf();
  if (!user) throw new Error("User is not logged in");

  const token = client.getConfiguration().apiKey?.("Authorization");

  const previousCalls = await getPreviousCalls();

  const meetings = await Promise.all(
    previousCalls.map((call) => {
      return fetch(
        `https://video.stream-io-api.com/api/v2/video/call/${call.call.type}/${call.call.id}/recordings?api_key=${process.env.NEXT_PUBLIC_STREAM_API_KEY}`,
        {
          headers: {
            Authorization: token!,
            "stream-auth-type": "jwt",
          },
        }
      )
        .then((res) => res.json())
        .then((data) => ({
          ...call,
          recordings: data.recordings as CallRecording[],
        }));
    })
  );

  return meetings.filter((call) => call.recordings.length > 0) as Meeting[];
};

export const createCall = async (values: {
  dateTime: Date;
  description?: string;
}) => {
  const user = await getSelf();
  if (!client || !user) throw new Error("Authentication Failed");
  try {
    const id = crypto.randomUUID();
    const call = client.video.call("default", id);

    if (!call) throw new Error("Failed to create call");

    const startsAt = values.dateTime.toISOString() || new Date().toISOString();
    const description = values.description || "Instant meeting";

    await call.getOrCreate({
      data: {
        created_by_id: user.id,
        starts_at: startsAt,
        custom: {
          description,
        },
      },
    });
    revalidatePath("/");
    return id;
  } catch (error) {
    console.log(error);
    return null;
  }
};
