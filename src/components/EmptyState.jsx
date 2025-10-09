import React from "react";

const EmptyState = ({ title, description, action }) => (
  <div className="noresults">
    <div className="icon" />
    <div className="text">
      <h2>{title}</h2>
      {description ? <span>{description}</span> : null}
    </div>
    {action ? <div>{action}</div> : null}
  </div>
);

export default EmptyState;
