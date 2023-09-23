const openAI = require("openai");
const { Pinecone } = require("@pinecone-database/pinecone");
const dotenv = require("dotenv");

dotenv.config();

const openAiApiKey = process.env.OPEN_AI_API_KEY2;
const pineconeEnv = process.env.PINECONE_ENVIRONMENT;
const pineconeApiKey = process.env.PINECONE_API_KEY;
const pineconeIndexName = process.env.PINECONE_INDEX_NAME;

console.log(openAiApiKey, "llll", pineconeApiKey);

const pinecone = new Pinecone({
  environment: pineconeEnv,
  apiKey: pineconeApiKey,
});
const index = pinecone.Index(pineconeIndexName);

const openAi = new openAI({ apiKey: openAiApiKey });

const createEmbeddings = async (dataObj) => {
  const config = {
    model: "text-embedding-ada-002",
    input: dataObj,
  };
  return await openAi.embeddings.create(config);
};

const createEmbeddingsForDataChunks = async (dataChunks) => {
  const embeddings = [];
  let requestsMade = 0;
  for (let i = 0; i < 3; i++) {
    const chunk = dataChunks[i];
    if (requestsMade >= 3) {
      // Exceeded rate limit, wait before making the next request
      console.log(embeddings);
      console.log(
        "_________________________________________________________________________________________________________________________________"
      );
      console.log(embeddings.length);
      console.log(
        "_________________________________________________________________________________________________________________________________"
      );
      await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait for 60 seconds
      requestsMade = 0; // Reset request counter
    }
    try {
      const embeddingInformation = await createEmbeddings(
        JSON.stringify(chunk)
      );
      const embedding = embeddingInformation.data[0].embedding;
      embeddings.push({ dataObj: chunk, embedding });
      requestsMade++; // Increment the request counter
    } catch (err) {
      console.log(err);
      // Retry the request after a delay
      await new Promise((resolve) => setTimeout(resolve, 60000)); // Wait for 60 seconds
      i--; // Retry the same input
    }
  }
  return embeddings;
};

const createPineconeIndex = async ({ index, embeddingRecords }) => {
  const configs = [];

  for (let i = 0; i < embeddingRecords.length; i++) {
    const embeddingRecord = embeddingRecords[i];
    const config = {
      id: `vec_${i}`,
      values: embeddingRecord.embedding,
      metadata: {
        dataObj: JSON.stringify(embeddingRecord.dataObj),
      },
    };
    configs.push(config);
  }
  await index.upsert(configs);
};

const trainOpenAiAndStoreEmbeddings = async ({ data }) => {
  const embeddingRecords = await createEmbeddingsForDataChunks(data);
  console.log(embeddingRecords);
  await createPineconeIndex({ index, embeddingRecords });
};

module.exports = { trainOpenAiAndStoreEmbeddings, index, createEmbeddings };
