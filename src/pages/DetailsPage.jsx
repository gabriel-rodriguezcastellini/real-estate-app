import { useParams } from "react-router-dom";
import useFetchListings from "../hooks/useFetchListings";
import { useSavedProperties } from "../context/SavedPropertiesContext";
import ContactAgentForm from "../components/ContactAgentForm";

const DetailsPage = () => {
  const { listings, loading } = useFetchListings();
  const { id } = useParams();

  if (loading) return <p>Loading...</p>;

  const listing = listings.find((item) => item.Id.toString() === id);

  if (!listing) return <p>Listing not found.</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{listing.Title}</h1>
      <img
        src={listing.PictureURL}
        alt={listing.Title}
        className="w-full h-60 object-cover rounded"
      />
      <p>{listing.Description}</p>
      <p>
        {listing.Bedrooms} Beds | {listing.Bathrooms} Baths | ${listing.Price}
      </p>

      <button
        onClick={() => {}}
        className="bg-yellow-500 text-white p-2 rounded mt-4"
      >
        Save Property
      </button>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Contact Agent</h2>
        <ContactAgentForm />
      </div>
    </div>
  );
};

export default DetailsPage;
