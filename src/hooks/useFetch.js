import { useEffect, useState } from "react";

export default function useFetch(url) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const response = await fetch(url);
    const newData = await response.json();
    if (response.status === 200) {
      setData(newData);
    } else {
      console.error("Opps, something went wrong!");
    }
  }

  return [data, fetchData];
}
