import { ProfileContext } from "@core/contexts";
import { useContext } from "react";

export const useProfile = () => {
  return useContext(ProfileContext);
};
