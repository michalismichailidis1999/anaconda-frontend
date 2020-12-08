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
      detail: "+30 697 808 6475",
      breakLineString: "23810 83077",
    },
    {
      icon: "fas fa-envelope",
      detail: "anakonta2011@hotmail.com",
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
