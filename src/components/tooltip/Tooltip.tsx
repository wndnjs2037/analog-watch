import React from "react";
import "./Tooltip.css";

interface TooltipProps {
  time: string;
  position: { x: number; y: number };
}

const Tooltip: React.FC<TooltipProps> = ({ time, position }) => {
  return (
    <div
      className="tooltip"
      style={{
        top: position.y - 40,
        left: position.x + 10,
      }}
    >
      {time}
    </div>
  );
};

export default Tooltip;
