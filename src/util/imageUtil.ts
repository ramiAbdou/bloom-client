import aws from 'aws-sdk';
import Jimp from 'jimp';

import { isProduction } from '@constants';

const spacesEndpoint = new aws.Endpoint(process.env.DIGITAL_OCEAN_ENDPOINT);

const s3 = new aws.S3({
  accessKeyId: isProduction
    ? process.env.DIGITAL_OCEAN_KEY
    : process.env.DIGITAL_OCEAN_TEST_KEY,
  endpoint: spacesEndpoint,
  secretAccessKey: isProduction
    ? process.env.DIGITAL_OCEAN_SECRET
    : process.env.DIGITAL_OCEAN_TEST_SECRET
});

// const ImageContent = ({ id, initialImage, onSubmit }: ImageUploadProps) => {
//   const { updateOnSubmit } = useForm();
//   const { selectImage, setId } = useImageUpload();

//   // When the value changes, the onSubmit function changes too.
//   useEffect(() => setId(id), [id]);
//   useEffect(() => selectImage(initialImage), [initialImage]);

//   const ref = useRef(null);

//   // When the uploaded image changes, set that value in the form map.
//   const onChange = async ({ target }: React.ChangeEvent<HTMLInputElement>) => {
//     const base64String = await imageHandler.getBase64(target.files[0]);
//     selectImage(base64String);

//     // We update this here b/c the onSubmit function isn't passed to the
//     // ImageUpload state.
//     updateOnSubmit(id, () => onSubmit(base64String));
//   };

//   // Opens the file uploader by "clicking" the invisible file input tag.
//   const openFileUploader = () => ref.current.click();

//   return (
//     <>
//       <input
//         ref={ref}
//         accept=".png, .jpg, .jpeg"
//         className="c-form-image__input"
//         type="file"
//         onChange={onChange}
//       />

//       <Picture openFileUploader={openFileUploader} />
//     </>
//   );
// };

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

/**
 * Uploads the given image to the AWS S3 bucket.
 *
 * @param key The S3 bucket object key.
 * @param imageContent The actual image content that we want to store or URL
 * that has stores the image.
 */
export const uploadImage = async (
  key: string,
  base64String: string
): Promise<string> => {
  const image: Jimp = (await Jimp.read(base64String)).cover(400, 400);
  const resizedBuffer = await image.getBufferAsync(Jimp.MIME_PNG);

  const options: aws.S3.PutObjectRequest = {
    Body: resizedBuffer,
    Bucket: isProduction
      ? process.env.DIGITAL_OCEAN_BUCKET_NAME
      : process.env.DIGITAL_OCEAN_TEST_BUCKET_NAME,
    Key: key
  };

  await s3.putObject(options).promise();

  return image.getBase64Async(Jimp.MIME_PNG);
};

/**
 * @fileoverview Utility: ImageHandler
 * - Image handler that controls the insertion and reading of files to the
 * Digital Ocean space that connects to an AWS S3 bucket. Also, performs
 * generic image operations.
 * @author Rami Abdou
 */

// import { S3 } from 'aws-sdk';
// import Jimp from 'jimp';

// import { DIGITAL_OCEAN } from '@constants';

// const {
//   BUCKET_NAME,
//   SPACES_ACCESS_KEY,
//   SPACES_ENDPOINT,
//   SPACES_SECRET
// } = DIGITAL_OCEAN;

// class ImageHandler {
//   /**
//    * @property AWS S3 instance that we are uploading to and reading from.
//    * For now, we only have one Digital Ocean space, so this doesn't need to be
//    * in the constructor.
//    */
//   private s3: S3 = new S3({
//     accessKeyId: SPACES_ACCESS_KEY,
//     endpoint: SPACES_ENDPOINT,
//     secretAccessKey: SPACES_SECRET
//   });

//   /**
//    * Retrieves the image data with the associated key from the AWS S3 bucket.
//    * @param key The S3 bucket object key. Think of this like a key in a map.
//    */
//   getImage = async (key: string): Promise<string> => {
//     const options = { Bucket: BUCKET_NAME };

//     // First, we list all the objects in the bucket and check if the image with
//     // the key even exists.
//     const listOptions = { ...options, Prefix: key };
//     const imageArray = await this.s3.listObjectsV2(listOptions).promise();
//     if (!imageArray.Contents.length) return null;

//     // Once we know the key exists, then we actually retrieve the image.
//     const getOptions = { ...options, Key: key };
//     const { Body: data } = await this.s3.getObject(getOptions).promise();
//     const image = await Jimp.read(data as Buffer);

//     return image.getBase64Async(Jimp.MIME_PNG);
//   };

//   /**
//    * Returns the base 64 string from the image content.
//    * @param {BufferSource | Blob | string} imageContent Image to convert.
//    */
//   getBase64 = async (imageContent: BlobPart) => {
//     const arrBuffer: ArrayBuffer = await new Blob([imageContent]).arrayBuffer();
//     const buffer: Buffer = Buffer.from(arrBuffer);
//     const image: Jimp = await Jimp.read(buffer);

//     return image.getBase64Async(Jimp.MIME_PNG);
//   };
// }

// export default new ImageHandler();
