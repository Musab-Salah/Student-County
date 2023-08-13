import React, { useMemo, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

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
        center={{ lat: 31.9428165, lng: 35.2571781 }} // Default center
        zoom={8} // Default zoom level
        onLoad={handleMapLoad}
        onClick={handleMarkerClick}
      >
        {marker && <Marker position={marker} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
