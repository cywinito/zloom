import { NavbarSkeleton } from "@/components/Navbar";
import { SidebarSkeleton } from "@/components/Sidebar";
import { HomeSkeleton } from "./page";

const LoadingSkeleton = () => {
  return (
    <main className="relative">
      <NavbarSkeleton />
      <div className="flex">
        <SidebarSkeleton />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 py-28 max-md:pb-14 sm:px-14">
          <div className="w-full">
            <HomeSkeleton />
          </div>
        </section>
      </div>
    </main>
  );
};

export default LoadingSkeleton;
