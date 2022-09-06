import { HTMLAttributes, ReactNode } from "react";

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
  children: ReactNode | ReactNode[];
}

// * module components

// * widget components
export interface AvatarProps {
  className: string;
  src: string;
  placeholder: string;
}
export interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode | ReactNode[];
}
export interface LoadingProps {
  page?: boolean;
  size?: number;
}
