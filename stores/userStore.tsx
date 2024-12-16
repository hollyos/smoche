import { create } from "zustand";

/**
 * Type definition for the user store state.
 */
interface UserStoreState {
  // User details, can be expanded to a specific type later
  user: Record<string, any>;
  // Array of profile IDs liked by the user
  likes: string[];
  // Array of profile IDs disliked by the user
  dislikes: string[];

  // Actions
  addLike: (id: string) => void;
  removeLike: (id: string) => void;
  addDislike: (id: string) => void;
  removeDislike: (id: string) => void;
}

/**
 * Zustand store for user-related state
 */
export const useUserStore = create<UserStoreState>((set) => ({
  // Placeholder for user details
  user: {},
  // Array of profile IDs liked by the user
  likes: [],
  // Array of profile IDs disliked by the user
  dislikes: [],

  // Add a profile ID to the likes array
  addLike: (id: string) =>
    set((state: UserStoreState) => ({
      likes: state.likes.includes(id) ? state.likes : [...state.likes, id],

      // Remove from dislikes if present
      dislikes: state.dislikes.filter((dislikeId: string) => dislikeId !== id),
    })),

  // Remove a profile ID from the likes array
  removeLike: (id: string) =>
    set((state: UserStoreState) => ({
      likes: state.likes.filter((likeId: string) => likeId !== id),
    })),

  // Add a profile ID to the dislikes array
  addDislike: (id: string) =>
    set((state: UserStoreState) => ({
      dislikes: state.dislikes.includes(id)
        ? state.dislikes
        : [...state.dislikes, id],

      // Remove from likes if present
      likes: state.likes.filter((likeId: string) => likeId !== id),
    })),

  // Remove a profile ID from the dislikes array
  removeDislike: (id: string) =>
    set((state: UserStoreState) => ({
      dislikes: state.dislikes.filter((dislikeId: string) => dislikeId !== id),
    })),
}));
