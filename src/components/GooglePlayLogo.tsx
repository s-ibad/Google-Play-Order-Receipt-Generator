import React from 'react';

interface GooglePlayLogoProps {
  className?: string;
  showText?: boolean;
}

export const GooglePlayLogo: React.FC<GooglePlayLogoProps> = ({
  className = 'h-7',
  showText = true,
}) => {
  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Google Play Triangle SVG */}
      <svg
        viewBox="0 0 512 512"
        className="h-full w-auto aspect-square shrink-0 drop-shadow-xs"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Google Play Icon"
      >
        <defs>
          <linearGradient id="gp_blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C3FF" />
            <stop offset="100%" stopColor="#0077F7" />
          </linearGradient>
          <linearGradient id="gp_red" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF3A44" />
            <stop offset="100%" stopColor="#C31162" />
          </linearGradient>
          <linearGradient id="gp_yellow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE000" />
            <stop offset="100%" stopColor="#FF6A00" />
          </linearGradient>
          <linearGradient id="gp_green" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00E676" />
            <stop offset="100%" stopColor="#00A950" />
          </linearGradient>
        </defs>

        {/* Triangle left body (Blue) */}
        <path
          d="M48.2 27.6C42.8 33.3 39.8 42.1 39.8 53.6v404.8c0 11.5 3 20.3 8.4 26l3.1 3 226.7-226.7v-5.4L51.3 24.6l-3.1 3z"
          fill="url(#gp_blue)"
        />

        {/* Triangle bottom-right wing (Red) */}
        <path
          d="M353.4 329.1l-75.4-75.4v-5.4l75.4-75.4 1.7 1 89.3 50.7c25.5 14.5 25.5 38.3 0 52.8l-89.3 50.7-1.7 1z"
          fill="url(#gp_yellow)"
        />

        {/* Triangle bottom wing (Red/Pink) */}
        <path
          d="M355.1 328.1L278 251 51.3 477.7c8.4 8.9 22.3 10 37.9 1.1l265.9-150.7z"
          fill="url(#gp_red)"
        />

        {/* Triangle top wing (Green) */}
        <path
          d="M355.1 173.9L89.2 23.2C73.6 14.3 59.7 15.4 51.3 24.3L278 251l77.1-77.1z"
          fill="url(#gp_green)"
        />
      </svg>

      {/* "Google Play" Wordmark */}
      {showText && (
        <span
          className="text-[#5f6368] font-medium tracking-tight text-[19px] sm:text-[21px] leading-none"
          style={{ fontFamily: "'Roboto', 'Segoe UI', Arial, sans-serif" }}
        >
          Google Play
        </span>
      )}
    </div>
  );
};
