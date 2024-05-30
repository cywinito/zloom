import { Skeleton } from "@/components/ui/skeleton";
import { MeetingCardSkeleton } from "@/components/MeetingCard";

const Loading = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <Skeleton className="w-40 h-9 bg-gray-500" />
      {[...Array(3)].map((_, index) => (
        <MeetingCardSkeleton key={index} />
      ))}
    </section>
  );
};

export default Loading;
