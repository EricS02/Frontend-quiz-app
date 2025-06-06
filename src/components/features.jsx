import React from "react";
import data from "../data.json";

const Features = ({ onClick, isDarkMode }) => {
  const {quizzes} = data;


  const backgroundColor = [
    'bg-custom-orange',
    'bg-custom-light-green',
    'bg-custom-blue',
    'bg-custom-light-purple'
  ]
  return (
    <>
      {quizzes.map((feature, index) => (
        <div
          key={index}
          className={`rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6 cursor-pointer ${
            isDarkMode 
              ? 'bg-gray-800 hover:bg-gray-700 text-white' 
              : 'bg-white hover:bg-custom-light-grey text-custom-dark'
          }`}
          onClick={() => {onClick(feature.title)}}
        >
          <div className="flex items-center gap-4">
            <img src={feature.icon} alt={feature.title} className={`${backgroundColor[index]} rounded-lg  flex items-center justify-center p-2`} />
            <span className={`font-medium md:text-3xl text-2xl flex items-center justify-center transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-custom-dark'
            }`}>
              {feature.title}
            </span>
          </div>
        </div>
      ))}
    </>
  );
};

export default Features;
