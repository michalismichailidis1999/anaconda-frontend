import React, { useState, useEffect } from "react";
import { TimelineLite, Power4 } from "gsap";

const DetailsLeft = (props: {
  productImages: string[];
  onSale: boolean;
  oldPrice: number;
  newPrice: number;
}) => {
  const [imagesThatExists] = useState([
    true,
    props.productImages[1] !== "" ? true : false,
    props.productImages[2] !== "" ? true : false,
    props.productImages[3] !== "" ? true : false
  ]);

  const [images] = useState([
    imagesThatExists[0]
      ? props.productImages[0]
      : null,
    imagesThatExists[1]
      ? props.productImages[1]
      : null,
    imagesThatExists[2]
      ? props.productImages[2]
      : null,
    imagesThatExists[3]
      ? props.productImages[3]
      : null
  ]);

  const [choosedImage, setChoosedImage] = useState(0);
  const [imgTL] = useState(new TimelineLite({ paused: true }));

  useEffect(() => {
    imgTL
      .to("#img", 0.4, { opacity: 0, ease: Power4 })
      .to("#img", 0.4, { opacity: 1, ease: Power4 });
  }, []);

  const animateImage = () => {
    imgTL.play();
    imgTL.restart();
  };

  return (
    <div className="details-left">
      <div className="img">
        <img
          src={`${images[choosedImage]}`}
          alt={`Product View ${choosedImage}`}
          id="img"
        />

        {props.onSale && (
          <div className="on-sale-tag">
            <span>
              -
              {Math.floor(
                ((props.oldPrice - props.newPrice) / props.oldPrice) * 100
              )}
              %
            </span>
          </div>
        )}
      </div>

      <div className="other-images">
        {images.map((image, i) =>
          imagesThatExists[i] ? (
            <div
              className={i === choosedImage ? "small-img choosed" : "small-img"}
              key={i}
              onClick={() => {
                if (!imgTL.isActive()) {
                  setChoosedImage(i);
                  animateImage();
                }
              }}
            >
              <img src={`${image}`} alt="Product" />
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </div>
  );
};

export default DetailsLeft;
