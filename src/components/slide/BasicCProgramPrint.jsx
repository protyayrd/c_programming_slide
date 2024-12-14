import React, { useState } from 'react';
import { 
  Play, 
  ArrowRight, 
  Repeat,
  Trash2
} from "lucide-react";

const BasicCProgramPrint = () => {
  const [codeLines, setCodeLines] = useState([
    { id: 1, text: '#include <stdio.h>', type: 'include' },
    { id: 2, text: 'int main() {', type: 'function-start' }
  ]);
  const [output, setOutput] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [instruction, setInstruction] = useState("Start building your C program");
  const [warnings, setWarnings] = useState([]);

  const updateCodeLine = (index, newText) => {
    const updatedLines = [...codeLines];
    updatedLines[index] = { 
      ...updatedLines[index], 
      text: newText,
      type: newText.includes('printf') ? 'print' : 'other'
    };
    setCodeLines(updatedLines);
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Enter') {
      const newLineId = codeLines.length + 1;
      const newLines = [...codeLines];
      newLines.splice(index + 1, 0, { 
        id: newLineId, 
        text: '', 
        type: 'other' 
      });
      setCodeLines(newLines);
    } else if (event.key === 'Backspace' && event.target.value === '') {
      // Delete the line if backspace is pressed on an empty line
      if (codeLines.length > 2) {
        const newLines = codeLines.filter((_, idx) => idx !== index);
        setCodeLines(newLines);
      }
    }
  };

  const runProgram = () => {
    let currentOutput = '';
    let hasInclude = false;
    const newWarnings = [];

    // Check if include statement exists
    codeLines.forEach(line => {
      if (line.text.includes('#include <stdio.h>')) {
        hasInclude = true;
      }
    });

    // Process printf statements
    codeLines.forEach(line => {
      if (line.text.includes('printf')) {
        // If no include statement, show warning and skip processing
        if (!hasInclude) {
          newWarnings.push(
            "warning: incompatible implicit declaration of built-in function 'printf' [-Wbuiltin-declaration-mismatch]"
          );
          return; // Skip processing printf if no include
        }

        // Extract all printf statements in the line
        const matches = line.text.matchAll(/printf\s*\((".*?")\)/g);
        for (const match of matches) {
          let printText = match[1].replace(/\\n/g, '\n')  // Replace \n with actual newline
                                  .replace(/^"|"$/g, '');  // Remove quotes
          currentOutput += printText;
        }
      }
    });

    setWarnings(newWarnings);
    setOutput(hasInclude ? currentOutput : '');
    setCurrentLine(codeLines.length - 1);
    setInstruction(hasInclude 
      ? "Program execution completed" 
      : "Cannot run program: Missing #include <stdio.h>"
    );
  };

  const resetProgram = () => {
    setCodeLines([
      { id: 1, text: '#include <stdio.h>', type: 'include' },
      { id: 2, text: 'int main() {', type: 'function-start' }
    ]);
    setOutput('');
    setWarnings([]);
    setCurrentLine(0);
    setInstruction("Program reset. Start building again!");
  };

  const deleteLine = (index) => {
    if (codeLines.length > 2) {
      const newLines = codeLines.filter((_, idx) => idx !== index);
      setCodeLines(newLines);
    }
  };

  return (
    <div className="w-full max-w-5xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl shadow-2xl text-white">
      <div className="p-8">
        <h2 className="text-4xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Interactive C Program Printf Simulator
        </h2>
        
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-2xl font-bold mb-4">Code Workspace</h3>
            <div className="bg-gray-800 p-6 rounded-lg border-2 border-blue-500/30">
              {codeLines.map((line, index) => (
                <div
                  key={line.id}
                  className={`flex items-center mb-1 ${
                    index === currentLine 
                      ? "text-green-400 font-bold" 
                      : line.type === 'include' 
                        ? "text-blue-300" 
                        : line.type === 'print'
                          ? "text-purple-300"
                          : "text-gray-300"
                  }`}
                >
                  <span className="mr-4 text-gray-500 w-8">{line.id}.</span>
                  <input 
                    type="text" 
                    value={line.text}
                    onChange={(e) => updateCodeLine(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="bg-gray-700 text-white px-2 py-1 rounded-md w-full"
                    placeholder={
                      index === 0 ? "Include statement" : 
                      index === 1 ? "Main function start" : 
                      "Enter code line"
                    }
                  />
                  {index > 1 && (
                    <button 
                      onClick={() => deleteLine(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
              {/* Closing brace */}
              <div className="flex items-center mb-1 text-red-300">
                <span className="mr-4 text-gray-500 w-8">{codeLines.length + 1}.</span>
                <span className="bg-gray-700 text-white px-2 py-1 rounded-md w-full">"{'}'}"</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-4">Terminal Output</h3>
            <div 
              className="bg-black p-6 rounded-lg border-2 border-green-500/30 min-h-[300px] font-mono"
            >
              {warnings.length > 0 && (
                <div className="text-yellow-400 mb-4">
                  {warnings.map((warning, index) => (
                    <div key={index} className="mb-2">
                      {warning}
                    </div>
                  ))}
                </div>
              )}
              <div className="text-green-400 whitespace-pre-wrap">
                {output || <span className="text-gray-500">No output yet</span>}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center text-yellow-400">
            <ArrowRight className="w-6 h-6 mr-4" />
            <span>{instruction}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={runProgram}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
            >
              <Play className="w-5 h-5" /> Run Program
            </button>
            <button
              onClick={resetProgram}
              className="flex items-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-md transition-colors"
            >
              <Repeat className="w-5 h-5" /> Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicCProgramPrint;