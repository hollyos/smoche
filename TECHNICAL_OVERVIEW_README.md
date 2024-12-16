# README: Technical Overview of Smoche Application

## Project Structure

The project adheres to a modular architecture aimed at scalability, maintainability, and enhanced developer experience. Below is an overview of the directory structure and its purpose:

```
.
├── app                 # Core application logic with route-driven components
│   ├── (tabs)          # Tab-based navigation structure
│   ├── _layout.tsx     # Global layout configuration
│   └── index.tsx       # Entry point for tab-based navigation
├── assets              # Static assets including images and fonts
├── components          # Reusable UI components
│   ├── ImageGallery.tsx
│   ├── Pill.tsx
│   ├── PillList.tsx
│   ├── ProfileCard.tsx
│   ├── ProfileList.tsx
├── constants           # Centralized configuration such as colors
├── hooks               # Custom hooks for state and styling logic
├── stores              # Zustand state management stores
├── styles              # Centralized styling for colors and themes
├── scripts             # Utility scripts for project maintenance
```

---

## Technical Choices

### 1. **Frameworks and Tools**

- **React Native with Expo**: Provides cross-platform compatibility and simplified build tools.
- **Expo Router**: Enables intuitive, file-based routing in the app, aligned with web development patterns.
- **Zustand for State Management**:
  - Lightweight and straightforward store management.
  - Used to manage user preferences (`likes`, `dislikes`) and profile data across components.
- **TypeScript**:
  - Enhances code reliability through static typing.
  - Improves development productivity with autocomplete and type checks.

### 2. **UI Design**

- **Component-Based Architecture**:
  - Atomic design principles for creating reusable components like `Pill`, `PillList`, and `ProfileCard`.
- **React Native Gesture Handler**:
  - Efficient gesture handling in complex scrolling and tapping scenarios.

### 3. **Styling**

- **Dynamic Theming**:
  - `useThemeColor` hook for managing light and dark modes.
  - Centralized color definitions in `styles/colors.ts` for consistency.
- **Custom Fonts**:
  - Fonts loaded via `expo-font`, improving branding flexibility.

### 4. **State Management**

#### Profile Management (`useProfileStore.tsx`)

- Fetches profile data from an API while ensuring unique identifiers for profiles.
- Handles asynchronous data fetching and error states efficiently.

#### User Preferences (`useUserStore.tsx`)

- Tracks `likes` and `dislikes` for profile interactions.
- Ensures real-time updates without impacting other app states.

---

## Key Components

### 1. **ProfileCard**

- Displays user information (photos, name, age, details).
- Supports interactivity via `Like` and `Dislike` buttons.
- Scroll-to-card functionality implemented with `FlatList.scrollToIndex`.

### 2. **ImageGallery**

- Provides a horizontally scrollable gallery for profile photos.
- Optimized rendering via memoized components.

### 3. **Pill and PillList**

- Used for displaying tag-like data (e.g., user interests, desires).
- Fully reusable with customizable styles.

### 4. **ProfileList**

- Renders a list of `ProfileCard` components.
- Filters out liked or disliked profiles dynamically.

---

## Architecture Design

### 1. **Routing**

- Tab-based navigation with `expo-router`.
- Supports dynamic layout adjustments via `_layout.tsx`.

### 2. **State Separation**

- User state (preferences) and profile state (data) are isolated in separate stores for cleaner logic and easier debugging.

### 3. **API Integration**

- Profile data is fetched from a dedicated API (`/api/v1/users`).
- Headers and sensitive tokens are managed via `.env` for security.

### 4. **Performance Optimization**

- **Lazy Loading**: Initial rendering of a small subset of `ProfileCard` components via `FlatList`.
- **Memoization**: Optimized rendering in `ImageGallery` and `ProfileCard` using `React.memo` and `useCallback`.

---

## Ideas and Suggestions

### 1. **Error Handling**

- **Improved Feedback**: Display user-friendly error messages for network failures.
- **Retry Logic**: Automatically retry failed API requests with exponential backoff.

### 2. **Pagination**

- Current implementation fetches all profiles at once. Implement server-side or client-side pagination for scalability.

### 3. **Animations**

- Enhance user interactions with animations:
  - Smooth transitions for `Like` and `Dislike` actions.
  - Highlight current card during scroll-to-index.

### 4. **Testing**

- Expand on existing tests (`jest`):
  - Add integration tests for state changes in `useProfileStore`.
  - Validate UI interactions for `ProfileCard` and `ImageGallery`.

### 5. **Accessibility**

- Ensure compliance with accessibility standards:
  - Add screen reader labels (`accessibilityLabel`) for interactive components.
  - Test components for keyboard navigation and focus states.

---

## Running the Project

### Prerequisites

- **Node.js**, **npm**, and **expo-cli** installed.
- Expo CLI installed globally: `npm install -g expo-cli`.

### Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```

### Testing

Run all tests with:

```bash
npm test
```

---

## Conclusion

The **Smoche Application** is architected with scalability and maintainability in mind, leveraging modern tools like React Native, Expo, and Zustand. While the app provides a solid foundation, implementing suggestions like pagination, enhanced animations, and improved error handling will further elevate its robustness and user experience.
