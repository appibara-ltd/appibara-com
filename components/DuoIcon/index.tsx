import React from "react";
import {
  DUO_HEADER_ICONS,
  DUO_ICONS,
  type DuoIconDefinition,
} from "./icons";

export { DUO_HEADER_ICONS, DUO_ICONS, type DuoIconDefinition };

interface DuoIconProps extends React.SVGProps<SVGSVGElement> {
  icon: DuoIconDefinition;
  primaryColor?: string;
  secondaryColor?: string;
  primaryOpacity?: number;
  secondaryOpacity?: number;
}

/**
 * Renders a dual-tone vector icon from Appibara's 640x640 duo_solid suite.
 */
export function DuoIcon({
  icon,
  className,
  primaryColor = "currentColor",
  secondaryColor = "currentColor",
  primaryOpacity = 1,
  secondaryOpacity = 0.4,
  ...props
}: DuoIconProps) {
  const primaryPath = icon.paths[0] ?? "";
  const secondaryPath = icon.paths[1] ?? "";

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${icon.size} ${icon.size}`}
      aria-hidden="true"
      className={className}
      {...props}
    >
      {secondaryPath ? (
        <path
          fill={secondaryColor}
          fillOpacity={secondaryOpacity}
          d={secondaryPath}
        />
      ) : null}
      {primaryPath ? (
        <path
          fill={primaryColor}
          fillOpacity={primaryOpacity}
          d={primaryPath}
        />
      ) : null}
    </svg>
  );
}
