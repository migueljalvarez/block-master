import React, { useEffect } from "react";
import AliceCarousel from "react-alice-carousel";
import { Container } from "react-bootstrap";
import CustomButton from "../components/CustomButton";
import { FaPlay, FaPlus } from "react-icons/fa";
import { getBanners } from "../redux/actions/bannerActions";

import "react-alice-carousel/lib/alice-carousel.css";
import { useDispatch, useSelector } from "react-redux";

const Carousel = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBanners());
  }, [dispatch]);

  const banner = useSelector((state) => state.banners);

  return (
    <div className="d-flex">
      <Container className="">
        <AliceCarousel
          mouseTracking
          items={banner.map((item, index) => (
            <div key={index} className="align-bottom rounded d-flex">
              <img
                className="cover"
                src={item.imageUrl}
                alt={item.name}
              />
              <div
                className="d-flex"
                style={{
                  position: "absolute",
                  bottom: "30px",
                  left: "100px",
                }}
              >
                <CustomButton
                  custom="primary"
                  value="Ver Ahora"
                  margin="0px 5px"
                  Icon={FaPlay}
                  iconSize="15"
                  iconClassName="mx-1"
                  className="text-uppercase bold p-3"
                />
                <CustomButton
                  custom="dark"
                  value="Ver más tarde"
                  margin="0px 5px"
                  borderColor="primary"
                  Icon={FaPlus}
                  iconSize="15"
                  iconClassName="mx-1"
                  className="text-uppercase bold p-3"
                />
              </div>
            </div>
          ))}
          controlsStrategy="alternate"
          autoPlay={true}
          disableButtonsControls={true}
          infinite={true}
          animationDuration={5000}
        />
      </Container>
    </div>
  );
};

export default Carousel;
