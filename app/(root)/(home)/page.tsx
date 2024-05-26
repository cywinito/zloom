import { getFirstUpcomingCall } from "@/actions/call";
import MeetingTypeList, {
  MeetingTypeListSkeleton,
} from "@/components/MeetingTypeList";
import { Skeleton } from "@/components/ui/skeleton";

const Home = async () => {
  const upcomingCall = await getFirstUpcomingCall();
  const now = new Date();
  const firstUpcomingCall = upcomingCall?.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const time = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          {upcomingCall ? (
            <h2 className="glassmorphism py-2 text-center text-base font-normal max-w-[270px]">
              Upcoming Meeting at: {firstUpcomingCall}
            </h2>
          ) : (
            <div className="py-2" />
          )}
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text:2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;

export const HomeSkeleton = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-[#243040]">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <div className="py-2" />
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-gray-500 h-20 w-80" />
            <Skeleton className="bg-gray-500 h-7 w-40" />
          </div>
        </div>
      </div>
      <MeetingTypeListSkeleton />
    </section>
  );
};
