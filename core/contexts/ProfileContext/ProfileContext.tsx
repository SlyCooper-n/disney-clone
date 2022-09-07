import {
  ProfileContextValue,
  ProfileProviderProps,
  ProfileQuery,
} from "@core/types";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const ProfileContext = createContext({} as ProfileContextValue);

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [selectedProfile, setSelectedProfile] = useState<
    ProfileQuery["profile"] | null
  >(null);
  const router = useRouter();

  useEffect(() => {
    if (selectedProfile === null) {
      router.push("/profiles");
    }
  }, [selectedProfile, router]);

  function selectProfile(profile: ProfileQuery["profile"]) {
    setSelectedProfile(profile);
  }

  return (
    <ProfileContext.Provider value={{ selectedProfile, selectProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
