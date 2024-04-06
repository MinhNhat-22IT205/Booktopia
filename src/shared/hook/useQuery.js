import React from "react";
import { useLocation } from "react-router-dom";

export default function useQuery() {
  const { search } = useLocation();
  return React.useMemo(() => {
    return new URLSearchParams(search);
  }, [search]);
}
