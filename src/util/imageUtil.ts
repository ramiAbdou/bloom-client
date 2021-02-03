import aws from 'aws-sdk';
import Jimp from 'jimp';
import { nanoid } from 'nanoid';

import { isProduction } from '@constants';

const bucketUrl = isProduction
  ? process.env.DIGITAL_OCEAN_BUCKET_URL
  : process.env.DIGITAL_OCEAN_TEST_BUCKET_URL;

const bucketName = isProduction
  ? process.env.DIGITAL_OCEAN_BUCKET_NAME
  : process.env.DIGITAL_OCEAN_TEST_BUCKET_NAME;

const s3 = new aws.S3({
  accessKeyId: isProduction
    ? process.env.DIGITAL_OCEAN_KEY
    : process.env.DIGITAL_OCEAN_TEST_KEY,
  endpoint: new aws.Endpoint(bucketUrl),
  secretAccessKey: isProduction
    ? process.env.DIGITAL_OCEAN_SECRET
    : process.env.DIGITAL_OCEAN_TEST_SECRET
});

interface ConvertImageToBase64Args {
  content: BlobPart;
  dims?: number[];
}

/**
 * Returns the base 64 string from the image content.
 * @param {BufferSource | Blob | string} imageContent Image to convert.
 */
export const convertImageToBase64 = async ({
  content,
  dims
}: ConvertImageToBase64Args): Promise<string> => {
  const arrBuffer: ArrayBuffer = await new Blob([content]).arrayBuffer();
  const buffer: Buffer = Buffer.from(arrBuffer);
  const image: Jimp = (await Jimp.read(buffer)).cover(dims[0], dims[1]);
  return image.getBase64Async(Jimp.MIME_PNG);
};

interface UploadImageArgs {
  base64String: string;
  key: string;
  version?: number;
}

/**
 * Uploads the given image to the AWS S3 bucket.
 *
 * @param key The S3 bucket object key.
 */
export const uploadImage = async ({
  base64String,
  key
}: UploadImageArgs): Promise<string> => {
  const image: Jimp = await Jimp.read(base64String);
  const buffer = await image.getBufferAsync(Jimp.MIME_PNG);

  const bucketKey = `${key}-${nanoid()}`;

  const options: aws.S3.PutObjectRequest = {
    ACL: 'public-read',
    Body: buffer,
    Bucket: bucketName,
    Key: bucketKey
  };

  await s3.putObject(options).promise();
  return `${bucketUrl}/${bucketKey}`;
};
