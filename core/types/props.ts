import { ReactNode } from "react";

// * contracts
export interface GraphQLClientService {
  query(query: any, variables?: any): Promise<any>;
}

// * contexts
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
