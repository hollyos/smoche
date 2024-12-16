import { create } from "zustand";
import TmpProfiles from "./profiles.json";
import axios from "axios";
import { SESSION_TOKEN } from "@env";

/**
 * Represents a photo object in a user's profile.
 * Each photo contains a URL, width, and height.
 */
export interface Photo {
  // The URL of the photo.
  url: string;
  // The width of the photo in pixels.
  width: number;
  // The height of the photo in pixels.
  height: number;
}

/**
 * Contains detailed information about a user's profile.
 * This includes personal attributes and interests.
 */
export interface ProfileInfo {
  // The age of the user.
  age: number;
  // The relationship type of the user (e.g., "single").
  type: string;
  // The gender of the user.
  gender: string;
  // The sexuality of the user.
  sexuality: string;
  // The name of the user.
  name: string;
  // A short description or bio about the user.
  about: string;
  // A list of things the user desires or is looking for.
  desires: string[];
  // A list of interests or hobbies the user is engaged in.
  interests: string[];
}

/**
 * Represents a complete user profile.
 * Contains personal information, photos, and associated profile data.
 */
export interface Profile {
  // The unique identifier for the user's profile.
  id: string;
  // Contains detailed personal information of the user.
  info: ProfileInfo;
  // Indicates an associated profile if the user is part of a couple, or null if single.
  associated: null | string;
  // A list of photos associated with the user's profile.
  photos: Photo[];
  // // A flag indicating if the user has been liked by the current user.
  // liked?: boolean;
  // // A flag indicating if the user has been disliked by the current user.
  // disliked?: boolean;
}

export interface ProfileStoreState {
  // Array of profiles
  profiles: Profile[];
  // Loading state for fetching profiles
  isLoading: boolean;
  // Error message (if any)
  error: string | null;
  // Function to fetch profiles
  fetchProfiles: () => Promise<void>;
  // Function to set profiles list
  setProfiles: (profiles: Profile[]) => void;
  // Function to update a single profile
  updateProfile: (id: string, update: Partial<Profile>) => void;
}

export const useProfileStore = create<ProfileStoreState>((set) => ({
  profiles: [], // [...TmpProfiles.data as Profile[]],
  isLoading: false,
  error: null,

  // Fetch profiles from the API
  fetchProfiles: async () => {
    set({ isLoading: true, error: null }); // Set loading state

    try {
      // Make API request to fetch profiles
      const response = await axios.get<{
        data: Profile[];
        status: number;
      }>("https://fld-devtest-api.herokuapp.com/api/v1/users", {
        headers: {
          "session-token": SESSION_TOKEN,
        },
      });

      // Some of the profiles returned have duplicate IDs on the profile. IDs should always be
      // unique in a dataset. Some housekeeping is needed in the profile DB. This will
      // extract profiles and filter duplicates.
      const uniqueProfiles = Array.from(
        new Map(
          response.data.data.map((profile) => [profile.id, profile]),
        ).values(),
      );

      // Update profiles and reset error state
      set({ profiles: uniqueProfiles, isLoading: false });
    } catch (error: any) {
      // Handle errors and update state
      set({
        error: error.response?.data?.message || "Failed to fetch profiles",
        isLoading: false,
      });
    }
  },

  // Set profiles explicitly
  setProfiles: (profiles: Profile[]) => set(() => ({ profiles })),

  // Update a profile by its ID (e.g., mark it as liked or disliked)
  updateProfile: (id: string, update: Partial<Profile>) =>
    set((state) => ({
      profiles: state.profiles.map((profile: Profile) =>
        profile.id === id ? { ...profile, ...update } : profile,
      ),
    })),
}));
