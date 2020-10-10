import React from "react";

const OrderStatus = (props: {
  defaultOption: { value: string; text: string };
  options: { value: string; text: string }[];
  handleSelectChange: Function;
}) => {
  return (
    <div className="order-status">
      <h4>Κατάσταση Παραγγελίας</h4>

      <select
        value={props.defaultOption.value}
        onChange={e => props.handleSelectChange(e.target.value)}
      >
        {props.options.map((opt, i) => (
          <option key={i} value={opt.value}>
            {opt.text}
          </option>
        ))}
      </select>
    </div>
  );
};

export default OrderStatus;
