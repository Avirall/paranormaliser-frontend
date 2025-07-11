"use client";

import React, { useEffect, useState } from "react";

const CourageFace: React.FC = () => {
  const [glitchActive, setGlitchActive] = useState(false);
  const [expression, setExpression] = useState("neutral");

  useEffect(() => {
    // Random glitch effect
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, Math.random() * 10000 + 5000);

    // Random expression changes
    const expressionInterval = setInterval(() => {
      const expressions = ["neutral", "scared", "worried", "shocked"];
      setExpression(
        expressions[Math.floor(Math.random() * expressions.length)]
      );
    }, Math.random() * 8000 + 4000);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(expressionInterval);
    };
  }, []);

  return (
    <div className={`courage-face-container ${glitchActive ? "glitch" : ""}`}>
      <div className="courage-face">
        {/* ASCII Art version of Courage's face */}
        <pre className="ascii-courage">
          {`
      /\\_/\\  
     ( o.o ) 
      > ^ <  
     /|   |\\
    (_|   |_)
`}
        </pre>

        {/* Or use an image with retro filter */}
        <div className={`courage-eyes ${expression}`}>
          <div className="eye left-eye">
            <div className="pupil"></div>
          </div>
          <div className="eye right-eye">
            <div className="pupil"></div>
          </div>
        </div>

        <div className="courage-nose"></div>

        <div className={`courage-mouth ${expression}`}></div>
      </div>

      {/* Scanline overlay specific to face */}
      <div className="face-scanlines"></div>
    </div>
  );
};

export default CourageFace;
