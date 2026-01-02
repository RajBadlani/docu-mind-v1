import {
    S3Client, 
    DeleteObjectCommand ,
    PutObjectCommand, 
    GetObjectCommand
} from "@aws-sdk/client-s3"

import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

function getS3Client() : S3Client{
    if (!process.env.AWS_REGION || !process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    throw new Error("Missing AWS configuration. Please set AWS_REGION, AWS_ACCESS_KEY_ID, and AWS_SECRET_ACCESS_KEY environment variables.");
  }

  return new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });
}

export const s3 = getS3Client()

export async function s3UploadUrl(userId: string, pdfName: string, pdfType: string) {
  if (!process.env.AWS_S3_BUCKET) {
    throw new Error("AWS_S3_BUCKET environment variable is not set");
  }

  const key = `user_uploads/${userId}/${pdfName}`;

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
    ContentType: pdfType,
  });

  const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
  return { uploadUrl, key };
}

export async function s3GetUrl(key: string) {
  if (!process.env.AWS_S3_BUCKET) {
    throw new Error("AWS_S3_BUCKET environment variable is not set");
  }

  const command = new GetObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });

  const getUrl = await getSignedUrl(s3, command, { expiresIn: 60 });
  return getUrl;
}

export async function s3DeleteUrl(key: string) {
  if (!process.env.AWS_S3_BUCKET) {
    throw new Error("AWS_S3_BUCKET environment variable is not set");
  }

  const command = new DeleteObjectCommand({
    Bucket: process.env.AWS_S3_BUCKET,
    Key: key,
  });

  await s3.send(command);
}