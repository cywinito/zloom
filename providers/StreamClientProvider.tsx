"use client";

import { ReactNode, useEffect, useState } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";

import { tokenProvider } from "@/actions/stream";
import LoadingSkeleton from "@/app/(root)/(home)/loading";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamClientProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    if (!apiKey) throw new Error("Missing Stream API key");

    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      },
      tokenProvider: tokenProvider,
    });
    setVideoClient(client);
  }, [isLoaded, user]);

  if (!videoClient) return <LoadingSkeleton />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamClientProvider;
