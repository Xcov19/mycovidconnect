import React from "react";

const SkeletonItem = () => (
  <div style={{
    height: 64,
    margin: "12px 20px",
    borderRadius: 8,
    background: "linear-gradient(90deg, #f0f3f7 25%, #e6ebf2 37%, #f0f3f7 63%)",
    backgroundSize: "400% 100%",
    animation: "mcc-skel 1.4s ease infinite"
  }} />
);

const SkeletonList = ({ count = 6 }) => (
  <div>
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonItem key={i} />
    ))}
    <style>{`@keyframes mcc-skel { 0%{background-position: 100% 50%} 100%{background-position: 0 50%} }`}</style>
  </div>
);

export default SkeletonList;
