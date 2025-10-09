import React from "react";

const SOSButton = ({ lat, lng }) => {
  const coordsText = lat && lng ? `${lat},${lng}` : "";
  const message = encodeURIComponent(
    `Emergency! Need assistance at location ${coordsText}. Open in Maps: https://www.google.com/maps/search/?api=1&query=${coordsText}`
  );

  const handleShare = async () => {
    const url = `https://www.google.com/maps/search/?api=1&query=${coordsText}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "SOS", text: decodeURIComponent(message), url });
        return;
      }
    } catch (e) {}
    window.open(`https://wa.me/?text=${message}`, "_blank");
  };

  return (
    <button className="btn btn-secondary" onClick={handleShare} disabled={!lat || !lng}>
      SOS
    </button>
  );
};

export default SOSButton;
