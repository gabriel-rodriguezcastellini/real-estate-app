import React, { useState, useEffect, useMemo } from "react";
import useFetchListings from "../hooks/useFetchListings";
import ListingCard from "../components/ListingCard";

const ListingsPage = () => {
  const { listings, loading } = useFetchListings();

  const [filters, setFilters] = useState({
    bedrooms: "",
    bathrooms: "",
    parking: "",
    price: "",
  });

  const [appliedFilters, setAppliedFilters] = useState({
    bedrooms: "",
    bathrooms: "",
    parking: "",
    price: "",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const handleSearchClick = () => {
    setAppliedFilters(filters);
  };

  const generateOptions = (field, start = 1) => {
    if (!listings || listings.length === 0) return [];
    const numericValues = listings.map((item) => {
      const raw = item[field];
      const val = raw ? parseInt(raw.toString().trim(), 10) : 0;
      return isNaN(val) ? 0 : val;
    });
    const maxVal = Math.max(...numericValues);
    if (maxVal < start) return [];
    return Array.from({ length: maxVal - start + 1 }, (_, i) => i + start);
  };

  const bedroomOptions = generateOptions("Bedrooms", 1);
  const bathroomOptions = generateOptions("Bathrooms", 1);
  const parkingOptions = generateOptions("Parking", 1);

  const computedMaxPrice = useMemo(() => {
    if (!listings || listings.length === 0) return 0;
    return listings.reduce((max, item) => {
      const raw = item["Sale Price"];
      const price = raw ? parseInt(raw.toString().trim(), 10) : 0;
      return price > max ? price : max;
    }, 0);
  }, [listings]);

  useEffect(() => {
    if (!loading && filters.price === "") {
      const initialPrice = computedMaxPrice.toString();
      setFilters((prev) => ({ ...prev, price: initialPrice }));
      setAppliedFilters((prev) => ({ ...prev, price: initialPrice }));
    }
  }, [loading, computedMaxPrice, filters.price]);

  const filteredListings = listings.filter((item) => {
    const bedroomsFilter = appliedFilters.bedrooms
      ? parseInt(appliedFilters.bedrooms, 10)
      : null;
    const bathroomsFilter = appliedFilters.bathrooms
      ? parseInt(appliedFilters.bathrooms, 10)
      : null;
    const parkingFilter = appliedFilters.parking
      ? parseInt(appliedFilters.parking, 10)
      : null;
    const priceFilter = appliedFilters.price
      ? parseInt(appliedFilters.price, 10)
      : null;

    const matchBedrooms = bedroomsFilter
      ? parseInt(item["Bedrooms"], 10) >= bedroomsFilter
      : true;
    const matchBathrooms = bathroomsFilter
      ? parseInt(item["Bathrooms"], 10) >= bathroomsFilter
      : true;
    const matchParking = parkingFilter
      ? parseInt(item["Parking"], 10) >= parkingFilter
      : true;
    const matchPrice = priceFilter
      ? parseInt(item["Sale Price"], 10) <= priceFilter
      : true;

    return matchBedrooms && matchBathrooms && matchParking && matchPrice;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading listings...</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-3xl font-bold mb-6">Real Estate Listings</h1>

      <div
        className="gap-6"
        style={{
          display: "grid",
          gridTemplateColumns: "250px 1fr",
        }}
      >
        <div className="bg-white p-4 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Filters</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="bedrooms" className="block font-medium mb-1">
                Min. Bedrooms
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded w-full p-2"
              >
                {bedroomOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="bathrooms" className="block font-medium mb-1">
                Min. Bathrooms
              </label>
              <select
                id="bathrooms"
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded w-full p-2"
              >
                {bathroomOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="parking" className="block font-medium mb-1">
                Min. Parking
              </label>
              <select
                id="parking"
                name="parking"
                value={filters.parking}
                onChange={handleFilterChange}
                className="border border-gray-300 rounded w-full p-2"
              >
                {parkingOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="price" className="block font-medium mb-1">
                Max. Sale Price: ${filters.price}
              </label>
              <input
                type="range"
                id="price"
                name="price"
                min="0"
                max={computedMaxPrice}
                value={filters.price}
                onChange={handleFilterChange}
                className="w-full"
              />
            </div>

            <button
              onClick={handleSearchClick}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded"
            >
              Search
            </button>
          </div>
        </div>

        <div>
          {filteredListings.length === 0 ? (
            <div className="flex items-center justify-center border border-gray-300 rounded-md p-4 min-h-[300px]">
              <p className="text-gray-500">
                No listings found for the selected filters.
              </p>
            </div>
          ) : (
            <div
              className="grid grid-cols-3 gap-6"
              style={{ gridAutoRows: "1fr" }}
            >
              {filteredListings.map((listing) => (
                <ListingCard key={listing.Id} listing={listing} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingsPage;
