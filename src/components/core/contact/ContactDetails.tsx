import React, { useState } from "react";

// Components
import DetaiBox from "./DetailBox";

const ContactDetails = () => {
  const [boxes] = useState([
    {
      icon: "fas fa-map-marker-alt",
      detail: "Σκύδρα ,",
      breakLineString: "Μεγάλου Αλεξάνδρου 48",
    },
    {
      icon: "fas fa-phone",
      detail: "+30 690 812 3254",
      breakLineString: "23810 83077",
    },
    {
      icon: "fas fa-envelope",
      detail: "john@gmail.com",
      breakLineString: "",
    },
  ]);
  return (
    <div className="contact-details">
      <h4>Τα στοιχεία μας</h4>

      {boxes.map((box, i) => (
        <DetaiBox detailBox={box} key={i} />
      ))}
    </div>
  );
};

export default ContactDetails;
