import apiClient from "@/data/api-client";
import { Character } from "@/data/models";
import { useEffect, useState } from "react";

const useSpotlightCharacters = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSpotlightCharacters = async () => {
    setLoading(true);
    const resp = await apiClient?.get("/characters", {
      params: {
        spotlight: true,
      },
    });
    if (resp?.statusText === "OK") {
      setCharacters(resp.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSpotlightCharacters();
  }, []);

  return { characters, loading };
};

export default useSpotlightCharacters;
