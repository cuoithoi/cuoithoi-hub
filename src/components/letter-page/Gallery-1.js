import React, { useState } from "react";
import TitleSection from "./sub-comp/TitleSection";
import { galleryImage } from "../../utils/gallery-data";
import heartIcon from "@/assets/svg/letter-heart.svg";
import heartIconFill from "@/assets/svg/letter-heart-fill.svg";
import { Carousel } from "react-responsive-carousel";
const Gallery = ({ setModalContent, setIsOpen, setIndex }) => {
  const [selectedItem, setSelectedItem] = useState(0);
  const randomNumber = (number) => {
    return Math.floor(Math.random() * number);
  };
  return (
    <div className="py-10 px-3 section-mb layout-mw" id="gallery">
      <TitleSection title="ALBUM" />
      <div>
        <Carousel
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          selectedItem={selectedItem}
        >
          {galleryImage.map((image) => {
            return (
              <div className="gallery-image mb-3 relative">
                <img src={image.imageUrl} alt="image gallery" />
                <div className="absolute bottom-8 right-8 w-6 h-6 flex items-center justify-end cursor-pointer">
                  <span style={{ color: "white" }} className="mr-1">
                    {randomNumber(16)}
                  </span>
                  <img
                    src={randomNumber(2) === 0 ? heartIcon : heartIconFill}
                    alt="heart icon"
                    className="w-6 h-6"
                  />
                </div>
              </div>
            );
          })}
        </Carousel>
        {/* <div className='gallery-image mb-3'>
          <img src={galleryImage[0].imageUrl} alt='image gallery' />
        </div> */}
        <ul className=" gallery-container">
          {galleryImage.map((image, index) => {
            const heartRandom = Math.floor(Math.random() * 2);
            return (
              <li
                key={index}
                className="gallery-img relative"
                onClick={() => setSelectedItem(index)}
              >
                <div className="img-container">
                  <img src={image.imageUrl} alt="image gallery" />
                </div>
                <div className="absolute bottom-2 right-2 w-6 h-6 flex items-center justify-end cursor-pointer">
                  <span style={{ color: "white" }} className="mr-1">
                    {randomNumber(16)}
                  </span>
                  <img
                    src={randomNumber(2) === 0 ? heartIcon : heartIconFill}
                    alt="heart icon"
                    className="w-4 h-4"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Gallery;
