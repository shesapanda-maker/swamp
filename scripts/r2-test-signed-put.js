import dotenv from "dotenv";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
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

async function testSignedPut() {
  const command = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET_NAME,
    Key: "test/signed-put.txt",
    ContentType: "text/plain",
  });

  const signedUrl = await getSignedUrl(client, command, {
    expiresIn: 60, // 60 секунд
  });

  console.log("🔐 Signed PUT URL (valid 60s):");
  console.log(signedUrl);
}

testSignedPut().catch(console.error);
