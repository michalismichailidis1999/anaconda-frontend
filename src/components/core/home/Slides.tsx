import React, { useState, useEffect } from "react";
import gsap, { TimelineLite, Power4 } from "gsap";
import image1 from "../../../images/slides/slide1.png";
import image2 from "../../../images/slides/slide2.png";
import { connect } from "react-redux";
import { State, AppState } from "../../../interfaces";
import { setActiveSlide } from "../../../actions/app";

gsap.registerPlugin();

const Slides = (props: { appState: AppState; setActiveSlide: Function }) => {
  const [slide2TL] = useState(new TimelineLite({ paused: true }));
  const [active, setActive] = useState(1);
  const [animationRunAtLeastOnce, setAnimationRunAtLeastOnce] = useState(false);

  let animate = () => {};

  useEffect(() => {
    props.setActiveSlide(1);

    animate = () => {
      if (active === 1) {
        slide2TL.play();
        props.setActiveSlide(2);
      } else {
        slide2TL.reverse();
        props.setActiveSlide(1);
      }
    };

    slide2TL.fromTo(
      ".slide2",
      1,
      {
        opacity: 0,
        ease: Power4,
      },
      {
        opacity: 1,
      }
    );

    setTimeout(() => animate(), 5000);
    setAnimationRunAtLeastOnce(true);

    return () => {
      animate = () => {};
      slide2TL.kill();
    };
  }, []);

  useEffect(() => {
    if (animationRunAtLeastOnce) {
      animate = () => {
        if (active === 1) {
          slide2TL.play();
          props.setActiveSlide(2);
        } else {
          slide2TL.reverse();
          props.setActiveSlide(1);
        }
      };

      setTimeout(() => animate(), 5000);
    }
  }, [active]);

  useEffect(() => {
    setActive(props.appState.activeSlide);
  }, [props.appState]);

  return (
    <div className="slides">
      <div className="slide-img">
        <img
          src={image1}
          alt="Slide 1"
          className={active === 1 ? "slide1" : "slide1 not-active"}
        />
        <img src={image2} alt="Slide 1" className="slide2" />
      </div>

      <div className="img-navigation">
        <div
          className={active === 1 ? "img-navigator active" : "img-navigator"}
        ></div>
        <div
          className={active === 2 ? "img-navigator active" : "img-navigator"}
        ></div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  appState: state.app,
});

export default connect(mapStateToProps, {
  setActiveSlide,
})(Slides);
