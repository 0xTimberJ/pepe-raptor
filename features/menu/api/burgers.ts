import { pb } from "@/lib/pocketbase";

export interface Burger {
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
export function getImageUrl(record: Burger, filename: string): string {
  return pb.files.getURL(record, filename);
}

export async function getBurgers(): Promise<Burger[]> {
  try {
    const records = await pb.collection("burgers").getFullList<Burger>({
      sort: "-created",
    });
    return records;
  } catch (error) {
    console.error("Error fetching burgers:", error);
    throw error;
  }
}
