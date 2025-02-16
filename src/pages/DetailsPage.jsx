import { useParams } from "react-router-dom";
import useFetchListings from "../hooks/useFetchListings";
import { useSavedProperties } from "../context/SavedPropertiesContext";
import ContactAgentForm from "../components/ContactAgentForm";

const DetailsPage = () => {
  const { listings } = useFetchListings();
  const { id } = useParams();
  const listing = listings.find((item) => item.id === Number(id));
  const { addProperty, openModal } = useSavedProperties();

  if (!listing) return <p>Listing not found.</p>;

  const handleSaveProperty = () => {
    addProperty(listing);
    openModal();
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">{listing.title}</h1>
      <img
        src={listing.image}
        alt={listing.title}
        className="w-full h-60 object-cover rounded"
      />
      <p>{listing.description}</p>
      <p>
        {listing.bedrooms} Beds | {listing.bathrooms} Baths | ${listing.price}
      </p>

      <button
        onClick={handleSaveProperty}
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
