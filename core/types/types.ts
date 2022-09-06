import { AuthProvider } from "firebase/auth";

// * queries response
export type BrandPageQuery = {
  brand: {
    backgroundVideo: {
      url: string;
    };
    backgroundImage: {
      url: string;
    };
  };
};
export type HomepageQuery = {
  page: {
    homepage: {
      slider: null;
      brands: {
        id: string;
        slug: string;
        brandLogo: {
          url: string;
        };
        backgroundGif: {
          url: string;
        };
      }[];
    };
  };
};
export type OriginalsVideosQuery = VideosByTypeQuery;

export type ProfileQuery = {
  profile: {
    id: string;
    username: string;
    avatarUrl: string;
  };
};
export type ProfilesQuery = {
  profiles: ProfileQuery["profile"][];
};
export type VideoByIDQuery = {
  video: {
    mp4: {
      url: string;
    };
  };
};
export type VideoBySlugQuery = {
  videos: {
    videoInfo: {
      title: string;
      description: string;
      releaseYear: number;
      genre: string[];
      banner: {
        url: string;
      };
      videoLogo: {
        url: string;
      };
    };
  }[];
};
export type VideosByTypeQuery = {
  videos: {
    id: string;
    videoInfo: {
      thumbnails: {
        horizontal: {
          url: string;
        };
        vertical: {
          url: string;
        };
      };
      slug: string;
      genre: string[];
    };
  }[];
};

// * contexts
export type Account = {
  id: string;
  name: string | null;
  email: string | null;
  avatar: string | null;
  signOut: () => Promise<void>;
};
export type AuthContextValue = {
  account: Account | null;
  loading: boolean;
  signIn: (provider: AuthProvider) => Promise<void>;
  signUserOut: () => Promise<void>;
};
export type ProfileContextValue = {
  selectedProfile: ProfileQuery["profile"] | null;
  selectProfile: (profile: ProfileQuery["profile"]) => void;
};
export type ThemeContextValue = {
  appTheme: "light" | "dark";
  toggleTheme: () => void;
  setAppThemeToLight: () => void;
  setAppThemeToDark: () => void;
};
