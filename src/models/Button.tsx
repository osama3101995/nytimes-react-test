import { To } from "react-router-dom";

export interface ButtonProps {
  className?: string;
  disabled?: boolean;
  type?: "plain" | "primary" | "secondary"; // Add other types as needed
  behavior?: "link" | "button";
  to?: To;
  id?: string;
  onClick?: () => void;
  children: React.ReactNode;
}
