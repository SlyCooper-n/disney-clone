import {
  Profile,
  ProfileContextValue,
  ProfileProviderProps,
} from "@core/types";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";

export const ProfileContext = createContext({} as ProfileContextValue);

export const ProfileProvider = ({ children }: ProfileProviderProps) => {
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (selectedProfile === null && !router.pathname.includes("/profiles")) {
      router.push("/profiles");
    }
  }, [selectedProfile, router]);

  function selectProfile(profile: Profile) {
    setSelectedProfile(profile);
  }

  return (
    <ProfileContext.Provider value={{ selectedProfile, selectProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
