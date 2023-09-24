import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

export interface SchedulingContextDataProps {
  nameCollection: string;
  setNameCollection: Dispatch<SetStateAction<string>>
};

type SchedulingProviderProps = {
  children: ReactNode;
};

export const SchedulingContext = createContext({} as SchedulingContextDataProps);

function SchedulingContextProvider({ children }: SchedulingProviderProps) {
  const [nameCollection, setNameCollection] = useState('');

  return (
    <SchedulingContext.Provider
      value={{
        nameCollection,
        setNameCollection,
      }}
    >
      {children}
    </SchedulingContext.Provider>
  );
}

export { SchedulingContextProvider };
