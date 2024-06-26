"use client";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { avatarImages } from "@/constants";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting,
  buttonIcon1,
  link,
  buttonText,
}: MeetingCardProps) => {
  const { toast } = useToast();

  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt="upcoming" width={28} height={28} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className="flex justify-center relative">
        <div className="relative flex w-full max-sm:hidden">
          {avatarImages.map((img, index) => (
            <Image
              key={index}
              src={img}
              alt="attendees"
              width={40}
              height={40}
              className={cn("rounded-full", { absolute: index > 0 })}
              style={{ top: 0, left: index * 28 }}
            />
          ))}
          <div className="flex-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>
        {!isPreviousMeeting && (
          <div className="flex gap-2">
            <Link
              href={link}
              className="flex gap-2 items-center justify-center rounded bg-blue-1 px-6"
            >
              {buttonIcon1 && (
                <Image src={buttonIcon1} alt="feature" width={20} height={20} />
              )}
              {buttonText}
            </Link>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(link);
                toast({
                  title: "Link Copied",
                });
              }}
              className="bg-dark-4 px-6"
            >
              <Image
                src="/icons/copy.svg"
                alt="feature"
                width={20}
                height={20}
              />
              &nbsp; Copy Link
            </Button>
          </div>
        )}
      </article>
    </section>
  );
};

export default MeetingCard;

export const MeetingCardSkeleton = () => {
  return (
    <section className="flex min-h-[258px] w-full flex-col justify-between rounded-[14px] bg-dark-1 px-5 py-8 xl:max-w-[568px]">
      <article className="flex flex-col gap-5">
        <Skeleton className="w-7 h-7 bg-gray-500" />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <Skeleton className="w-32 h-7 bg-gray-500" />
            <Skeleton className="w-40 h-7 bg-gray-500" />
          </div>
        </div>
      </article>
      <article className="flex justify-center relative">
        <div className="relative flex w-full max-sm:hidden">
          {[...Array(5)].map((_, i) => (
            <Skeleton
              key={i}
              className={cn("rounded-full w-10 h-10 bg-gray-500", {
                absolute: i > 0,
              })}
              style={{ top: 0, left: i * 28 }}
            />
          ))}
        </div>
      </article>
    </section>
  );
};
