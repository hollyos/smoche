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

export const profiles = [{
  "id": "55be3c8fc964860700ebf515",
  "info": {
    "age": 20,
    "type": "single",
    "gender": "male",
    "sexuality": "straight",
    "name": "John",
    // a short text about them
    "about": "\"Tell us more about you\"",
    // a list of desires
    "desires": [
      "Relationship",
      "Casual",
    ],
    // a list of tags they're interested in
    "interests": [
      "Food",
      "Video Games",
    ]
  },
  "associated": null, // if they're a couple, this will be populated
  "photos": [ // this will be a list of zero or more photos
    {
      "url": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61",
      "width": 1480,
      "height": 1480
    }
  ]
}, {
  "id": "55be3c8fc964860700ebf516",
  "info": {
    "age": 20,
    "type": "single",
    "gender": "female",
    "sexuality": "straight",
    "name": "Kirra",
    // a short text about them
    "about": "\"Tell us more about you\"",
    // a list of desires
    "desires": [
      "Long-Term Relationship",
      "Casual",
      "Short-Term Relationship",
      "Single 4 Couple",
      "Single 4 Single",
    ],
    // a list of tags they're interested in
    "interests": [
      "Art",
      "Reading",
      "DIY",
      "Kyacking",
      "Drawing",
      "Climbing",
      "Adventure"
    ]
  },
  "associated": null, // if they're a couple, this will be populated
  "photos": [ // this will be a list of zero or more photos
    {
      "url": "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453",
      "width": 605,
      "height": 907
    }
  ]
}, {
  "id": "55be3c8fc964860700ebf518",
  "info": {
    "age": 20,
    "type": "coupled & open",
    "gender": "trans female",
    "sexuality": "pansexual polyamorous",
    "name": "Sara",
    // a short text about them
    "about": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    // a list of desires
    "desires": [
      "Long-Term Relationship",
      "Casual",
      "Short-Term Relationship",
      "Single 4 Couple",
      "Single 4 Single",
    ],
    // a list of tags they're interested in
    "interests": [
      "Art",
      "Reading",
      "DIY",
      "Kyacking",
      "Drawing",
      "Climbing",
      "Adventure"
    ]
  },
  "associated": null, // if they're a couple, this will be populated
  "photos": [ // this will be a list of zero or more photos
    {
      "url": "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
      "width": 605,
      "height": 907
    }
  ]
}];