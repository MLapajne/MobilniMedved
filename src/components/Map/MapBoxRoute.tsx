import React from "react";
import Map, {
  AttributionControl,
  GeolocateControl,
  Layer,
  Marker,
  NavigationControl,
  Popup,
  Source,
} from "react-map-gl";
function MapBoxRoute(props: any) {
  return (
    <Source
      type="geojson"
      data={{
        type: "Feature",
        geometry: { type: "LineString", coordinates: props.coordinates },
        properties: {},
      }}
    >
      <Layer
        type="line"
        layout={{ "line-join": "round", "line-cap": "square" }}
        paint={{
          "line-color": props.color,
          "line-width": 4,
          "line-opacity": 0.8,
        }}
      />
    </Source>
  );
}

export default MapBoxRoute;
