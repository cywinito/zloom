import { VideoCallStateResponseFields } from "@stream-io/node-sdk";
import { CallRecording } from "@stream-io/video-react-sdk";

declare global {
  type Meeting = VideoCallStateResponseFields & {
    recordings?: CallRecording[];
  };
}
