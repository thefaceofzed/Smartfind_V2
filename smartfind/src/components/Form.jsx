      import React, { useState } from "react";
      import Smartcard from "./SmartCard";
      function Form(props) {
        const [name, setName] = useState("");
        const [username, setUsername] = useState("");
        const [number, setNumber] = useState("");
        const [email, setEmail] = useState("");
        const [picture, setPicture] = useState("");
        const [location, setLocation] = useState("");
        const [locations, setLocations] = useState([]);
        const [facebook, setFacebook] = useState("");
        const [instagram, setInstagram] = useState("");
        const [twitter, setTwitter] = useState("");
        const [isSubmitted, setIsSubmitted] = useState(false);
      

        const handleLocationChange = (e) => {
          setLocation(e.target.value);
        };

        const handleLocationAdd = () => {
          if (location.trim() !== "") {
            setLocations([...locations, location]);
            setLocation("");
          }
        };

        const handleLocationDelete = (index) => {
          const newLocations = [...locations];
          newLocations.splice(index, 1);
          setLocations(newLocations);
        };

        const handlePictureChange = (e) => {
          const file = e.target.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setPicture(reader.result);
          };
        };

        const handleSubmit = (e) => {
          e.preventDefault();
        
          if (name.trim() === "") {
            alert("Please enter your name");
            return;
          }
          if (username.trim() === "") {
            alert("Please enter your username");
            return;
          }
          if (number.trim() === "") {
            alert("Please enter your number");
            return;
          }
          if (email.trim() === "") {
            alert("Please enter your email");
            return;
          }
          if (picture.trim() === "") {
            alert("Please upload your picture");
            return;
          }
          if (locations.length === 0) {
            alert("Please add at least one location");
            return;
          }
        
          const data = {
            name,
            username,
            number,
            email,
            picture,
            locations,
            facebook,
            instagram,
            twitter,
          };
        
          fetch(test='localhost/submit-form', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
            .then(response => response.json())
            .then(data => {
              console.log('Success:', data);
              props.handleUserData(data);
              props.showSmartCard(true);
              setIsSubmitted(true);
            })
            .catch((error) => {
              console.error('Error:', error);
              alert('There was an error submitting the form. Please try again later.');
        
            });
        };
        
        

        return (
          <form method='post' onSubmit ={handleSubmit}>
          <form className="bg-gray-900 p-4 rounded-lg">
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
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="johndoe"/>
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
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  <label
                    className="block text-gray-100 font-bold mb-2"
                    htmlFor="location"
                  >
                    Locations
                  </label>
                  <div className="flex">
                    <input
                      className="bg-gray-800 appearance-none border-2 border-gray-700 rounded-lg w-full py-2 px-4 text-gray-100 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
                      id="location"
                      type="text"
                      value={location}
                      onChange={handleLocationChange}
                      placeholder="Add location"
                    />
                    <button
                      className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      type="button"
                      onClick={handleLocationAdd}
                    >
                      Add
                    </button>
                  </div>
                  <div className="mt-2">
                    {locations.map((location, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-gray-700 p-2 rounded-lg mb-2"
                      >
                        <span className="text-gray-100">{location}</span>
                        <button
                          className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                          type="button"
                          onClick={() => handleLocationDelete(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-100 font-bold mb-2"
                    htmlFor="facebook"
                  >
                    Facebook
                  </label>
                  <input
                    className="bg-gray-800 appearance-none border-2 border-gray-700 rounded-lg w-full py-2 px-4 text-gray-
                    100 leading-tight focus:outline-none focus:bg-gray-700 focus:border-gray-500"
                    id="facebook"
                    type="text"
                    value={facebook}
                    onChange={(e) => setFacebook(e.target.value)}
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
                    value={twitter}
                    onChange={(e) => setTwitter(e.target.value)}
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
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                    placeholder="https://www.instagram.com/johndoe"
                    />
                    </div>
                    </form>
                  
                  
                  
                    <div className="flex justify-center">
                    <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          type="submit"
                        >
                    Save
                    </button>
                    </div>
                    </form>
                    
                    );
                    }
                  
                    export default Form;