import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ContactAgentForm from "../components/ContactAgentForm";
import { useSavedProperties } from "../context/SavedPropertiesContext";
import { FaRegHeart } from "react-icons/fa";

const DetailsPage = ({ listings }) => {
  const { id } = useParams();
  const listing = listings.find((item) => item.Id.toString() === id);

  const { addProperty } = useSavedProperties();

  const [savedSuccess, setSavedSuccess] = useState("");

  if (!listing) {
    return <p className="text-center mt-8">Listing not found.</p>;
  }

  const formatDate = (dateString) => {
    const dateObj = new Date(dateString);
    const options = { month: "short", day: "numeric", year: "numeric" };
    return dateObj.toLocaleDateString("en-US", options);
  };

  const handleSaveProperty = () => {
    addProperty(listing);

    setSavedSuccess(`"${listing.Title}" has been saved!`);

    setTimeout(() => {
      setSavedSuccess("");
    }, 3000);
  };

  return (
    <div className="w-full px-4 py-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-2/3">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-2xl font-bold">{listing.Title}</h1>
            <p className="text-2xl font-semibold text-blue-700">
              ${listing["Sale Price"].toLocaleString()}
            </p>
          </div>
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">{listing.Location}</p>
            <p className="text-sm text-gray-500">
              Date Listed: {formatDate(listing.DateListed)}
            </p>
          </div>
          <div className="mb-4">
            <img
              src={listing.PictureURL}
              alt={listing.Title}
              className="w-full object-cover rounded-md"
            />
          </div>
          <div className="border rounded-md p-4 mb-4">
            <div className="grid grid-cols-5 gap-4 text-center">
              <div>
                <p className="text-xl font-bold">{listing.Bedrooms}</p>
                <p className="uppercase text-xs text-gray-600">Bed</p>
              </div>
              <div>
                <p className="text-xl font-bold">{listing.Bathrooms}</p>
                <p className="uppercase text-xs text-gray-600">Bath</p>
              </div>
              <div>
                <p className="text-xl font-bold">{listing.Parking}</p>
                <p className="uppercase text-xs text-gray-600">Parking</p>
              </div>
              <div>
                <p className="text-xl font-bold">{listing.Sqft}</p>
                <p className="uppercase text-xs text-gray-600">Sqft</p>
              </div>
              <div>
                <p className="text-xl font-bold">{listing.YearBuilt}</p>
                <p className="uppercase text-xs text-gray-600">Year Built</p>
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed">{listing.Description}</p>
        </div>

        <div className="md:w-1/3 flex flex-col gap-4">
          {savedSuccess && (
            <p className="text-green-600 font-semibold">{savedSuccess}</p>
          )}

          <button
            onClick={handleSaveProperty}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 self-end flex items-center"
          >
            <FaRegHeart className="mr-2" />
            Save Property
          </button>

          <div className="bg-white p-4 rounded-md shadow-md">
            <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
            <ContactAgentForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
