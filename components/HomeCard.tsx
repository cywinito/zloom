"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

interface HomeCardProps {
  img: string;
  imgAlt: string;
  title: string;
  description: string;
  className: string;
  handleClick: () => void;
}

const HomeCard = ({
  img,
  imgAlt,
  title,
  description,
  handleClick,
  className,
}: HomeCardProps) => {
  return (
    <div
      className={cn(
        "px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer",
        className
      )}
      onClick={handleClick}
    >
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Image src={img} alt={imgAlt} width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-lg font-normal">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;

export const HomeCardSkeleton = () => {
  return (
    <div className="px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer bg-[#243040]">
      <div className="flex-center glassmorphism size-12 rounded-[10px]">
        <Skeleton className="h-7 w-7" />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-8 w-40 bg-gray-500" />
        <Skeleton className="h-7 w-52 bg-gray-500" />
      </div>
    </div>
  );
};
