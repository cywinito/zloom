import { getRecordings } from "@/actions/call";
import CallList from "@/components/CallList";

const RecordingsPage = async () => {
  const recordings = await getRecordings();

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Recordings</h1>
      <CallList type="recordings" calls={recordings} />
    </section>
  );
};

export default RecordingsPage;
