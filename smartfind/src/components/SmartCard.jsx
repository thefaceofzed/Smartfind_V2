import React, { useRef } from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const SmartCard = ({ formData }) => {
  const urlInputRef = useRef(null);

  const handleShareButtonClick = () => {
    // Construct a shareable URL based on the form data
    const baseUrl = "https://example.com/card/";
    const queryParams = new URLSearchParams({
      name: formData.name,
      username: formData.username,
      email: formData.email,
      number: formData.number,
      locations: formData.locations.join(","),
      facebook: formData.facebook,
      twitter: formData.twitter,
      instagram: formData.instagram,
    });
    const shareableUrl = `${baseUrl}?${queryParams.toString()}`;

    // Copy the shareable URL to the clipboard
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareableUrl);
      alert("Copied shareable link to clipboard!");
    } else {
      // Fallback for browsers that don't support Clipboard API
      urlInputRef.current.select();
      document.execCommand("copy");
      alert("Copied shareable link to clipboard!");
    }
  };

  return (
    <div className="flex justify-center bg-gray-900">
      <div className="bg-gray-900 w-96 rounded-lg px-8 py-10 mb-10 shadow-xl">
        <div className="flex justify-center mb-8">
          <img
            src={URL.createObjectURL(formData.picture)}
            alt={formData.name}
            className="w-32 h-auto rounded-full"
          />
        </div>
        <div className="text-gray-100 text-center mb-4">
          <h2 className="text-2xl font-bold">{formData.name}</h2>
          <p className="text-lg">@{formData.username}</p>
        </div>
        <div className="border-t border-b border-gray-700 py-4">
          <p className="text-gray-400 text-sm mb-1">Email:</p>
          <p className="text-gray-100">{formData.email}</p>
        </div>
        <div className="border-t border-b border-gray-700 py-4">
          <p className="text-gray-400 text-sm mb-1">Phone Number:</p>
          <p className="text-gray-100">{formData.number}</p>
        </div>
        <div className="border-t border-b border-gray-700 py-4">
          <p className="text-gray-400 text-sm mb-1">Locations:</p>
          <ul className="text-gray-100">
            {formData.locations.map((location) => (
              <li key={location}>{location}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-center mt-4">
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${formData.username}`}
            alt={`QR Code for ${formData.username}`}
            className="mr-6"
          />
          <a href={formData.facebook} target="_blank" rel="noopener noreferrer">
            <FaFacebook className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer" size={30} />
          </a>
          <a href={formData.twitter} target="_blank" rel="noopener noreferrer">
            <FaTwitter className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer" size={30} />
          </a>
          <a href={formData.instagram} target="_blank" rel="noopener noreferrer">
            <FaInstagram className="text-blue-500 hover:text-blue-700 mx-2 cursor-pointer" size={30} />
          </a>
          <button
            onClick={handleShareButtonClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-6"
          >
            Share
          </button>
        </div>
        <input
          ref={urlInputRef}
          type="text"
          defaultValue=""
          className="sr-only"
        />
      </div>
    </div>
  );
};

export default SmartCard;
