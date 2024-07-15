import React from "react";
import "./styles.scss";
import { Link } from "react-router-dom";
import { ButtonProps } from "../../models/Button";

const Button = (props: ButtonProps) => {
  const buttonClasses = `${props.className ?? ""} button ${
    props.disabled ? "" : props.type ?? "plain"
  }`;

  if (props.behavior === "link" && props.to) {
    return (
      <Link
        {...props}
        className={buttonClasses}
        id={props.id ?? ""}
        to={props.to}
      >
        {props.children}
      </Link>
    );
  }
  if (props.behavior === "button" && props.onClick) {
    return (
      <button
        className={buttonClasses}
        id={props.id ?? ""}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    );
  }

  return <></>;
};

export default Button;
