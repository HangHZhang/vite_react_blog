import React from "react";
import Prototype from "prop-types";
import "./index.less";

LeftRight.prototype = {
  left: (Prototype.string || Prototype.node).isRequired,
  right: (Prototype.string || Prototype.node).isRequired,
};

export default function LeftRight(props) {
  return props.children ? (
    <div className="container">{props.children}</div>
  ) : (
    <div className="container">
      {props.icon ? <span>{props.icon}</span> : ""}
      <span className="left">{props.left}</span>
      <span className="right">{props.right}</span>
    </div>
  );
}
