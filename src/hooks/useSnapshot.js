import { onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";

export function useSnapshot(query) {
  const [data, setData] = useState([]);

  useEffect(() => {
    let unsubscribe = null;

    const fetchData = async () => {
      unsubscribe = onSnapshot(query, (snapshot) => {
        const transformedData = snapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id, ref: doc.ref };
        });
        setData(transformedData);
      });
    };
    fetchData();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  return data;
}
