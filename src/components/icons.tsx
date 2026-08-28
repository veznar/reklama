import React from "react";

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const base = (props: IconProps) => ({
  className: props.className ?? "w-6 h-6",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: props.strokeWidth ?? 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  viewBox: "0 0 24 24",
});

/* ---- risk category icons ---- */

export const IconDeception = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 4.5c-3 1.6-4.5 4.6-4.5 7.5s1.5 5.9 4.5 7.5c1.4.8 2.6 1 4 1" />
    <path d="M16 4.5c3 1.6 4.5 4.6 4.5 7.5S19 17.9 16 19.5c-1.4.8-2.6 1-4 1" />
    <path d="M12 3.5v17" strokeDasharray="2.5 3" />
    <circle cx="8.6" cy="10" r="0.9" fill="currentColor" stroke="none" />
    <path d="M15 9.6l1.8 1.4 1.8-1.4" />
    <path d="M7.4 14.5c1 .9 2 1.3 3.1 1.3" />
    <path d="M15.2 14.2h2.4v1.6h-2.4z" />
  </svg>
);

export const IconManipulation = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3v4" />
    <path d="M8.5 7h7l-1 4h-5z" />
    <path d="M9.5 11l-1.5 9M14.5 11l1.5 9" />
    <path d="M12 11v6" />
    <path d="M4 5.5c1.6-1 3-1 4.5 0" />
    <path d="M15.5 5.5c1.6-1 3-1 4.5 0" />
  </svg>
);

export const IconData = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l7 2.5v5c0 4.6-2.8 8-7 10-4.2-2-7-5.4-7-10v-5z" />
    <path d="M12 7.5c-2 0-3.2 1.3-3.2 2.8 0 2.6 3.2 3 3.2 5.7" />
    <path d="M12 7.5c2 0 3.2 1.3 3.2 2.8 0 2.6-3.2 3-3.2 5.7" />
    <path d="M12 18.4v-2" />
  </svg>
);

export const IconCopyright = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="2" />
    <path d="M14.6 9.7A3.4 3.4 0 0012 8.6c-2 0-3.4 1.5-3.4 3.4s1.4 3.4 3.4 3.4c1 0 2-.4 2.6-1.1" />
    <path d="M16.5 3.5L20.5 7.5" strokeDasharray="2 2.4" />
  </svg>
);

export const IconBias = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4v14M8.5 18h7" />
    <path d="M5 7l7-1.5 7 1.5" />
    <path d="M5 7l-2 5h4zM3 12a2 2 0 004 0" />
    <path d="M19 7l-2 5h4zM17 12a2 2 0 004 0" />
    <circle cx="12" cy="4" r="1.2" />
  </svg>
);

export const IconBoundary = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3.5" y="5" width="12" height="12" rx="1.5" />
    <rect x="9" y="7.5" width="11.5" height="11.5" rx="1.5" strokeDasharray="3 2.6" />
    <path d="M6.5 9.5h5M6.5 12h3" />
  </svg>
);

/* ---- ui icons ---- */

export const IconArrowLeft = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M15 5l-7 7 7 7" />
  </svg>
);

export const IconArrowRight = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 5l7 7-7 7" />
  </svg>
);

export const IconDownload = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4v10M7.5 10.5L12 15l4.5-4.5" />
    <path d="M5 19h14" />
  </svg>
);

export const IconGrid = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="4" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="13.5" y="4" width="6.5" height="6.5" rx="1" />
    <rect x="4" y="13.5" width="6.5" height="6.5" rx="1" />
    <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" />
  </svg>
);

export const IconPlay = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M8 5.5v13l10-6.5z" />
  </svg>
);

export const IconCheck = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

export const IconMic = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="9" y="3.5" width="6" height="11" rx="3" />
    <path d="M5.5 11.5a6.5 6.5 0 0013 0M12 18v2.5M9 20.5h6" />
  </svg>
);

export const IconTimer = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="13" r="7.5" />
    <path d="M12 9.5V13l2.6 2M9.5 3h5" />
  </svg>
);

export const IconFile = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M7 3.5h7l4 4v13H7z" />
    <path d="M14 3.5v4h4M9.5 12h6M9.5 15.5h6" />
  </svg>
);

export const IconSpark = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z" />
    <path d="M18.5 15.5l.9 2.4 2.4.9-2.4.9-.9 2.4-.9-2.4-2.4-.9 2.4-.9z" strokeWidth={1.2} />
  </svg>
);

export const IconShield = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 3.5l7 2.5v5c0 4.5-2.8 7.9-7 9.9-4.2-2-7-5.4-7-9.9v-5z" />
    <path d="M9 11.5l2.2 2.2L15.5 9.5" />
  </svg>
);

export const IconScale = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 4.5v13M8.5 17.5h7M12 4.5l-6 1.5M12 4.5l6 1.5" />
    <path d="M6 6l-2.2 5.2h4.4zM3.8 11.2a2.2 2.2 0 004.4 0M18 6l-2.2 5.2h4.4zM15.8 11.2a2.2 2.2 0 004.4 0" />
  </svg>
);
