import React from "react";
import { Box as BoxObj } from "../../../interfaces";

// Components
import Box from "./Box";

const Boxes = (props: { boxes: BoxObj[] }) => {
  return (
    <div className="boxes">
      {props.boxes.map((box, i) => (
        <Box
          key={i}
          extraClass={box.extraClass}
          icon={box.icon}
          text={box.text}
          total={box.total}
        />
      ))}
    </div>
  );
};

export default Boxes;
