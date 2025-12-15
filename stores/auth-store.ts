import { create } from "zustand";
import { pb } from "@/lib/pocketbase";
import type { RecordModel } from "pocketbase";

interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  points: number;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  addPoints: (points: number) => Promise<void>;
}

function mapRecordToUser(record: RecordModel): User {
  return {
    id: record.id,
    email: record.email,
    name: record.name,
    avatar: record.avatar,
    points: record.points || 0,
  };
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  login: async (email, password) => {
    try {
      const authData = await pb.collection("users").authWithPassword(email, password);
      set({ 
        user: mapRecordToUser(authData.record), 
        isAuthenticated: true 
      });
    } catch (error) {
      throw error;
    }
  },

  register: async (email, password, name) => {
    try {
      await pb.collection("users").create({
        email,
        password,
        passwordConfirm: password,
        name,
        points: 0,
      });
      await get().login(email, password);
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    pb.authStore.clear();
    set({ user: null, isAuthenticated: false });
  },

  checkAuth: () => {
    if (pb.authStore.isValid && pb.authStore.model) {
      set({ 
        user: mapRecordToUser(pb.authStore.model), 
        isAuthenticated: true,
        isLoading: false 
      });
    } else {
      set({ user: null, isAuthenticated: false, isLoading: false });
    }
  },

  addPoints: async (points) => {
    const { user } = get();
    if (!user) return;
    
    const newPoints = user.points + points;
    await pb.collection("users").update(user.id, { points: newPoints });
    set({ user: { ...user, points: newPoints } });
  },
}));
