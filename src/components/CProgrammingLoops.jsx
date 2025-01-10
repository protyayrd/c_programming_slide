// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Maximize2, Plus, Minus, List } from 'lucide-react';
import TypewriterText from './TypewriterText';
import slides from './slide/Slides.js';
import SlideIndexPanel from './SlideIndexPanel';

const CProgrammingLoops = () => {
  // State variables for managing the slide navigation, content visibility, and style settings
  const [currentSlide, setCurrentSlide] = useState(0); // Index of the current slide
  const [visibleLines, setVisibleLines] = useState([]); // Tracks which lines of content are visible
  const [fontSize, setFontSize] = useState(32); // Font size of the content
  const [lineGap, setLineGap] = useState(2); // Line height for text content readability
  const [showIndex, setShowIndex] = useState(false); // Whether the index list is shown or not

  // Helper function for advanced text formatting
  const applyTextFormatting = (text) => {
    return text

      // Fraction formatting: {1/2}, {3/4}, etc.
      .replace(/\{(.*?)\/(.*?)\}/g,
        '<span class="inline-flex flex-col items-center justify-center text-center align-middle">' +
        '<span class="text-4xl leading-none">$1</span>' +
        '<span class="border-b-4 border-current w-full my-1"></span>' +
        '<span class="text-4xl leading-none">$2</span>' +
        '</span>')

      // Color formatting: {red:text}, {blue:text}, {green:text}
      .replace(/\{(red|blue|green|orange|purple|yellow):(.+?)\}/g,
        '<span style="color: $1;">$2</span>')

      // Background highlights: [yellow:text], [blue:text]
      .replace(/\[(yellow|blue|green|red|purple):(.+?)\]/g,
        '<span style="background-color: $1; padding: 2px;">$2</span>')

      // Advanced bold with color: **{red:bold text}**
      .replace(/\*\*\{(red|blue|green|orange|purple|yellow):(.+?)\}\*\*/g,
        '<strong style="color: $1;">$2</strong>')

      // Bold with **text**
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')

      // Underline with __text__
      .replace(/__(.+?)__/g, '<u>$1</u>')

      // Larger with ^^text^^
      .replace(/\^\^(.+?)\^\^/g, '<span style="font-size: 1.2em;">$1</span>')

      // Smaller with --text--
      .replace(/--(.+?)--/g, '<span style="font-size: 0.8em;">$1</span>')

      // Italic with *text*
      .replace(/\*(.*?)\*/g, '<em>$1</em>')

      // Strikethrough with ~~text~~
      .replace(/~~(.+?)~~/g, '<del>$1</del>')

      // Subscript with ~text~
      .replace(/~(.+?)~/g, '<sub>$1</sub>')

      // Superscript with ^text^
      .replace(/\^(.+?)\^/g, '<sup>$1</sup>');
  };

  // Toggles fullscreen mode
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen(); // Request fullscreen
    } else {
      document.exitFullscreen(); // Exit fullscreen
    }
  };

  // Reveals the next line of code or content
  const handleNextLine = () => {
    const slide = slides[currentSlide];
    const totalLines = (slide.content?.length || 0) + (slide.code?.length || 0);

    if (visibleLines.length < totalLines) {
      setVisibleLines((prev) => [...prev, visibleLines.length]); // Add next line to visibleLines array
    }
  };

  // Hides the previous line of content
  const handlePrevLine = () => {
    if (visibleLines.length > 0) {
      setVisibleLines((prev) => prev.slice(0, -1)); // Remove last line from visibleLines array
    }
  };

  // Changes the slide based on user direction (next or previous)
  const handleSlideChange = (direction) => {
    if (direction === 'next' && currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1); // Move to the next slide
      setVisibleLines([]); // Reset visible lines when changing slides
    } else if (direction === 'prev' && currentSlide > 0) {
      setCurrentSlide((prev) => prev - 1); // Move to the previous slide
      setVisibleLines([]); // Reset visible lines when changing slides
    }
  };

  // Renders the content of the current slide
  const renderContent = () => {
    const slide = slides[currentSlide];

    // If slide has a component, render it directly
    if (slide.component) {
      const Component = slide.component;
      return (
        <div className="flex items-center justify-center w-full h-full">
          <Component />
        </div>
      );
    }

    const textStyle = {
      fontSize: `${fontSize}px`, // Dynamically set font size
      lineHeight: lineGap, // Set line height for text content readability
    };

    const codeStyle = {
      fontSize: `${fontSize}px`, // Dynamically set font size
    };

    return (
      <div className="space-y-6">
        {/* Render Text Content with Rich Formatting */}
        {slide.content && (
          <div style={textStyle}>
            {slide.content.map((line, index) => (
              <div
                key={`content-${index}`}
                className={`transition-opacity duration-300 ${visibleLines.includes(index) ? 'opacity-100' : 'opacity-0'
                  }`}
              >
                <p
                  dangerouslySetInnerHTML={{
                    __html: applyTextFormatting(line)
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {/* Render Code Content */}
        {slide.code && (
          <div className="space-y-4 bg-gray-700/50 p-6 rounded-lg shadow-lg" style={codeStyle}>
            {slide.code.map((line, index) => (
              <div
                key={`code-${index}`}
                className={`transition-opacity duration-300 ${visibleLines.includes(index + (slide.content?.length || 0))
                  ? 'opacity-100'
                  : 'opacity-0'
                  }`}
              >
                <span className={line.color || 'text-white'}>
                  <TypewriterText
                    text={line.text}
                    isVisible={visibleLines.includes(index + (slide.content?.length || 0))}
                  />
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderTitleSection = () => {
    const slide = slides[currentSlide];

    // If no title or icon, return null
    if (!slide.title && !slide.icon) return null;

    return (
      <div className="flex items-center justify-center w-full py-4 px-6 space-x-4 mt-20">
        {slide.icon && (
          <div
            className={`p-3 rounded-full bg-gradient-to-r ${slide.gradient || ''} shadow-lg`}
          >
            <slide.icon className="w-8 h-8" />
          </div>
        )}
        {slide.title && (
          <h1
            className="text-4xl font-semibold"
            dangerouslySetInnerHTML={{
              __html: applyTextFormatting(slide.title)
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div
      className="relative bg-gradient-to-br from-black to-gray-900 w-full h-screen flex flex-col items-center justify-center text-white"
      style={{
        aspectRatio: '16 / 9',
        maxHeight: '100vh',
        maxWidth: '177.78vh' // Calculated to maintain 16:9 aspect ratio
      }}
    >
      {/* Slide Index Panel */}
      <SlideIndexPanel
        slides={slides}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        setVisibleLines={setVisibleLines}
        showIndex={showIndex}
        setShowIndex={setShowIndex}
      />

      {/* Title Section - Now optional */}
      {renderTitleSection()}

      {/* Content Section */}
      <div
        className={`flex-1 w-full overflow-y-auto ${slides[currentSlide].component ? '' : 'pr-16 pl-16 pt-8 pb-16'
          }`}
      >
        {renderContent()}
      </div>

      {/* Line Navigation Buttons - Conditionally rendered */}
      {!slides[currentSlide].component && (
        <div className="absolute bottom-4 left-4 flex flex-row space-x-4">
          <button
            onClick={handlePrevLine}
            className="flex items-center justify-center p-3 rounded-full bg-gray-800 text-white shadow-lg"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNextLine}
            className="flex items-center justify-center p-3 rounded-full bg-gray-800 text-white shadow-lg"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Top Right: Fullscreen & Index Buttons */}
      <div className="absolute top-4 right-4 flex flex-row space-x-4">
        <button
          onClick={toggleFullscreen}
          className="flex items-center justify-center p-3 rounded-full bg-gray-800 text-white shadow-lg"
        >
          <Maximize2 className="w-6 h-6" />
        </button>
        <button
          onClick={() => setShowIndex(!showIndex)}
          className="flex items-center justify-center p-3 rounded-full bg-gray-800 text-white shadow-lg"
        >
          <List className="w-6 h-6" />
        </button>
      </div>

      {/* Font Size Adjustment - Conditionally rendered */}
      {!slides[currentSlide].component && (
        <div className="absolute bottom-4 flex flex-row space-x-4">
          <button
            onClick={() => setFontSize(fontSize + 1)}
            className="flex items-center justify-center p-3 rounded-full bg-gray-800 text-white shadow-lg"
          >
            <Plus className="w-6 h-6" />
          </button>
          <button
            onClick={() => setFontSize(fontSize - 1)}
            className="flex items-center justify-center p-3 rounded-full bg-gray-800 text-white shadow-lg"
          >
            <Minus className="w-6 h-6" />
          </button>
        </div>
      )}

      {/* Bottom Right: Next Page & Previous Page Buttons */}
      <div className="absolute bottom-4 right-4 flex flex-row space-x-4">
        <button
          onClick={() => handleSlideChange('prev')}
          className="flex items-center justify-center p-3 rounded-full bg-gray-800 text-white shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={() => handleSlideChange('next')}
          className="flex items-center justify-center p-3 rounded-full bg-gray-800 text-white shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default CProgrammingLoops;
