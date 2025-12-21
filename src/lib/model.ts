import { JinaEmbeddings } from "@langchain/community/embeddings/jina";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";


interface SearchProps {
    query : string,
    userId : string,
    pdfId : string,
    topK? : number,
    filter? : Record<string,unknown>
}

// interface SearchResult {
//   content: string;
//   metadata: Record<string, unknown>;
//   score: number;
// }

const SCORE_THRESHOLD = 0.35;

export async function similaritySearch({query , userId , pdfId , topK=3 , filter}:SearchProps) {

    if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_INDEX_NAME) {
        throw new Error("Missing Pinecone configuration");
    }

    if (!process.env.JINA_EMBEDDING_API_KEY) {
        throw new Error("Missing Jina embedding API key");
    }

    const pinecone = new Pinecone({
        apiKey: process.env.PINECONE_API_KEY,
    });

    const index = pinecone.Index(process.env.PINECONE_INDEX_NAME)

    const embedding = new JinaEmbeddings({
        apiKey : process.env.JINA_EMBEDDING_API_KEY,
        model: "jina-embeddings-v3",
    })

    const vectorStore = await PineconeStore.fromExistingIndex(embedding , {
        pineconeIndex : index,
        namespace : userId
    })

    const metadataFilter = { pdfId , ...(filter ?? {})}

    const result = await vectorStore.similaritySearchWithScore(query , topK , metadataFilter )

    const filtered = result
    .filter(([, score]) => score <= SCORE_THRESHOLD)
    .map(([doc, score]) => ({
      content: doc.pageContent,
      metadata: doc.metadata.page,
      score,
    }));

    console.log(JSON.stringify(filtered , null , 2))
}

