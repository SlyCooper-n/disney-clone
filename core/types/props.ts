import { HTMLAttributes, ReactNode } from "react";
import { Slide } from "./types";

// * contracts
export interface GraphQLClientService {
  query(query: any, variables?: any): Promise<any>;
}

// * contexts
export interface AuthContextProps {
  children: ReactNode | ReactNode[];
}
export interface ProfileProviderProps {
  children: ReactNode | ReactNode[];
}
export interface ThemeProviderProps {
  children: ReactNode | ReactNode[];
}

// * layout components
export interface PageContainerProps {
  headTitle?: string;
  description?: string;
  center?: boolean;
  navbar?: boolean;
  children: ReactNode | ReactNode[];
}

// * module components

// * widget components
export interface AvatarProps {
  className?: string;
  src: string | null;
  placeholder: string;
}
export interface BannerSwiperProps {
  slides: Slide[];
}
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode | ReactNode[];
}
export interface DialogProps {
  open: boolean;
  toggleDialog: () => void;
  title: string;
  description: string;
  labelFields: { label: string; inputName: string; required?: boolean }[];
  submitButtonText?: string;
  onSubmit?: (inputObject: Record<string, FormDataEntryValue>) => Promise<void>;
  refetchData?: () => Promise<void>;
  children: ReactNode | ReactNode[];
}
export interface LoadingProps {
  page?: boolean;
  size?: number;
}
export interface SliderCaretProps {
  variant: "right" | "left";
}
