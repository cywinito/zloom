import { type CallRecording } from "@stream-io/video-react-sdk";

import MeetingCard from "./MeetingCard";

const CallList = ({
  type,
  calls,
}: {
  type: "ended" | "upcoming" | "recordings";
  calls: Meeting[];
}) => {
  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "upcoming":
        return "No Upcoming Calls";
      case "recordings":
        return "No Recordings";
      default:
        return "";
    }
  };

  const noCallsMessage = getNoCallsMessage();
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting) => {
          if (type === "recordings") {
            return meeting.recordings?.map((recording) => (
              <Card
                meeting={{ ...meeting, ...recording }}
                type={type}
                key={recording.filename}
              />
            ));
          } else {
            return (
              <Card
                meeting={meeting as any}
                type={type}
                key={meeting.call.id}
              />
            );
          }
        })
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;

const Card = ({
  meeting,
  type,
}: {
  meeting: Meeting & CallRecording;
  type: string;
}) => {
  return (
    <MeetingCard
      icon={
        type === "ended"
          ? "/icons/previous.svg"
          : type === "upcoming"
          ? "/icons/upcoming.svg"
          : "/icons/recordings.svg"
      }
      title={
        (meeting.call.custom as any)?.description?.substring(0, 26) ||
        meeting.filename?.substring(0, 20) ||
        "Personal Meeting"
      }
      date={
        meeting.call.starts_at?.toLocaleString() ||
        meeting.start_time?.toLocaleString()
      }
      isPreviousMeeting={type === "ended"}
      buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
      buttonText={type === "recordings" ? "Play" : "Start"}
      link={
        type === "recordings"
          ? meeting.url
          : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.call.id}`
      }
    />
  );
};
