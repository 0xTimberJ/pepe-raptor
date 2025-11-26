import { pb } from "@/lib/pocketbase";

export interface Frite {
  id: string;
  name: string;
  price: number | null;
  description?: string;
  image?: string;
  created: string;
  updated: string;
}

/**
 * Get the full URL for an uploaded file in PocketBase
 */
export function getImageUrl(record: Frite, filename: string): string {
  return pb.files.getURL(record, filename);
}

export async function getFrites(): Promise<Frite[]> {
  try {
    const records = await pb.collection("frites").getFullList<Frite>({
      sort: "-created",
    });
    return records;
  } catch (error) {
    console.error("Error fetching frites:", error);
    throw error;
  }
}
