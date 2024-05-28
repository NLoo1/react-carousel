import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import TEST_IMAGES from "./_testCommon.js";

// smoke test

// Added TEST_IMAGES to ensure Carousel renders.
// Alternatively, add default props to Carousel.

it("renders without crashing", function() {
  render(<Carousel photos={TEST_IMAGES} />);
});

// snapshot test

it("matches snapshot", function() {
  const {asFragment} = render(<Carousel photos={TEST_IMAGES} />);
  expect(asFragment()).toMatchSnapshot();
});


it("works when you click on the right arrow", function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );
  // expect the first image to show, but not the second
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();
});


// PART 3: BUG! Left Arrow **********
it('works when you click on the left arrow on the second image', function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  // move forward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).not.toBeInTheDocument();
  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();

})

// PART 4: BUG! Exhausting the image array *****
it('should be missing left arrow on first image', function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector(".bi-arrow-left-circle")
  ).not.toBeInTheDocument();

})

it('should be missing right arrow on last image', function() {
  const { container } = render(
    <Carousel
      photos={TEST_IMAGES}
      title="images for testing"
    />
  );

  expect(
    container.querySelector('img[alt="testing image 1"]')
  ).toBeInTheDocument();
  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).toBeInTheDocument();

  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  expect(
    container.querySelector('img[alt="testing image 2"]')
  ).toBeInTheDocument();

  fireEvent.click(rightArrow);

  expect(
    container.querySelector('img[alt="testing image 3"]')
  ).toBeInTheDocument();

  expect(
    container.querySelector(".bi-arrow-right-circle")
  ).not.toBeInTheDocument();


})