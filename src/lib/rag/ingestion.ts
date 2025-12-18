import "dotenv/config"
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { Pinecone } from "@pinecone-database/pinecone";
import { PineconeStore } from "@langchain/pinecone"
import { JinaEmbeddings } from "@langchain/community/embeddings/jina";

interface FileProps {
  pdfUrl : string,
  pdfName : string,
  pdfId : string,
  userId : string,
  ingestionStatus: "NOT_INGESTED" | "PROCESSING" | "COMPLETED" | "FAILED";
}

function normalizeText(text: string): string {
  return text
    .replace(/\s+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}



export async function ingestion({ pdfUrl, pdfName, pdfId, userId , ingestionStatus}: FileProps) {
    if (ingestionStatus === "COMPLETED") {
    return {
      success: true,
      message: "PDF already ingested",
      redirectToChat: true,
      status : 200
    };
  }

  if (ingestionStatus === "PROCESSING") {
    return {
      success: false,
      message: "PDF is currently being prepared. Please wait.",
      statusCode: 409
    };
  }

    try {

    if (!process.env.PINECONE_API_KEY)
      throw new Error("Missing Pinecone API Key");
    if (!process.env.JINA_EMBEDDING_API_KEY)
      throw new Error("Missing Jina API Key");
    if (!process.env.PINECONE_INDEX_NAME)
      throw new Error("Missing Pinecone Index Name");

    const controller = new AbortController()
    const timeout = setTimeout(()=>controller.abort(),15_000)

    const response = await fetch(pdfUrl , { signal : controller.signal})
    clearTimeout(timeout);

    if (!response.ok) {
      throw new Error(`Failed to fetch PDF: ${response.status}`);
    }

    const blob = await response.blob()

    const loader = new WebPDFLoader(blob , {splitPages : true})
    const docs = await loader.load()
    console.log(`Documents loaded`);

    const numPages = docs.length;
    if (numPages === 0) {
      throw new Error("PDF has no readable text");
    }

    const totalLength = docs.reduce(
      (acc, doc) => acc + doc.pageContent.length,
      0
    );

    const normalizedDoc = docs.map((doc) => ({
    pageContent: normalizeText(doc.pageContent),
    metadata: {
      source : "pdf",
    pdfName: pdfName,
    pdfId : pdfId,
    userId : userId,
    page: doc.metadata?.loc?.pageNumber ?? null,
    },
    }));

    console.log(`Normalization Done`);

    const avgLength = totalLength / numPages;
    console.log(avgLength)
    let chunkSize : number, chunkOverlap : number;

    if (avgLength < 1500) {
      chunkSize = 1200;
      chunkOverlap = 150;
    } else if (avgLength < 3000) {
      chunkSize = 1000;
      chunkOverlap = 200;
    } else {
      chunkSize = 800;
      chunkOverlap = 300;
    }
    console.log(chunkOverlap , chunkSize)

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize : chunkSize,
        chunkOverlap : chunkOverlap
    })
    
    const chunkedDoc = await splitter.splitDocuments(normalizedDoc)
    chunkedDoc.map((doc)=>{
        console.log(doc.pageContent , doc.metadata)
    })

    console.log(`Splitting Done`);

    const pinecone = new Pinecone({
      apiKey : process.env.PINECONE_API_KEY
    })
    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

    const embeddings = new JinaEmbeddings({
      apiKey : process.env.JINA_EMBEDDING_API_KEY,
      model : "jina-embeddings-v3",
      batchSize : 32
    })

    await PineconeStore.fromDocuments(chunkedDoc , embeddings , {
      pineconeIndex : index,
      namespace : userId
    })

    console.log(`Storing ${chunkedDoc.length} chunks in Pinecone...`);
    console.log(`Successfully embeddings get stored`);

    return { success : true , message : "PDF Ingested Successfully" , redirectToChat: true, status : 200}

    } catch (error) {
        console.error("PDF ingestion failed:", error);
        return { success : false , messsage : error instanceof Error ? error.message : "Failed to ingest the pdf" , status : 400}
    }
}
