import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="flex min-h-screen flex-1 flex-col px-6 pb-6 py-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </div>
      </div>
    </main>
  );
};

export default HomeLayout;
