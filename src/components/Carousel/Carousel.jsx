import { useEffect, useState } from "react";
import "./Carousel.css"
import usePhotos from "./utils/usePhotos";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, fa2 } from "@fortawesome/free-solid-svg-icons";

const Carousel = () => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const photos = usePhotos();

  const handleNextBtnClick = () => {
    const nextIndex = (activeImageIndex + 1) % photos.length;
    setActiveImageIndex(nextIndex);
  };

  const handlePrevBtnClick = () => {
    const prevIndex = (activeImageIndex - 1 + photos.length) % photos.length;
    setActiveImageIndex(prevIndex);
  };

  const handleBulletClick = (index) => {
    setActiveImageIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextBtnClick()
    },5000);

    return () => {
      clearTimeout(timer);
    }
  },[activeImageIndex]);

  return !photos?.length ? (<div>Loading.....</div>) : (
    <>
      <div className="carousel-container">
        <div className="prev-btn btns" onClick={handlePrevBtnClick}> 
          <FontAwesomeIcon icon={faCircleArrowLeft} size="2x" />
        </div>
          {photos.map((photo, index) => (
              <img className = {"carousel-img " +
                (activeImageIndex === index ? "block" : "d-none") 
              }
                key = {photo?.id}
                alt= {photo?.alt_description}
                src = {photo?.urls?.regular}
              />
          ))}
        <div className="next-btn btns" onClick={handleNextBtnClick}>
          <FontAwesomeIcon icon={faCircleArrowRight} size="2x"/>
        </div>
      </div>
      <div className="bullet-container">
        {photos.map((_, index) => (
          <div
            className={"active-bullet " + (activeImageIndex === index ? "active" : "")}
            key={index}
            onClick={() => handleBulletClick(index)}
          ></div>
        ))}
      </div>
    </>
  )
};

export default Carousel;