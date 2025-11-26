import { pb } from "@/lib/pocketbase";

export interface Dessert {
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
export function getImageUrl(record: Dessert, filename: string): string {
  return pb.files.getURL(record, filename);
}

export async function getDesserts(): Promise<Dessert[]> {
  try {
    const records = await pb.collection("desserts").getFullList<Dessert>({
      sort: "-created",
    });
    return records;
  } catch (error) {
    console.error("Error fetching desserts:", error);
    throw error;
  }
}
