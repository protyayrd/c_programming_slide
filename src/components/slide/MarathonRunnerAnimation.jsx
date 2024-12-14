import React, { useState, useEffect, useRef, useCallback } from "react";

const MarathonRunnerAnimation = () => {
  const [lapsCompleted, setLapsCompleted] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [angleProgress, setAngleProgress] = useState(0);
  const [conditionMet, setConditionMet] = useState(true);
  const [isConditionChecking, setIsConditionChecking] = useState(false);

  const animationRef = useRef(null);

  const LAP_DISTANCE = 500; // meters per lap
  const MAX_LAPS = 4; // Maximum laps

  const TRACK_CONFIG = {
    centerX: 350,
    centerY: 200,
    radiusX: 300,
    radiusY: 150,
  };

  const calculatePosition = useCallback((progress) => {
    const { centerX, centerY, radiusX, radiusY } = TRACK_CONFIG;
    const angle = progress * 2 * Math.PI; // Progress mapped to a full circle (0 to 2π)
    return {
      x: centerX + radiusX * Math.cos(angle),
      y: centerY + radiusY * Math.sin(angle),
    };
  }, []);

  const animate = useCallback(
    (timestamp) => {
      const speed = 0.003; // Speed of the animation
      const newProgress = (angleProgress + speed) % 1; // Wrap progress around 1 (full lap)

      setAngleProgress(newProgress);

      // Check if a lap is completed
      if (newProgress < angleProgress) {
        const newLapsCompleted = lapsCompleted + 1;
        setLapsCompleted(newLapsCompleted);

        // Stop animation to check condition
        setIsRunning(false);
        setIsConditionChecking(true);
        setConditionMet(newLapsCompleted < MAX_LAPS);
        cancelAnimationFrame(animationRef.current);
        return;
      }

      if (isRunning) {
        animationRef.current = requestAnimationFrame(animate);
      }
    },
    [angleProgress, lapsCompleted, isRunning]
  );

  useEffect(() => {
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    }
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isRunning, animate]);

  const startRace = () => {
    setLapsCompleted(0);
    setAngleProgress(0);
    setIsRunning(true);
    setConditionMet(true);
    setIsConditionChecking(false);
  };

  const resetRace = () => {
    cancelAnimationFrame(animationRef.current);
    setLapsCompleted(0);
    setAngleProgress(0);
    setIsRunning(false);
    setConditionMet(true);
    setIsConditionChecking(false);
  };

  const continueRace = () => {
    setIsRunning(true);
    setIsConditionChecking(false);
  };

  const { x, y } = calculatePosition(angleProgress);

  return (
    <div className="bg-gray-900 rounded-xl shadow-2xl w-full max-w-3xl p-10">
      <div className="relative bg-gray-800 rounded-xl h-96 mb-10">
        <svg viewBox="0 0 800 500" className="absolute inset-0">
          <ellipse
            cx="400"
            cy="225"
            rx="350"
            ry="175"
            fill="none"
            stroke="#00BFFF"
            strokeWidth="4"
            strokeDasharray="12,8"
          />
        </svg>
        <div
          className="absolute rounded-full shadow-lg"
          style={{
            left: `${x}px`,
            top: `${y}px`,
            width: "50px",
            height: "50px",
            backgroundColor: "#FF4500",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      <div className="grid grid-cols-4 gap-6 mb-10">
        <div className="bg-gray-800 p-5 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Laps</p>
          <p className="text-white text-3xl font-bold">{lapsCompleted}</p>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Condition</p>
          <p className="text-white text-3xl font-bold">{`${lapsCompleted} < ${MAX_LAPS}`}</p>
        </div>
        <div className="bg-gray-800 p-5 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Condition Met?</p>
          <p
            className={`text-3xl font-bold ${conditionMet ? "text-green-400" : "text-red-400"
              }`}
          >
            {conditionMet ? "True" : "False"}
          </p>
        </div>
        <div className="bg-gray-800 pt-3 rounded-lg text-center">
          <p className="text-gray-400 text-sm">Status</p>
          <p
            className={`text-xl font-bold ${isConditionChecking
              ? "text-yellow-400"
              : (isRunning ? "text-green-400" : "text-red-400")
              }`}
          >
            {isConditionChecking
              ? "Condition Checking"
              : (isRunning ? "Running" : "Stopped")
            }
          </p>
        </div>
      </div>

      <div className="flex space-x-6">
        {!isRunning && lapsCompleted < MAX_LAPS ? (
          <button
            onClick={continueRace}
            className="flex-1 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-xl"
          >
            Continue
          </button>
        ) : null}
        <button
          onClick={resetRace}
          className="flex-1 py-4 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition text-xl"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default MarathonRunnerAnimation;