import {
  CharactersActionType,
  CharactersDispatchContext,
} from "@/context/characters";
import apiClient from "@/data/api-client";
import { Character } from "@/data/models";
import { useCallback, useContext, useEffect } from "react";

const useFetchCharacters = () => {
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

  const fetchCharacters = useCallback(async () => {
    setLoading(true);
    try {
      const resp = await apiClient?.get("/characters");
      if (resp?.statusText === "OK") {
        setResultCharacters(resp.data);
        setLoading(false);
      } else {
        setResultCharacters([]);
        throw new Error("[client-error] Fetch characters NOT OK");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error when calling API fetch characters", error);
    }
  }, [setLoading, setResultCharacters]);

  useEffect(() => {
    fetchCharacters();
  }, [fetchCharacters]);
};

export default useFetchCharacters;
