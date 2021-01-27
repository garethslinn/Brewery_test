import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import List from "../components/List";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders user data", async () => {
  const mockData = [{
      address_2: null, 
      address_3: null, 
      brewery_type: "micro", 
      city: "Birmingham",
      country: "United States",
      county_province: null,
      created_at: "2018-07-24T01:32:47.255Z",
      id: 2,
      latitude: "33.524521",
      longitude: "-86.774322",
      name: "Avondale Brewing Co",
      phone: "2057775456",
      postal_code: "35222-1932",
      state: "Alabama",
      street: "201 41st St S",
      updated_at: "2018-08-23T23:19:57.825Z",
      website_url: "http://www.avondalebrewing.com"
    },
    
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(mockData)
    })
  )];

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<table><List list={ mockData } /></table>, container);
  });

  expect(container.querySelector("[data-testid='name-0']").textContent).toBe("Avondale Brewing Co");
  expect(container.querySelector("[data-testid='type-0']").textContent).toBe("micro");
  expect(container.querySelector("[data-testid='state-0']").textContent).toBe("Alabama");

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});