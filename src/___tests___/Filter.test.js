import React from "react";

import { render, fireEvent, screen } from '@testing-library/react';
import "@testing-library/jest-dom/extend-expect";
import Filter from "../components/Filter";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  container.remove();
  container = null;
});

test('renders filter and passes in state as the correct value', async () => {

  let toggle = true;
  const setToggle = () => {
    toggle = true;
  }
  const option = '';
  const sortData = (e) => {
    expect(e).toEqual('State');
  }

  const { getByTestId } = render(
      <Filter 
        sortData={ sortData } 
        setToggle={setToggle} 
        toggle={ toggle } 
        option={ option } 
      />
  );

  const button = getByTestId('dropdown-toggle');
  fireEvent.click(button);
  const criteria = getByTestId('dropdown-state');
  fireEvent.click(criteria);
});
