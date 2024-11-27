import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth(); // Await the auth() promise
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async () => await handleAuth()) // Ensure the middleware is async
    .onUploadComplete(() => {
      console.log("Course image upload complete!");
    }),

  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(async () => await handleAuth()) // Async middleware
    .onUploadComplete(() => {
      console.log("Course attachment upload complete!");
    }),

  chapterVideo: f({ video: { maxFileCount: 1, maxFileSize: "512GB" } })
    .middleware(async () => await handleAuth()) // Async middleware
    .onUploadComplete(() => {
      console.log("Chapter video upload complete!");
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
