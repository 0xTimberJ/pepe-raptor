import PocketBase from "pocketbase";

const POCKETBASE_URL =
  process.env.EXPO_PUBLIC_POCKETBASE_URL ||
  "https://pocketbase-xscwcwowk0ooo8oggc0gws4g.0xtimberj.com";

export const pb = new PocketBase(POCKETBASE_URL);

// Enable auto cancellation for all pending requests
pb.autoCancellation(false);
