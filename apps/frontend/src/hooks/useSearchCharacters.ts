import {
  CharactersActionType,
  CharactersDispatchContext,
} from "@/context/characters";
import apiClient from "@/data/api-client";
import { Character, QueryFilters } from "@/data/models";
import { useCallback, useContext } from "react";

const useQueryCharacters = () => {
  const dispatch = useContext(CharactersDispatchContext);

  const setLoading = useCallback(
    (loading = false) =>
      dispatch({
        type: CharactersActionType.SET_LOADING,
        payload: loading,
      }),
    [dispatch],
  );
  const setResultCharacters = useCallback(
    (characters: Character[]) =>
      dispatch({
        type: CharactersActionType.SET_CHARACTERS,
        payload: characters,
      }),
    [dispatch],
  );

  const executeQuery = useCallback(
    async (searchString: string, filters: QueryFilters) => {
      setLoading(true);
      try {
        const resp = await apiClient?.post("/characters/query", {
          search: searchString,
          filters,
        });

        if (resp?.statusText === "OK") {
          setResultCharacters(resp.data || []);
          setLoading(false);
        } else {
          throw new Error("[client-error] Fetch characters NOT OK");
        }
      } catch (error) {
        console.error("Error when calling API search characters", error);
        setLoading(false);
      }
    },
    [setLoading, setResultCharacters],
  );

  return {
    executeQuery,
  };
};

export default useQueryCharacters;
