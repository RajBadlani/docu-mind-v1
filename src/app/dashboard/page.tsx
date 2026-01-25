import SignOutButton from "@/components/auth/SignOutButton";
import UploadedFileList from "@/components/upload/UploadedFileList";
import UploadSection from "@/components/upload/UploadSection";
import { getUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | DocuMind",
  description: "Manage your documents and start chatting.",
};

const DashBoard = async () => {
  const authUser = await getUser();
  if (!authUser) redirect("/log-in");
  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
  });
  if (!user) redirect("/log-in");
  const uploadedPdfs = await prisma.document.findMany({
    where: { userId: authUser.id },
  });

  return (
    <div className="min-h-screen w-full bg-pattern px-4 sm:px-6 lg:px-12 py-6">
      <header className="flex items-center justify-between gap-4 px-2 sm:px-4 py-2">
        <div>
          <h1 className="font-bold text-lg sm:text-2xl lg:text-3xl">
            Upload PDF Document
          </h1>
          <p className="mt-1 text-sm sm:text-base text-gray-800 max-w-3xl">
            Upload your PDF documents and start a smart conversation — powered
            by AI.
          </p>
        </div>
        <div className="mr-20 cursor-pointer">
          <SignOutButton user={user} />
        </div>
      </header>

      <section className="relative w-full overflow-hidden rounded-xl  p-2 sm:p-3 ">
        <UploadSection />
        <UploadedFileList uploadedPdfs={uploadedPdfs} />
      </section>
    </div>
  );
};

export default DashBoard;
