import { pb } from "@/lib/pocketbase";

export interface Snack {
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
export function getImageUrl(record: Snack, filename: string): string {
  return pb.files.getURL(record, filename);
}

export async function getSnacks(): Promise<Snack[]> {
  try {
    const records = await pb.collection("snacks").getFullList<Snack>({
      sort: "-created",
    });
    return records;
  } catch (error) {
    console.error("Error fetching snacks:", error);
    throw error;
  }
}
