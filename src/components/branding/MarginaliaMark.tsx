import React from "react";

interface MarginaliaMarkProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  color?: string;
  dotColor?: string;
  strokeWidth?: number;
}

export const MarginaliaMark: React.FC<MarginaliaMarkProps> = ({
  size = 24,
  color = "currentColor",
  dotColor = "#C5895A",
  strokeWidth = 3.2,
  className,
  ...props
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <circle cx="14" cy="9.5" r="3.4" fill={dotColor} />
      <path
        d="M14 16.5V31.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 24.5H27.5"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
