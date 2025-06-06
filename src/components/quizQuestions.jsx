import React, { useState } from "react";
import data from "../data.json";

// Force Tailwind to include these classes: bg-custom-green border-custom-green

const QuizQuestions = ({
  options,
  selectedOption,
  correctAnswer,
  isAnswerSubmitted,
  onOptionSelect,
  isDarkMode,
}) => {

  return (
    <>
      {options.map((option, index) => {
        let buttonClasses = `rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer ${
          isDarkMode 
            ? 'bg-gray-800 hover:bg-gray-700 text-white' 
            : 'bg-white hover:bg-custom-light-grey text-custom-dark'
        }`;
        let characterLetter = `font-medium text-[28px] rounded-lg w-[55px] h-[55px] flex items-center justify-center transition-all duration-300 ${
          isDarkMode 
            ? 'text-gray-300 bg-gray-600' 
            : 'text-custom-grey bg-custom-light-grey'
        }`;
        let checkIcon = "/assets/images/icon-correct.svg"
        let wrongIcon = "/assets/images/icon-incorrect.svg"
        
        if (isAnswerSubmitted) {
          if (index === correctAnswer && index === selectedOption) {
              // User selected the correct answer - show green styling
            buttonClasses += " border-2 border-custom-green";
            characterLetter += " text-white bg-green-500";
          } else if (index === selectedOption && index !== correctAnswer) {
            // User selected wrong answer - show red styling
            buttonClasses += " border-2 border-custom-red";
            characterLetter += " text-white bg-custom-red";
          }
          // Note: If index === correctAnswer but not selected, no special styling (just the icon)
        } else if (index === selectedOption) {
          // Selected but not submitted yet - show selection highlight
          buttonClasses += " border-2 border-custom-purple";
          characterLetter += " text-white bg-custom-purple";
        }
        
        return (
          <button
            key={index}
            className={buttonClasses}
            onClick={() => {
              onOptionSelect(index);
            }}
          >
            <div className="flex items-center gap-4">
              <h1 className={characterLetter}>
                {String.fromCharCode(65 + index)}
              </h1>
              <span className={`font-medium md:text-3xl text-2xl transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-custom-dark'
              }`}>{option}</span>
              {isAnswerSubmitted && index === correctAnswer && (
                <span className="ml-auto">
                  <img className="w-[24px] h-[24px]" src={checkIcon} alt="check" />
                </span>
              )}
              {isAnswerSubmitted && index === selectedOption && index !== correctAnswer && (
                <span className="ml-auto">
                  <img className="w-[24px] h-[24px]" src={wrongIcon} alt="x" />
                </span>
              )}
            </div>
          </button>
        );
      })}
    </>
  );
};

export default QuizQuestions;