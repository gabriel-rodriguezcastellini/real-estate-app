import { useState } from "react";
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

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredListings = listings.filter((listing) => {
    return (
      (filters.bedrooms ? listing.bedrooms >= filters.bedrooms : true) &&
      (filters.bathrooms ? listing.bathrooms >= filters.bathrooms : true) &&
      (filters.parking ? listing.parkingSpaces >= filters.parking : true) &&
      (filters.price ? listing.price <= filters.price : true)
    );
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Real Estate Listings</h1>

      <div className="flex gap-4 my-4">
        <input
          type="number"
          name="bedrooms"
          placeholder="Min Bedrooms"
          onChange={handleFilterChange}
          className="border p-2"
        />
        <input
          type="number"
          name="bathrooms"
          placeholder="Min Bathrooms"
          onChange={handleFilterChange}
          className="border p-2"
        />
        <input
          type="number"
          name="parking"
          placeholder="Min Parking"
          onChange={handleFilterChange}
          className="border p-2"
        />
        <input
          type="number"
          name="price"
          placeholder="Max Price"
          onChange={handleFilterChange}
          className="border p-2"
        />
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {filteredListings.map((listing) => (
            <ListingCard key={listing.Id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ListingsPage;
