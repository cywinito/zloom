import { MeetingTypeListSkeleton } from "@/components/MeetingTypeList";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingHomePage = () => {
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

export default LoadingHomePage;
