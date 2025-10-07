'use client';

export default function StarfieldBackground() {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "50%",
        backgroundImage: "url('/starfield_background.png')",
        backgroundSize: "cover",
        backgroundPosition: "top center", // Show top half of image to avoid watermark
        backgroundRepeat: "no-repeat",
        zIndex: 10,
        pointerEvents: "none",
      }}
    />
  );
}
