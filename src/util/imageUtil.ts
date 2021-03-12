import aws from 'aws-sdk';
import Jimp from 'jimp';
import { nanoid } from 'nanoid';

const accessKeyId: string = process.env.DIGITAL_OCEAN_KEY;
const bucketName: string = process.env.DIGITAL_OCEAN_BUCKET_NAME;
const bucketUrl: string = process.env.DIGITAL_OCEAN_BUCKET_URL;
const secretAccessKey: string = process.env.DIGITAL_OCEAN_SECRET;

const s3 = new aws.S3({
  accessKeyId,
  endpoint: 'sfo3.digitaloceanspaces.com',
  secretAccessKey
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

interface DeleteImageArgs {
  key: string;
  imageUrl: string;
}

/**
 * Deletes image from the AWS S3 bucket.
 *
 * @param key The S3 bucket object key.
 * @param imageUrl URL that points to the S3 bucket object.
 */
const deleteImage = async ({
  key,
  imageUrl
}: DeleteImageArgs): Promise<boolean> => {
  if (!imageUrl) return false;

  const bucketKey = imageUrl.substring(imageUrl.indexOf(key), imageUrl.length);
  if (!bucketKey) return false;

  const options: aws.S3.DeleteObjectRequest = {
    Bucket: bucketName,
    Key: bucketKey
  };

  await s3.deleteObject(options).promise();
  return true;
};

interface UploadImageArgs {
  base64String: string;
  key: string;
  previousImageUrl?: string;
}

/**
 * Uploads the given image to the AWS S3 bucket.
 *
 * @param key The S3 bucket object key.
 */
export const uploadImage = async ({
  base64String,
  key,
  previousImageUrl
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
  if (previousImageUrl) await deleteImage({ imageUrl: previousImageUrl, key });
  return `${bucketUrl}/${bucketKey}`;
};
