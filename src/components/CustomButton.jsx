import React from "react";

const CustomButton = ({
  custom = "default",
  type = "button",
  size,
  onClick,
  value,
  Icon,
  iconSize,
  iconClassName,
  margin,
  borderColor,
  className,
  borderRadius
}) => {
  return (
    <>
      <button
        type={type}
        className={`${className} custom-btn custom-btn-${custom} custom-btn-${size} custom-border-line-${borderColor}`}
        onClick={onClick}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin,
          borderRadius
        }}
      >
        {Icon ? <Icon size={iconSize} className={iconClassName} /> : <></>}
        {value}
      </button>
    </>
  );
};

export default CustomButton;
