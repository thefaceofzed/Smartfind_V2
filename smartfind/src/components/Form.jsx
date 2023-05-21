import React, { useState, useEffect } from "react";
import Map from "./Map";
import SmartCard from "./SmartCard";

const Form = (props) => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const locationName = urlSearchParams.get("locationName") || "";
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Your code for rendering the map goes here

    setMapLoaded(true);
  }, []);

  const initialFormData = {
    name: "",
    username: "",
    number: "",
    email: "",
    picture: null,
    facebook: "",
    twitter: "",
    instagram: "",
    locations: [],
    locationName: locationName || "", // Use the passed-in locationName or an empty string
  };
  

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSmartCard, setShowSmartCard] = useState(false);

  useEffect(() => {
    setFormData({ ...formData, locationName: locationName });
  }, [locationName]);

  const handleSubmitForm = async (e) => {
    e.preventDefault();
  
    // Check if any field is empty
    const isEmpty =
      !formData.name ||
      !formData.username ||
      !formData.number ||
      !formData.email ||
      !formData.picture ||
      !formData.facebook ||
      !formData.twitter ||
      !formData.instagram;
  
    if (isEmpty) {
      window.alert("Please fill out all fields.");
      return;
    }
  
    // Add locationName to formData
    const updatedFormData = {
      ...formData,
      locationName: locationName,
    };
  
    setIsSubmitted(true);
    setShowSmartCard(true);
    setFormData(updatedFormData);
  };
  
  
  

  const handlePictureChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      picture: e.target.files[0],
    }));
  };

  const handleLocationClick = (location) => {
    const updatedFormData = {
      ...formData,
      locationName: location,
    };
  
    setFormData(updatedFormData);
  };
  
  
  return (
    <>
      {showSmartCard === false ? (
        
        <form method="post" onSubmit={handleSubmitForm}>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">
              Enter your information
            </h2>
  
            <div style={{ height: "400px", marginTop: "20px" }}>
              <Map
                locationName={formData.locationName}
                onLocationClick={handleLocationClick}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 font-bold mb-2"
                htmlFor="location"
              >
                My Location
              </label>
              <input
                className="bg-gray-800 appearance-none border-2 border-gray-700 rounded-lg w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
                id="location"
                type="text"
                value={formData.locationName}
                onChange={(e) =>
                  setFormData({ ...formData, locationName: e.target.value })
                }
                placeholder="ENTER YOUR LOCATION"
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-100 font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="bg-gray-800 appearance-none border-2 border-gray-700 rounded-lg w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="ENTER YOUR NAME"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 font-bold mb-2"
                htmlFor="username"
              >
                Username
              </label>
              <input
                className="bg-gray-800 appearance-none border-2 border-gray-700 rounded-lg w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                placeholder=" please enter a valid username"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 font-bold mb-2"
                htmlFor="number"
              >
                Phone Number
              </label>
              <input
                className="bg-gray-800 appearance-none border-2 border-gray-700 rounded-lg w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
                id="number"
                type="tel"
                value={formData.number}
                onChange={(e) =>
                  setFormData({ ...formData, number: e.target.value })
                }
                placeholder="+212 (please enter  a valid number)"
              />
            </div>
            
            <div className="mb-4">
              <label
                className="block text-gray-100 font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="bg-gray-800 appearance-none border-2 border-gray-700 rounded-lg w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="smartcard@example.com"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 font-bold mb-2"
                htmlFor="picture"
              >
                Picture
              </label>
              <input
                className="text-gray-100"
                id="picture"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={handlePictureChange}
              />
            </div>
           

            <div className="mb-4">
              <label
                className="block text-gray-100 font-bold mb-2"
                htmlFor="facebook"
              >
                Facebook
              </label>
              <input
                className="bg-gray-800 appearance-none border-2 border-gray-700 rounded-lg w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
                id="facebook"
                type="text"
                value={formData.facebook}
                onChange={(e) =>
                  setFormData({ ...formData, facebook: e.target.value })
                }
                placeholder="https://www.facebook.com/ismail"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 font-bold mb-2"
                htmlFor="twitter"
              >
                Twitter
              </label>
              <input
                className="bg-gray-800 appearance-none border-2 border-gray-700 rounded-lg w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
                id="twitter"
                type="text"
                value={formData.twitter}
                onChange={(e) =>
                  setFormData({ ...formData, twitter: e.target.value })
                }
                placeholder="https://twitter.com/ismail"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-100 font-bold mb-2"
                htmlFor="instagram"
              >
                Instagram
              </label>
              <input
                className="bg-gray-800 appearance-none border-2 border-gray-700 rounded-lg w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
                id="instagram"
                type="text"
                value={formData.instagram}
                onChange={(e) =>
                  setFormData({ ...formData, instagram: e.target.value })
                }
                placeholder="https://www.instagram.com/ismail"
              />
            </div>
            
            <div className="flex justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                Save
              </button>
            </div>
          </div>
          
        </form>
        
      ) : (
        <SmartCard formData={formData} locationName={formData.locationName}/>
      )}
    </>
  );
};

export default Form;
