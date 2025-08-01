import React from "react";

const Loading = () => {
  return (
    <div className="w-20">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
        <circle
          className="stroke-sidebar"
          strokeWidth={15}
          r={15}
          cx={40}
          cy={100}
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur={2}
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.4"
          />
        </circle>
        <circle
          className="stroke-sidebar"
          strokeWidth={15}
          r={15}
          cx={100}
          cy={100}
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur={2}
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin="-.2"
          />
        </circle>
        <circle
          className="stroke-sidebar"
          strokeWidth={15}
          r={15}
          cx={160}
          cy={100}
        >
          <animate
            attributeName="opacity"
            calcMode="spline"
            dur={2}
            values="1;0;1;"
            keySplines=".5 0 .5 1;.5 0 .5 1"
            repeatCount="indefinite"
            begin={0}
          />
        </circle>
      </svg>
    </div>
  );
};

export default Loading;
