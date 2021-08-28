import React from "react";
import star from "../assets/svg/star.svg";
const Rate = ({ rate }) => {
  return (
    <div>
      <div className={`rate ${rate > 5 ? "top-rate" : "least-rate"} `}>
        <span>
          <img src={star} alt="rate"/>
        </span>
        {rate}
      </div>
    </div>
  );
};

export default Rate;
