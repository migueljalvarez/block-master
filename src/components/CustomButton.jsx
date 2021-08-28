import React from "react";

const CustomButton = ({
  custom = "default",
  size,
  type = "button",
  onClick,
  value,
  Icon,
  iconSize,
  iconClassName,
}) => {
  return (
    <>
      <button
        className={`custom-btn custom-btn-${custom} custom-btn-${size}`}
        type={type}
        onClick={onClick}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "2px",
        }}
      >
        <Icon size={iconSize} className={iconClassName} />
        {value}
      </button>
    </>
  );
};

export default CustomButton;
