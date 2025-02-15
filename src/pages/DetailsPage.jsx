import { useParams } from "react-router-dom";
import useFetchListings from "../hooks/useFetchListings";

const DetailsPage = () => {
  const { listings } = useFetchListings();
  const { id } = useParams();
  const listing = listings.find((item) => item.id === Number(id));

  if (!listing) return <p>Listing not found.</p>;

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

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Contact Agent</h2>
        <form className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Full Name"
            required
            className="border p-2"
          />
          <input
            type="email"
            placeholder="Email"
            required
            className="border p-2"
          />
          <input
            type="tel"
            placeholder="Phone"
            required
            className="border p-2"
          />
          <textarea
            placeholder="Comments"
            required
            className="border p-2"
          ></textarea>
          <button className="bg-green-500 text-white p-2 rounded">
            Contact Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default DetailsPage;
