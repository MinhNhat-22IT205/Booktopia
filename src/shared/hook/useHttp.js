import { useCallback, useEffect, useRef, useState } from "react";

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const activeRequests = useRef([]);
  const fetchData = useCallback(
    async (url, method = "GET", headers = {}, body = null) => {
      try {
        setIsLoading(true);
        const abortController = new AbortController();
        const signal = abortController.signal;
        activeRequests.current.push(abortController);
        const response = await fetch(url, {
          method,
          headers,
          body,
          signal: signal,
        });
        const responseData = await response.json();
        activeRequests.current = activeRequests.current.filter(
          (abctl) => abctl !== abortController
        );
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setError(null);
        setIsLoading(false);
        return responseData;
      } catch (er) {
        setError(er.message);
        setIsLoading(false);
        throw er;
      }
    },
    []
  );

  useEffect(() => {
    return () => {
      activeRequests.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);
  return { isLoading, error, fetchData };
};

export default useHttp;
