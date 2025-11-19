import { useEffect, useState } from "react";

interface LoadingBarProps {
  isLoading: boolean;
}

export function LoadingBar({ isLoading }: LoadingBarProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isLoading) {
      setProgress(0);
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 30;
        });
      }, 100);

      return () => clearInterval(interval);
    } else {
      setProgress(100);
      const timeout = setTimeout(() => {
        setProgress(0);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [isLoading]);

  if (progress === 0 && !isLoading) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 h-1 bg-primary z-50 transition-all duration-300 ease-out"
      style={{
        width: `${progress}%`,
        opacity: progress === 100 ? 0 : 1,
      }}
      data-testid="loading-bar"
    />
  );
}
