import React from 'react';
import { X } from 'lucide-react';

const SlideIndexPanel = ({
  slides,
  currentSlide,
  setCurrentSlide,
  setVisibleLines,
  showIndex,
  setShowIndex,
}) => {
  return (
    <div
      className={`fixed right-0 top-0 h-full w-96 bg-gray-900/95 backdrop-blur-xl 
        transform transition-all duration-500 z-50 ${showIndex ? 'translate-x-0' : 'translate-x-full'
        }`}
    >
      <div className="h-full flex flex-col">
        <div className="p-8 border-b border-white/10">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-white">Contents</h3>
            <button
              onClick={() => setShowIndex(false)}
              className="p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-2">
            {slides.map((slide, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setVisibleLines([]);
                  setShowIndex(false);
                }}
                className={`w-full text-left p-4 rounded-xl transition-all 
                  ${currentSlide === index
                    ? `bg-gradient-to-r ${slide.gradient} text-white`
                    : 'text-gray-300 hover:bg-white/5'
                  }`}
              >
                <div className="text-xl font-semibold">{slide.indexTitle || slide.title || `Slide ${index + 1}`}</div>
                <div className="text-sm opacity-75 mt-1">{slide.subtitle}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideIndexPanel;