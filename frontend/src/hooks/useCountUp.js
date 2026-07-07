import { useState, useEffect } from "react";

export function useCountUp(endValue, duration = 2000, trigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setCount(0);
      return;
    }
    
    let start = 0;
    // Strip non-numeric values for counting if present
    const endStr = String(endValue).replace(/[^0-9.]/g, '');
    const end = parseFloat(endStr) || 0;
    
    if (end === 0) {
      setCount(0);
      return;
    }

    const stepTime = 20; // 50 fps
    const steps = duration / stepTime;
    const increment = end / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(Math.floor(current));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [endValue, duration, trigger]);

  return count;
}
