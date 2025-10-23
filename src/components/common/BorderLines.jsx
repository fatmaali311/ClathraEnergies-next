import React from "react";

const BorderLines = ({ position = "left", className = "" }) => {
  // Determine alignment classes based on position
  const isLeft = position === "left";

  return (
    <div
      className={`absolute top-0 ${isLeft ? "left-4" : "right-4"} h-full flex-row z-0 hidden lg:flex gap-[3px] ${className}`}
    >
      <div className="w-px h-full bg-[var(--primary-green)] will-change-transform transform scale-y-100"></div>
      <div className="w-px h-full bg-[var(--primary-green)] will-change-transform transform scale-y-100"></div>
    </div>
  );
};

export default BorderLines;
