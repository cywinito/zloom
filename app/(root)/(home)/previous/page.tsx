import { getPreviousCalls } from "@/actions/call";
import CallList from "@/components/CallList";

const PreviousPage = async () => {
  const previousCalls = await getPreviousCalls()
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">Previous</h1>
      <CallList type="ended" calls={previousCalls} />
    </section>
  );
};

export default PreviousPage;
