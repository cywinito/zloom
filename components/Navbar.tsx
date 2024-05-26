import Image from "next/image";
import Link from "next/link";
import MobileNav from "./MobileNav";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Skeleton } from "@/components/ui/skeleton";

const Navbar = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <Link href="/" className="flex items-center gap-1">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="Zloom logo"
          className="max-sm:size-10"
        />
        <p className="text-[26px] font-extrabold text-white max-sm:hidden">
          Zloom
        </p>
      </Link>
      <div className="flex-between gap-5">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <MobileNav />
      </div>
    </nav>
  );
};

export default Navbar;

export const NavbarSkeleton = () => {
  return (
    <nav className="flex-between fixed z-50 w-full bg-dark-1 px-6 py-4 lg:px-10">
      <div className="flex items-center gap-1">
        <Skeleton className="h-[32px] w-[32px] max-sm:size-10 bg-gray-500" />
        <Skeleton className="w-20 h-10 max-sm:hidden bg-gray-500" />
      </div>
      <div className="flex-between gap-5">
        <Skeleton className="w-7 h-7 bg-gray-50 rounded-full" />
      </div>
    </nav>
  );
};
