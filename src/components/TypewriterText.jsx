import React, { useState, useEffect } from 'react';

const TypewriterText = ({ text, isVisible }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!isVisible) {
      setDisplayText('');
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    return () => clearInterval(timer);
  }, [text, isVisible]);

  return (
    <span className="font-mono">
      {displayText}
      {isVisible && displayText.length < text.length && (
        <span className="border-r-2 border-white animate-pulse">|</span>
      )}
    </span>
  );
};

export default TypewriterText;