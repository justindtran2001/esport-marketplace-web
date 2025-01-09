import { Character } from "@/data/models";
import { createContext, Dispatch } from "react";

export enum CharactersActionType {
  CLEAR = "CLEAR",
  SET_LOADING = "SET_LOADING",
  SET_CHARACTERS = "SET_CHARACTERS",
}

export type CharacterReducerState = {
  characters: Character[];
  isLoading: boolean;
};

export const initialCharacterReducerState = {
  characters: [],
  isLoading: false,
};

export const charactersReducer = (
  prevState: CharacterReducerState,
  action: {
    type: CharactersActionType;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    payload?: any;
  },
): CharacterReducerState => {
  switch (action.type) {
    case CharactersActionType.CLEAR:
      return {
        ...prevState,
        characters: [],
      };
    case CharactersActionType.SET_LOADING:
      return {
        ...prevState,
        isLoading: action.payload,
      };
    case CharactersActionType.SET_CHARACTERS:
      return {
        ...prevState,
        characters: action.payload,
      };
    default:
      return prevState;
  }
};

export const CharactersContext = createContext<CharacterReducerState>(
  initialCharacterReducerState,
);

export const CharactersDispatchContext = createContext<
  Dispatch<{
    type: CharactersActionType;
    payload: unknown;
  }>
>(() => {});
