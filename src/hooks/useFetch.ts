import { useState, useEffect } from "react";
import axios from "axios";
import { breweryInterface } from "../interfaces/breweryInterface";

export function useFetch(request: string, query?: string) {
  const [response, setResponse] = useState<breweryInterface[]>([]);
  const [error, setError] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    (async () => {
      try {
        const urlRequest = `${request}${query ? query : ""}`;
        const response = await axios(urlRequest);
        console.log(urlRequest);
        setResponse(await response?.data);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
        throw new Error("Something went wrong while fetching data!");
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [query, request]);

  return { response, error, isLoading };
}

export function useFetchDetails(request: string, query: string) {
  const [response, setResponse] = useState<breweryInterface | null>(null);
  const [error, setError] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const abortController = new AbortController();
    setIsLoading(true);
    (async () => {
      try {
        const urlRequest = `${request}${query}`;
        console.log(urlRequest);
        const response = await axios(urlRequest);
        setResponse(await response?.data);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
        throw new Error("Something went wrong while fetching data!");
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [query, request]);

  return { response, error, isLoading };
}
