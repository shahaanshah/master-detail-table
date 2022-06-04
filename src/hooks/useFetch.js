import React, { useEffect, useState } from "react";

const useFetch = (url) => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null
  });

  useEffect(() => {
    const fetchData = async (url) => {
      setState({ ...state, loading: true });
      try {
        const res = await fetch(url);
        const data = await res.json();
        setState({ ...state, data, loading: false });
      } catch (error) {
        setState({ ...state, error: error.message, loading: false });
      }
    };
    fetchData(url);
  }, []);

  return { ...state };
};

export default useFetch;
