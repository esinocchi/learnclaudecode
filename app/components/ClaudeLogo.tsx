interface Props {
  size?: number;
  color?: string;
}

export function ClaudeLogo({ size = 20, color = "currentColor" }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer arc */}
      <path
        d="M20 12c0 4.42-3.58 8-8 8S4 16.42 4 12 7.58 4 12 4"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Middle arc */}
      <path
        d="M17 12c0 2.76-2.24 5-5 5S7 14.76 7 12s2.24-5 5-5"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Inner arc */}
      <path
        d="M14 12a2 2 0 01-2 2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
