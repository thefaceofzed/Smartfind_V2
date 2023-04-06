import React from 'react';
import QRCode from 'react-qr-code';

const SmartCard = ({ userData, showSmartCard,onClose }) => {
  const { name, username, number, email, picture, location, facebook, instagram, twitter } = userData;

  return (
    <>
      {showSmartCard && (
        <div className="bg-gray-700 w-96 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-6">User Information</h2>
          <div className="flex mb-4">
            <img src={picture} alt="Profile" className="w-20 h-20 rounded-full mr-4" />
            <div>
              <p className="text-xl font-bold">{name}</p>
              <p className="text-gray-400">@{username}</p>
            </div>
          </div>
          <p className="mb-4">Number: {number}</p>
          <p className="mb-4">Email: {email}</p>
          <p className="mb-4">Location: {location}</p>
          <div className="mb-4">
            <p className="text-sm text-gray-400 mb-1">Social Media:</p>
            <div className="flex">
              <a href={facebook} target="_blank" rel="noopener noreferrer" className="mr-2">
                <i className="fab fa-facebook-square text-blue-500 hover:text-blue-700"></i>
              </a>
              <a href={instagram} target="_blank" rel="noopener noreferrer" className="mr-2">
                <i className="fab fa-instagram text-pink-500 hover:text-pink-700"></i>
              </a>
              <a href={twitter} target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter-square text-blue-400 hover:text-blue-600"></i>
              </a>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-1">QR Code:</p>
            <div className="bg-white p-4 rounded">
              <QRCode value={email} size={128} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SmartCard;
