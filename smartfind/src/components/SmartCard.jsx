import React, { useRef } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaDownload } from "react-icons/fa";

import Map from "./Map";

const SmartCard = (props) => {
  const { formData } = props;
  const { locationName } = formData;
  const qrCodeRef = useRef(null);

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
      latitude: formData.latitude,
      longitude: formData.longitude,
      picture: URL.createObjectURL(formData.picture),
    });
    const shareableUrl = `${baseUrl}?${queryParams.toString()}`;

    // Open a share dialog for Facebook, Twitter or email depending on which button was clicked
    const socialMediaOptions = [
      { name: "facebook", icon: FaFacebook },
      { name: "twitter", icon: FaTwitter },
      { name: "instagram", icon: FaInstagram },
      { name: "email", icon: FaEnvelope }
    ];
    const selectedOption = window.prompt(
      "Choose how to share your SmartCard:\n\n1. Facebook\n2. Twitter\n3. Instagram\n4. Email\n5. Download QR Code\n\nEnter 1, 2, 3, 4, or 5:"
    );
    if (selectedOption === "1") { // Share on Facebook
      const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableUrl)}`;
      window.open(facebookUrl, "_blank");
    } else if (selectedOption === "2") { // Share on Twitter
      const tweetText = encodeURIComponent(`Check out my SmartCard - ${shareableUrl}`);
      const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
      window.open(twitterUrl, "_blank");
    } else if (selectedOption === "3") { // Share on Instagram
      const instagramUrl = `https://www.instagram.com/?url=${encodeURIComponent(shareableUrl)}`;
      window.open(instagramUrl, "_blank");
    } else if (selectedOption === "4") { // Share by email
      const emailSubject = encodeURIComponent(`${formData.name}'s SmartCard`);
      const emailBody = encodeURIComponent(`Check out ${formData.name}'s SmartCard: ${shareableUrl}`);
      window.location.href = `mailto:?subject=${emailSubject}&body=${emailBody}`;
    } else if (selectedOption === "5") { // Download QR code
      const qrCodeImage = qrCodeRef.current.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = qrCodeImage;
      downloadLink.download = `${formData.username}-qrcode.png`;
      downloadLink.click();
    }
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg">
      <div className="max-w-6xl w-full rounded-lg px-8 py-10 mb-10 shadow-xl">
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
          <p className="text-gray-400 text-sm mb-1">Location Name:</p>
          <p className="text-gray-100">8Q34+F27, Safi, Maroc</p>
        </div>
        <div className="flex justify-center mt-4">
          <canvas
            ref={qrCodeRef}
            style={{ display: "none" }}
            width="0"
            height="0"
          />
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
              window.location.href
            )}`}
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
          <button
            onClick={() => {
              const qrCodeImage = qrCodeRef.current.toDataURL("image/png");
              const downloadLink = document.createElement("a");
              downloadLink.href = qrCodeImage;
              downloadLink.download = `${formData.username}-qrcode.png`;
              downloadLink.click();
            }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-6"
          >
            <FaDownload className="inline-block mr-2" />
            Download QR Code
          </button>
        </div>
        <div className="mt-8 flex justify-center items-center">
          {/* Render the Map component with separate props for latitude and longitude */}
          <div id="map" style={{ height: "500px", width: "80%" }}>
            <Map latitude={formData.latitude} longitude={formData.longitude} />
          </div>
        </div>

        {/* Remove input element from JSX as it's no longer needed */}
      </div>
    </div>
  );
};

export default SmartCard;
