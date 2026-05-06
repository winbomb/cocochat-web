import { FC, memo } from "react";
import clsx from "clsx";

type SpinnerType = "ring" | "waveform" | "orbit" | "lineWobble" | "ping";

interface SpinnerProps {
  type?: SpinnerType;
  size?: number;
  color?: string;
  speed?: number;
  lineWeight?: number;
  className?: string;
}

const Spinner: FC<SpinnerProps> = ({
  type = "ring",
  size = 40,
  color = "currentColor",
  speed = 2,
  lineWeight = 5,
  className,
}) => {
  const duration = `${1 / speed}s`;

  if (type === "ring") {
    return (
      <svg
        width={size}
        height={size}
        className={className}
        style={{ animationDuration: duration }}
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - lineWeight}
          fill="none"
          stroke={color}
          strokeWidth={lineWeight}
          strokeDasharray={`${(size / 2 - lineWeight) * Math.PI * 0.75} ${(size / 2 - lineWeight) * Math.PI * 0.25}`}
          strokeLinecap="round"
          className="animate-spin"
        />
      </svg>
    );
  }

  if (type === "waveform") {
    const barCount = 5;
    const barWidth = lineWeight;
    const gap = 2;
    const totalWidth = barCount * (barWidth + gap) - gap;
    return (
      <div
        className={clsx("flex items-center justify-center gap-[2px]", className)}
        style={{ width: size, height: size, animationDuration: duration }}
      >
        {Array.from({ length: barCount }).map((_, i) => (
          <div
            key={i}
            className="animate-waveform-bar"
            style={{
              width: barWidth,
              height: size,
              backgroundColor: color,
              borderRadius: barWidth / 2,
              animationDuration: duration,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (type === "orbit") {
    return (
      <div
        className={clsx("animate-orbit", className)}
        style={{
          width: size,
          height: size,
          animationDuration: duration,
          position: "relative",
        }}
      >
        <div
          className="absolute inset-0 rounded-full border-2 border-transparent"
          style={{ borderTopColor: color, borderRightColor: color }}
        />
        <div
          className="animate-orbit-inner absolute inset-[4px] rounded-full border-2 border-transparent"
          style={{ borderBottomColor: color, borderLeftColor: color, animationDuration: duration }}
        />
      </div>
    );
  }

  if (type === "lineWobble") {
    return (
      <svg width={size * 2} height={size * 0.4} className={className}>
        <line
          x1="0"
          y1={size * 0.2}
          x2={size * 2}
          y2={size * 0.2}
          stroke={color}
          strokeWidth={lineWeight}
          strokeLinecap="round"
          className="animate-line-wobble"
          style={{ animationDuration: duration }}
        />
      </svg>
    );
  }

  if (type === "ping") {
    return (
      <div className={clsx("relative", className)} style={{ width: size, height: size }}>
        <div
          className="absolute inset-0 rounded-full animate-ping"
          style={{ backgroundColor: color, animationDuration: duration }}
        />
        <div
          className="absolute inset-0 rounded-full animate-pulse"
          style={{ backgroundColor: color, animationDuration: duration, opacity: 0.5 }}
        />
      </div>
    );
  }

  return null;
};

export default memo(Spinner);