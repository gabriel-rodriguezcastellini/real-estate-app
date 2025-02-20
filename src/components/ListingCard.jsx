import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => {
  return (
    <div className="border rounded-lg p-4 shadow flex flex-col h-full min-w-[300px]">
      <img
        src={listing.ThumbnailURL}
        alt={listing.Title}
        className="w-full h-40 object-cover rounded"
      />

      <h2 className="text-lg font-semibold mt-2">{listing.Title}</h2>
      <p className="text-gray-600">{listing.Location}</p>

      <p className="mt-1">
        {listing.Bedrooms} Beds | {listing.Bathrooms} Baths
      </p>
      <p className="font-semibold">${listing["Sale Price"]}</p>

      <div className="mt-auto">
        <Link
          to={`/listing/${listing.Id}`}
          className="block mt-4 bg-blue-500 text-white text-center py-1 rounded hover:text-white"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ListingCard;
