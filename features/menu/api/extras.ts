import { pb } from "@/lib/pocketbase";

export interface Extra {
  id: string;
  name: string;
  price: number;
  category?: string;
  created: string;
  updated: string;
}

export async function getExtras(): Promise<Extra[]> {
  try {
    const records = await pb.collection("extras").getFullList<Extra>({
      sort: "name",
    });
    return records;
  } catch (error) {
    console.error("Error fetching extras:", error);
    throw error;
  }
}
