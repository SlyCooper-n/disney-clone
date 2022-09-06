import {
  ProfileContextValue,
  ProfileProviderProps,
  ProfileQuery,
} from "@core/types";
import { createContext, useState } from "react";

export const ProfileContext = createContext({} as ProfileContextValue);

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [selectedProfile, setSelectedProfile] = useState<
    ProfileQuery["profile"] | null
  >(null);

  function selectProfile(profile: ProfileQuery["profile"]) {
    setSelectedProfile(profile);
  }

  return (
    <ProfileContext.Provider value={{ selectedProfile, selectProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
