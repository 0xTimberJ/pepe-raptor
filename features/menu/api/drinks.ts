import { pb } from "@/lib/pocketbase";

export interface Drink {
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
export function getImageUrl(record: Drink, filename: string): string {
  return pb.files.getURL(record, filename);
}

export async function getDrinks(): Promise<Drink[]> {
  try {
    const records = await pb.collection("drinks").getFullList<Drink>({
      sort: "-created",
    });
    return records;
  } catch (error) {
    console.error("Error fetching drinks:", error);
    throw error;
  }
}
