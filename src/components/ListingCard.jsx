import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <div className="border rounded-lg p-4 shadow">
      <img
        src={listing.ThumbnailURL}
        alt={listing.Title}
        className="w-full h-40 object-cover rounded"
      />
      <h2 className="text-lg font-semibold">{listing.Title}</h2>
      <p>{listing.Location}</p>
      <p>
        {listing.Bedrooms} Beds | {listing.Bathrooms} Baths | ${listing.Price}
      </p>
      <Link
        to={`/listing/${listing.Id}`}
        className="block mt-2 bg-blue-500 text-white text-center py-1 rounded"
      >
        View Details
      </Link>
    </div>
  );
};

export default ListingCard;
