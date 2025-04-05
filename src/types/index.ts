import { Dispatch, SetStateAction } from "react";

export interface ContinentOptions {
  value: string;
  label: string;
}
export interface ContinentFilterProps {
  setUrl: Dispatch<SetStateAction<string>>;
}
