import { createUploadthing, type FileRouter } from 'uploadthing/fastify';

import { env } from '../../configs/env';

const f = createUploadthing();
export const uploadRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '8MB',
      maxFileCount: 2,
    },
  }).onUploadComplete((data) => {
    if (env.NODE_ENV !== 'production') {
      console.log(data);
    }
  }),
} satisfies FileRouter;

export type OurFileRouter = typeof uploadRouter;
