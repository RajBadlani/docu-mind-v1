import { extractPageNumbers } from "../rag/pageExtracter";
import { docFullSummaryHandler } from "./handler/docFullSummaryHandler";
import { docQuestionHandler } from "./handler/docHandler";
import { docPageSummaryHandler } from "./handler/docSummaryPageHandler";
import { genericStreamHandler } from "./handler/genericStreamHandler";

export async function intentRouter(
  intent: string,
  query: string,
  meta: {
    userId: string;
    pdfId: string;
    onFinish: (text: string) => Promise<void> | void;
  },
) {
  switch (intent) {
    case "DOC_QUES":
    case "DOC_CONTENT_SUMMARY":

      return docQuestionHandler({
        query,
        userId: meta.userId,
        pdfId: meta.pdfId,
        onFinish: meta.onFinish,
      });

    case "DOC_SUMMARY_PAGE":

      const pages = await extractPageNumbers(query);
      return docPageSummaryHandler({
        query,
        userId: meta.userId,
        pdfId: meta.pdfId,
        pages: pages.pages,
        onFinish: meta.onFinish,
      });

    case "DOC_SUMMARY_FULL":

      return await docFullSummaryHandler({
        userId: meta.userId,
        pdfId: meta.pdfId,
        onFinish: meta.onFinish,
      });

    default:

      return genericStreamHandler(intent, query, meta.onFinish);
  }
}
