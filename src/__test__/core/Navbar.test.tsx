import React from "react";
import { render, fireEvent, waitForElement } from "@testing-library/react";

import Navbar, { Props } from "../../components/core/Navbar";

function renderNavbar(props: Partial<Props> = {}) {
  const defaultProps: Props = {
    paymentBegin: false,
    paymentEnd: false,
    cart: {
      cart: [],
      totalItems: 0,
      totalPrice: 0,
      loading: false
    }
  };

  return render(<Navbar {...defaultProps} {...props} />);
}

describe("<Navbar/>", () => {
  test("Should display the navbar", async () => {
    const { findByTestId } = renderNavbar();

    const navbar = await findByTestId("navbar");
  });
});
