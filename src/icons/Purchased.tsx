import React from "react";

interface PurchasedIconProps {
  width?: number;
  height?: number;
  className?: string;
}

const PurchasedIcon: React.FC<PurchasedIconProps> = ({
  width = 12,
  height = 12,
  className = "",
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M9.5625 2.25H2.4375C1.71263 2.25 1.125 2.83763 1.125 3.5625V8.4375C1.125 9.16237 1.71263 9.75 2.4375 9.75H9.5625C10.2874 9.75 10.875 9.16237 10.875 8.4375V3.5625C10.875 2.83763 10.2874 2.25 9.5625 2.25Z"
        stroke="white"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.125 4.5H10.875M3 7.03125H4.125V7.5H3V7.03125Z"
        stroke="white"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default PurchasedIcon;
