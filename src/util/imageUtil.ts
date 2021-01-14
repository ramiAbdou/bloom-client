import aws from 'aws-sdk';
import Jimp from 'jimp';

import { isProduction } from '@constants';
import { uuid } from './util';

const endpoint = `${process.env.DIGITAL_OCEAN_REGION}.digitaloceanspaces.com`;
const cdnEndpoint = `${process.env.DIGITAL_OCEAN_REGION}.cdn.digitaloceanspaces.com`;
const spacesEndpoint = new aws.Endpoint(endpoint);

const bucketName = isProduction
  ? process.env.DIGITAL_OCEAN_BUCKET_NAME
  : process.env.DIGITAL_OCEAN_TEST_BUCKET_NAME;

const s3 = new aws.S3({
  accessKeyId: isProduction
    ? process.env.DIGITAL_OCEAN_KEY
    : process.env.DIGITAL_OCEAN_TEST_KEY,
  endpoint: spacesEndpoint,
  secretAccessKey: isProduction
    ? process.env.DIGITAL_OCEAN_SECRET
    : process.env.DIGITAL_OCEAN_TEST_SECRET
});

/**
 * Returns the base 64 string from the image content.
 * @param {BufferSource | Blob | string} imageContent Image to convert.
 */
export const convertImageToBase64 = async (imageContent: BlobPart) => {
  const arrBuffer: ArrayBuffer = await new Blob([imageContent]).arrayBuffer();
  const buffer: Buffer = Buffer.from(arrBuffer);
  const image: Jimp = await Jimp.read(buffer);
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
  const image: Jimp = (await Jimp.read(base64String)).cover(400, 400);
  const resizedBuffer = await image.getBufferAsync(Jimp.MIME_PNG);

  key = `${key}-${uuid()}`;

  const options: aws.S3.PutObjectRequest = {
    ACL: 'public-read',
    Body: resizedBuffer,
    Bucket: bucketName,
    Key: key
  };

  await s3.putObject(options).promise();

  const imageUrl = `https://${bucketName}.${cdnEndpoint}/${key}`;
  return imageUrl;
};
