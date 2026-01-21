import dotenv from "dotenv";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config({ path: ".env.local" });

const client = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

async function testSignedGet() {
  const command = new GetObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: "test/hello.txt", // тот файл, который ты загрузила
  });

  const signedUrl = await getSignedUrl(client, command, {
    expiresIn: 60, // 60 секунд
  });

  console.log("🔗 Signed GET URL (valid 60s):");
  console.log(signedUrl);
}

testSignedGet().catch(console.error);
