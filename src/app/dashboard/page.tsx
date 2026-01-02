import { getUser } from "@/lib/getUser";
import { redirect } from "next/navigation";
import React from "react";

const DashBoard = async () => {
  const user = await getUser();
  if (!user) redirect("/log-in");
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
          {/* <SignOutButton
            name={session.user.name}
            email={session.user.email}
            accountVerified={session.user.emailVerified}
            subscription="Free"
          /> */}
        </div>
      </header>

      <main className="flex flex-col items-center justify-start gap-6 mt-6 mx-auto w-full max-w-4xl">
        {/* <UploadPdfComponent />
        <PdfUploadComponent /> */}
      </main>
    </div>
  );
};

export default DashBoard;
