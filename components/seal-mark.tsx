// Red seal with a tooth: drawn as SVG so it never depends on a CJK font being installed.
export function SealMark({ size = 34 }: { size?: number }) {
  return (
    <svg
      className="logo-mark"
      width={size}
      height={size}
      viewBox="0 0 34 34"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="0.5" y="0.5" width="33" height="33" rx="4" fill="#b8322a" />
      <rect x="3" y="3" width="28" height="28" rx="2.5" fill="none" stroke="#fff" strokeOpacity="0.55" />
      <path
        fill="#fff"
        d="M12.2 8.5c-2.6 0-4.2 2-4.2 4.6 0 2.2.8 3.7 1.5 5.3.6 1.4.8 3.3 1.2 5.2.3 1.6.9 2.9 1.9 2.9s1.5-1.3 1.8-2.9c.3-1.6.6-3 2.6-3s2.3 1.4 2.6 3c.3 1.6.8 2.9 1.8 2.9s1.6-1.3 1.9-2.9c.4-1.9.6-3.8 1.2-5.2.7-1.6 1.5-3.1 1.5-5.3 0-2.6-1.6-4.6-4.2-4.6-1.9 0-3 .9-4.8.9s-2.9-.9-4.8-.9z"
      />
    </svg>
  );
}
