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
