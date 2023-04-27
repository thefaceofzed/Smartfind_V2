import React, { useState, useEffect } from "react";
import SmartCard from "./SmartCard";

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
};

let map;
const google = window.google;
async function initMap() {
  try {
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");

    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  } catch (error) {
    console.log(error);
  }
}


const Form = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitted, setIsSubmitted] = useState(false);
  window.initMap = initMap;
  useEffect(() => {
    window.initMap();
  }, []);

  const handleAddLocation = () => {
    window.location.href = "index.html";
  };

  const handleDeleteLocation = (index) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      locations: prevFormData.locations.filter((_location, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send form data to server using fetch or axios here
      const response = await fetch("/api/save-form", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form data:", error);
    } finally {
      setIsSubmitted(true); // Always set isSubmitted to true after try-catch block
    }
  };

  const handlePictureChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      picture: e.target.files[0],
    }));
  };

  return (
    <>
      {!isSubmitted ? (
        <form method="post" onSubmit={handleSubmit}>
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">
              Enter your information
            </h2>
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
                placeholder="John Doe"
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
                placeholder="johndoe"
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
                placeholder="123-456-7890"
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
                placeholder="johndoe@example.com"
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
  <button
    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    type="button"
    onClick={() => window.location.href = 'index.html'}
  >
    Add Location
  </button>
</div>


            {formData.locations.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-100 mb-2">
                  Your Locations
                </h3>
                <ul>
                  {formData.locations.map((location, index) => (
                    <li key={index}>
                      {location}{" "}
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                        type="button"
                        onClick={() => handleDeleteLocation(index)}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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
                placeholder="https://www.facebook.com/johndoe"
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
                placeholder="https://twitter.com/johndoe"
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
                placeholder="https://www.instagram.com/johndoe"
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
        <SmartCard formData={formData} />
      )}
    </>
  );
};

export default Form;
