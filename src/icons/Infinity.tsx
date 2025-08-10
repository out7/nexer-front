import React from "react";

const InfinityIconSvg = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M6.66715 5.33317C6.10999 4.91456 5.41738 4.6665 4.66683 4.6665C2.82588 4.6665 1.3335 6.15889 1.3335 7.99984C1.3335 9.84079 2.82588 11.3332 4.66683 11.3332C6.50778 11.3332 7.00016 9.99984 8.00016 7.99984C9.00016 5.99984 9.49255 4.6665 11.3335 4.6665C13.1744 4.6665 14.6668 6.15889 14.6668 7.99984C14.6668 9.84079 13.1744 11.3332 11.3335 11.3332C10.583 11.3332 9.89062 11.085 9.3335 10.6665"
        stroke="#FC9707"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default InfinityIconSvg;
