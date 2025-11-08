import * as React from "react";
import { Card } from "@/components/ui/card";
import clsx from "clsx";

// BoxCard props:
// - size: 'small' | 'medium' | 'large' (controls width/height)
// - title: string (header text)
// - children: React.ReactNode (box content)
//
// To change the size, set the 'size' prop.
// To add more content, pass children or add more props as needed.

export type BoxCardSize = "small" | "medium" | "large";

const sizeStyles: Record<BoxCardSize, string> = {
  small: "w-64 h-40",
  medium: "w-80 h-56",
  large: "w-[28rem] h-72",
};

export function BoxCard({ size, title, children }: {
  size: BoxCardSize;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className={clsx(
      "flex flex-col bg-card border border-border rounded-xl shadow-md p-4 gap-2 transition-colors duration-200",
      sizeStyles[size]
    )}>
      <div className="font-bold text-lg mb-1 text-primary">{title}</div>
      <div className="flex-1 text-muted-foreground text-sm">{children}</div>
    </Card>
  );
} 