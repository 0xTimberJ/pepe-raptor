import { pb } from "@/lib/pocketbase";

export interface Sauce {
  id: string;
  name: string;
  price: number | null;
  image?: string;
  created: string;
  updated: string;
}

/**
 * Get the full URL for an uploaded file in PocketBase
 */
export function getImageUrl(record: Sauce, filename: string): string {
  return pb.files.getURL(record, filename);
}

export async function getSauces(): Promise<Sauce[]> {
  try {
    const records = await pb.collection("sauce").getFullList<Sauce>({
      sort: "-created",
    });
    return records;
  } catch (error) {
    console.error("Error fetching sauces:", error);
    throw error;
  }
}
