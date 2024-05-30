import { getUpcomingCalls } from "@/actions/call";
import CallList from "@/components/CallList";

const UpcomingPage = async () => {
  const upcomingCalls = await getUpcomingCalls();

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Upcoming</h1>
      <CallList type="upcoming" calls={upcomingCalls} />
    </section>
  );
};

export default UpcomingPage;
