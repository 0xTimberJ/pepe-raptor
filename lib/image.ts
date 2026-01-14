import { pb } from "./pocketbase";

interface RecordWithImage {
  id: string;
  collectionId?: string;
  collectionName?: string;
}

export function getImageUrl(record: RecordWithImage, filename: string): string {
  return pb.files.getURL(record as any, filename);
}
