import React, { useEffect, useRef } from 'react';

interface RatingCircleProps {
  rating: number;
}

const RatingCircle: React.FC<RatingCircleProps> = ({ rating }) => {
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && circleRef.current) {
            // Trigger the animation
            setTimeout(() => {
              circleRef.current!.style.strokeDashoffset = `calc(188.4 - (188.4 * ${rating}) / 10)`;
            }, 300);
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the element is visible
    );

    if (circleRef.current) {
      observer.observe(circleRef.current);
    }

    return () => {
      if (circleRef.current) {
        observer.unobserve(circleRef.current);
      }
    };
  }, [rating]);

  const getColor = (rating: number) => {
    if (rating >= 9) return 'text-green-600';
    if (rating >= 8) return 'text-green-400';
    if (rating >= 7) return 'text-yellow-400';
    return 'text-red-500';
  };

  return (
    <div className="relative w-50 h-30 md:h-40 -mt-2">
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <circle
          className="text-gray-200 stroke-current"
          strokeWidth="6"
          cx="50"
          cy="50"
          r="30"
          fill="transparent"
          strokeDasharray="188.4"
          transform="rotate(-90 50 50)"
        ></circle>
        <circle
          ref={circleRef}
          className={`${getColor(rating)} progress-ring__circle stroke-current`}
          strokeWidth="6"
          strokeLinecap="round"
          cx="50"
          cy="50"
          r="30"
          fill="transparent"
          strokeDasharray="188.4"
          strokeDashoffset="188.4"
          style={{ transition: 'stroke-dashoffset 1s ease-out' }}
          transform="rotate(-90 50 50)"
        ></circle>
        <text
          x="50"
          y="50"
          fontFamily="Verdana"
          fontSize="15"
          textAnchor="middle"
          alignmentBaseline="middle"
        >
          {rating}
        </text>
      </svg>
    </div>
  );
};

export default RatingCircle;
