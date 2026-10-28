import React from 'react';

export const PlayPointsDiamond: React.FC<{ className?: string }> = ({
  className = 'w-[25px] h-[25px]',
}) => {
  return (
    <svg
      viewBox="0 0 512 512"
      className={`inline-block shrink-0 ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Play Points Diamond"
    >
      <defs>
        {/* Play Points multi-color faceted diamond gradient */}
        <linearGradient id="pp_top_left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00C3FF" />
          <stop offset="100%" stopColor="#0077F7" />
        </linearGradient>
        <linearGradient id="pp_bottom_left" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF3A44" />
          <stop offset="100%" stopColor="#C31162" />
        </linearGradient>
        <linearGradient id="pp_bottom_right" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFE000" />
          <stop offset="100%" stopColor="#FF6A00" />
        </linearGradient>
        <linearGradient id="pp_top_right" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00E676" />
          <stop offset="100%" stopColor="#00A950" />
        </linearGradient>
      </defs>
      {/* 4-facet Play Points Diamond shape */}
      <polygon points="256,40 470,256 256,256" fill="url(#pp_top_right)" />
      <polygon points="42,256 256,40 256,256" fill="url(#pp_top_left)" />
      <polygon points="42,256 256,472 256,256" fill="url(#pp_bottom_left)" />
      <polygon points="256,256 256,472 470,256" fill="url(#pp_bottom_right)" />
      {/* Inner facet depth lines */}
      <polygon points="256,120 392,256 256,256" fill="#ffffff" fillOpacity="0.22" />
      <polygon points="120,256 256,120 256,256" fill="#ffffff" fillOpacity="0.15" />
    </svg>
  );
};
