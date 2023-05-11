import React, { useState, useEffect } from "react";

function Map(props) {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (!window.google) {
      // Load the Google Maps API script
      const googleMapScript = document.createElement("script");
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAcYooCcItlgWmwzM0X_isXdFWSc_QjgNw`;
      window.document.body.appendChild(googleMapScript);

      googleMapScript.addEventListener("load", () => {
        initMap();
      });
    } else {
      initMap();
    }

    return () => {
      if (map) {
        map.setMap(null);
      }
    };
  }, []);

  function initMap() {
    const google = window.google;
    const mapContainer = document.getElementById("map");

    if (mapContainer && google) {
      // Get the user's current location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          // Create a new map centered on the user's location
          const newMap = new google.maps.Map(mapContainer, {
            zoom: 16,
            center: { lat: latitude, lng: longitude },
            mapTypeId: "terrain",
            disableDefaultUI: true,
          });

          // Create a new info window to display location name
          const infoWindow = new google.maps.InfoWindow();

          // Get the name of the user's current location using geocoding
          const geocoder = new google.maps.Geocoder();
          const latLng = new google.maps.LatLng(latitude, longitude);
          geocoder.geocode({ location: latLng }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                // Set the content of the info window to the location name
                const locationName = results[0].formatted_address;
                infoWindow.setContent(locationName);

                // Display the info window at the center of the map
                infoWindow.setPosition(latLng);
                infoWindow.open(newMap);
              } else {
                console.error("No results found");
              }
            } else {
              console.error(
                "Geocode was not successful for the following reason: " + status
              );
            }
          });

          // Create a new marker at the center of the map
          const newMarker = new google.maps.Marker({
            position: newMap.getCenter(),
            map: newMap,
          });

          // Add a click event listener to the map container
          newMap.addListener("click", (event) => {
            // Remove any previously created markers
            if (marker) {
              marker.setMap(null);
            }

            // Create a new marker at the clicked location
            const clickedMarker = new google.maps.Marker({
              position: event.latLng,
              map: newMap,
            });

            setMarker(clickedMarker);

            // Get the name of the location at the clicked position
            geocoder.geocode({ location: event.latLng }, (results, status) => {
              if (status === "OK") {
                if (results[0]) {
                  const locationName = results[0].formatted_address;
                  props.onLocationClick(locationName); // call the prop function to update the location name in the form input field
                } else {
                  console.error("No results found");
                }
              } else {
                console.error(
                  "Geocode was not successful for the following reason: " +
                    status
                );
              }
            });
          });

          setMap(newMap);
          setMarker(newMarker);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  return (
    <div id="map" style={{ height: "400px" }}>
      {marker && (
        <button
          onClick={() => {
            // Get the name of the location at the marker's position
            const google = window.google;
            const geocoder = new google.maps.Geocoder();
            geocoder.geocode(
              { location: marker.getPosition() },
              (results, status) => {
                if (status === "OK") {
                  if (results[0]) {
                    const locationName = results[0].formatted_address;
                    alert(locationName);
                  } else {
                    console.error("No results found");
                  }
                } else {
                  console.error(
                    "Geocode was not successful for the following reason: " +
                      status
                  );
                }
              }
            );
          }}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            fontSize: "18px",
            padding: "10px",
            background: "white",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Get Location Name
        </button>
      )}
    </div>
  );
}

export default Map;
