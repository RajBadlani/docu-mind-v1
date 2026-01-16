import ChatPageComponent from "@/components/chat/ChatPageComponent";
import { getUser } from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { s3GetUrl } from "@/lib/s3";
import { notFound, redirect } from "next/navigation";

const ChatPage = async ({ params }: { params: Promise<{ pdfId: string }> }) => {
  const authUser = await getUser();
  if (!authUser) redirect("/log-in");

  const user = await prisma.user.findUnique({
    where: { id: authUser.id },
  });
  if (!user) redirect("/log-in");

  const pdfId = (await params).pdfId;
  if (!pdfId) notFound();

  const pdf = await prisma.document.findFirst({
    where: { userId: authUser.id, id: pdfId },
  });
  if (!pdf) notFound();

  const signedUrl = await s3GetUrl(pdf.key);
  if (!signedUrl) throw Error("Unable to fetch pdf");

  return (
    <div className="flex h-screen w-full">
      <ChatPageComponent pdf={pdf} pdfUrl={signedUrl} user={user} />
    </div>
  );
};

export default ChatPage;
