import React from "react";

const Ticks = (props: {
  ticksTitle: string;
  ticks: { text: string; choosed: boolean }[];
  handleTickClick: Function;
}) => {
  return (
    <div className="ticks">
      <h4>{props.ticksTitle}</h4>

      <ul className="tick-list">
        {props.ticks.map((tick, i) => (
          <li key={i} className="tick">
            <span
              className={tick.choosed ? "tick-box ticked" : "tick-box unticked"}
              onClick={() => props.handleTickClick(tick)}
            ></span>{" "}
            {tick.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ticks;
