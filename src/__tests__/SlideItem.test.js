// SlideItem.test.js

import React from "react";
import { render } from "@testing-library/react-native";
import SlideItem from "../components/SlideItem.js";

// Mock the image component to avoid rendering actual images
jest.mock("react-native/Libraries/Image/Image", () => "Image");

describe("SlideItem", () => {
  it("renders correctly", () => {
    const item = {
      img: "path/to/mock-image.png",
      color: "Test Color",
    };

    const { getByText, getByTestId } = render(<SlideItem item={item} />);

    // Expect the text content to be rendered
    expect(getByText("Test Color")).toBeTruthy();

    // Expect the image to be rendered (mocked image)
    expect(getByTestId("slide-image")).toBeTruthy();
  });
});
