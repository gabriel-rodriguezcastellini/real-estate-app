import { useState, useEffect } from "react";
import listingsData from "../data/listings.json";

const useFetchListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setListings(listingsData);
      setLoading(false);
    }, 1000);
  }, []);

  return { listings, loading };
};

export default useFetchListings;
