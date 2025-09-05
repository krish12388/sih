import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "600px"
};

// Replace with your Google Maps API key
const GOOGLE_MAPS_API_KEY = "YOUR_API_KEY";

const MapWithRoutes = ({ destination }) => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const [directions, setDirections] = useState(null);

  // Get live location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentPosition({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (err) => console.error(err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // Fetch routes when current position is available
  useEffect(() => {
    if (currentPosition && destination) {
      const directionsService = new window.google.maps.DirectionsService();

      directionsService.route(
        {
          origin: currentPosition,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
          drivingOptions: {
            departureTime: new Date(),
            trafficModel: "bestguess"
          }
        },
        (result, status) => {
          if (status === "OK" && result.routes) {
            // Pick the route with least traffic (simplified example: shortest duration_in_traffic)
            const bestRoute = result.routes.reduce((prev, curr) => {
              return (curr.legs[0].duration_in_traffic?.value || curr.legs[0].duration.value) <
                     (prev.legs[0].duration_in_traffic?.value || prev.legs[0].duration.value)
                     ? curr
                     : prev;
            }, result.routes[0]);

            setDirections(bestRoute);
          } else {
            console.error("Error fetching directions", result);
          }
        }
      );
    }
  }, [currentPosition, destination]);

  if (!currentPosition) return <p>Loading location...</p>;

  return (
    <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={14}
      >
        {directions && <DirectionsRenderer directions={{ routes: [directions], geocoded_waypoints: [] }} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapWithRoutes;
