import React, { useEffect, useMemo, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import useRides from "../../../hooks/useRides";

const SeeLocation = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  //const [latitude, setLatitude] = useState(null);
  //const [longitude, setLongitude] = useState(null);
  const { Latitude, Longitude, setLatitude, setLongitude } = useRides();
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  useMemo(() => {
    if (Latitude && Longitude) {
      setMarker({
        lat: Latitude,
        lng: Longitude,
      });
    }
  }, [Latitude, Longitude]);
  const handleMapLoad = (map) => {
    setMap(map);
  };
  useMemo(() => {
    console.log(marker);
    // eslint-disable-next-line
  }, [marker]);

  const handleMarkerClick = (event) => {
    if (map) {
      setMarker({
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      });
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDlUISpUqcpu-XsYyDttW5SSole62L19Qg">
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={{ lat: Latitude, lng: Longitude }} // Default center
        zoom={12} // Default zoom level
        onLoad={handleMapLoad}
        onClick={handleMarkerClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default SeeLocation;
