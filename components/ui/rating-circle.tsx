import React, { useEffect, useRef } from 'react';

interface RatingCircleProps {
  rating: number;
}

const RatingCircle: React.FC<RatingCircleProps> = ({ rating }) => {
  const circleRef = useRef<SVGCircleElement>(null);
  const circleRadius = 30;
  const circumference = 2 * Math.PI * circleRadius;

  useEffect(() => {
    if (circleRef.current) {
      const offset = circumference - (circumference * rating) / 10;
      circleRef.current.style.strokeDasharray = `${circumference}`;
      circleRef.current.style.strokeDashoffset = `${offset}`;
    }
  }, [rating, circumference]);

  const getColor = (rating: number) => {
    if (rating >= 9) return '#16a34a'; // Tailwind's green-600 color
    if (rating >= 8) return '#4ade80'; // Tailwind's green-400 color
    if (rating >= 7) return '#facc15'; // Tailwind's yellow-400 color
    return '#ef4444'; // Tailwind's red-500 color
  };

  return (
    <div className="relative w-50 h-30 md:h-40 -mt-2">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          style={{
            stroke: '#e2e8f0', // Tailwind's gray-200 color
            strokeWidth: 6,
          }}
          cx="50"
          cy="50"
          r={circleRadius}
          fill="transparent"
          strokeDasharray={circumference}
          transform="rotate(-90 50 50)"
        ></circle>
        <circle
          ref={circleRef}
          style={{
            stroke: getColor(rating),
            strokeWidth: 6,
            strokeLinecap: 'round',
            strokeDasharray: `${circumference}`,
            strokeDashoffset: `${circumference}`,
            transition: 'stroke-dashoffset 1s ease-out',
          }}
          cx="50"
          cy="50"
          r={circleRadius}
          fill="transparent"
          transform="rotate(-90 50 50)"
        ></circle>
        <text
          x="50"
          y="50"
          fontFamily="Verdana"
          fontSize="15"
          textAnchor="middle"
          alignmentBaseline="middle"
          fill="#000"
        >
          {rating}
        </text>
      </svg>
    </div>
  );
};

export default RatingCircle;
