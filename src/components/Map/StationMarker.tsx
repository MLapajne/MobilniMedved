import React from "react";
import { Marker, Popup } from "react-map-gl";

const StationMarker = ({ item, index, showPopup, setShowPopup }: any) => {
  return (
    <>
      <Marker
        longitude={item.lng}
        latitude={item.lat}
        anchor="bottom"
        key={index}
        onClick={() => {
          setShowPopup({ ...showPopup, [index]: true });
          console.log("Marker clicked");
        }}
        //popup={}
      >
        <div
          style={{
            width: 0,
            height: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              boxSizing: "border-box",
              width: "25px",
              height: "25px",
              border: "2px solid white",
              borderRadius: "0 70% 70%",
              transform: "rotate(-135deg)",
              backgroundColor: item.fixed ? "red" : "blue",
              transformOrigin: "0 0",
              cursor: "pointer",
            }}
          >
            <b
              style={{
                transform: "rotate(135deg)",
                color: "white",
                fontSize: "17px",
              }}
            >
              {item.people}
            </b>
          </div>
        </div>
        {showPopup[index] && (
          <Popup
            latitude={item.lat}
            longitude={item.lng}
            closeButton={true}
            closeOnClick={true}
            anchor="bottom"
            offset={25}
            maxWidth="200px"
            onClose={() => setShowPopup({ ...showPopup, [index]: false })}
          >
            <h3 className="text-center text-custom-blue">You are here</h3>
          </Popup>
        )}
      </Marker>
    </>
  );
};

export default StationMarker;
