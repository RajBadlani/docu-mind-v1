import { JinaEmbeddings } from "@langchain/community/embeddings/jina";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone } from "@pinecone-database/pinecone";

interface SimilaritySearchProps {
  query: string;
  userId: string;
  pdfId: string;
  topK?: number;
  filter?: Record<string, unknown>;
}

interface SimilaritySearchResult {
  content: string;
  metadata: Record<string, unknown>;
  score: number;
}

interface PageChunkProps {
  userId: string;
  pdfId: string;
  pages: number[];
}

interface PageChunkResult {
  content: string;
  metadata: Record<string, unknown>;
}

interface FullPDFChunkProps {
  userId: string;
  pdfId: string;
}

const SCORE_THRESHOLD = 0.15;

export async function similaritySearch({
  query,
  userId,
  pdfId,
  topK = 3,
  filter,
}: SimilaritySearchProps): Promise<SimilaritySearchResult[]> {
  if (!process.env.PINECONE_API_KEY || !process.env.PINECONE_INDEX_NAME) {
    throw new Error("Missing Pinecone configuration");
  }

  if (!process.env.JINA_EMBEDDING_API_KEY) {
    throw new Error("Missing Jina embedding API key");
  }

  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME);

  const embedding = new JinaEmbeddings({
    apiKey: process.env.JINA_EMBEDDING_API_KEY,
    model: "jina-embeddings-v3",
    batchSize: 32,
  });

  const vectorStore = await PineconeStore.fromExistingIndex(embedding, {
    pineconeIndex: index,
    namespace: userId,
  });

  const metadataFilter = { pdfId, ...(filter ?? {}) };

  const result = await vectorStore.similaritySearchWithScore(
    query,
    topK,
    metadataFilter,
  );

  return result
    .filter(([, score]) => score >= SCORE_THRESHOLD)
    .map(([doc, score]) => ({
      content: doc.pageContent,
      metadata: doc.metadata,
      score,
    }));
}

export async function getPageChunks({
  userId,
  pdfId,
  pages,
}: PageChunkProps): Promise<PageChunkResult[]> {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

  const response = await index.namespace(userId).query({
    topK: 1000,
    filter: {
      pdfId,
      page: { $in: pages },
    },
    includeMetadata: true,
    includeValues: false,
    vector: new Array(1024).fill(0),
  });

  if (!response.matches || response.matches.length === 0) {
    return [];
  }

  return response.matches.map((match) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: (match.metadata as any)?.text ?? "",
    metadata: match.metadata ?? {},
  }));
}

export async function getAllChunks({
  userId,
  pdfId,
}: FullPDFChunkProps): Promise<PageChunkResult[]> {
  const pinecone = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY!,
  });

  const index = pinecone.Index(process.env.PINECONE_INDEX_NAME!);

  const response = await index.namespace(userId).query({
    topK: 1000,
    filter: { pdfId },
    includeMetadata: true,
    includeValues: false,
    vector: new Array(1024).fill(0),
  });

  if (!response.matches || response.matches.length === 0) {
    return [];
  }

  return response.matches.map((match) => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    content: (match.metadata as any)?.text ?? "",
    metadata: match.metadata ?? {},
  }));
}
