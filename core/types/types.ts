// * queries response
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

export type OriginalsVideosQuery = VideosByTypeQuery;

// * contexts
export type ThemeContextValue = {
  appTheme: "light" | "dark";
  toggleTheme: () => void;
  setAppThemeToLight: () => void;
  setAppThemeToDark: () => void;
};

// * layout components

// * module components

// * widget components
