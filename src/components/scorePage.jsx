import React from "react";
import MaxWidthWrapper from "./common/MaxWidthWrapper";
import data from "../data.json";

const ScorePage = ({ overallScore, scoreLength, quizTitle, isDarkMode }) => {
  console.log(quizTitle);
  const { quizzes } = data;
  const currentQuiz = quizzes.find((quiz) => quiz.title === quizTitle);
  console.log("currentQuiz:", currentQuiz);

  return (
    <div
      className={`font-rubik min-h-screen transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-custom-dark text-white' 
          : 'bg-white text-custom-dark'
      }`}
      style={{
        backgroundImage: isDarkMode
          ? "url('/assets/images/pattern-background-desktop-dark.svg')"
          : "url('/assets/images/pattern-background-desktop-light.svg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <MaxWidthWrapper>
        <section className="relative min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">
            {/* Left side - Text content */}
            <div className="flex flex-col -mt-20">
              <h1 className={`text-4xl md:text-6xl mb-12 font-light transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-custom-dark'
              }`}>
                Quiz Completed
                <span className="text-4xl md:text-6xl font-bold bg-clip-text block">
                  You scored...
                </span>
              </h1>
            </div>

            {/* Right side Score */}
            <div className="grid grid-cols-1 gap-6 translate-y-16 text-center justify-center items-center">
              <div className={`flex flex-col items-center justify-center rounded-2xl p-12 h-[300px] transition-all duration-300 ${
                isDarkMode ? 'bg-gray-800' : 'bg-custom-light-grey'
              }`}>
              <span className="flex items-center gap-4 mb-6 ">
                <img src={currentQuiz.icon} alt="quizIcon" className={`w-[50px] h-[50px] rounded-lg ${currentQuiz.backgroundColor} p-2`} />
                <p className={`text-start text-[28px] font-medium transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-custom-dark'
                }`}>{currentQuiz.title}</p>
              </span>
                <h1 className={`text-4xl md:text-[144px] mb-10 font-bold mt-10 transition-colors duration-300 ${
                  isDarkMode ? 'text-white' : 'text-custom-dark'
                }`}>
                  {overallScore}
                </h1>
                <p className={`text-[20px] mt-10 transition-colors duration-300 ${
                  isDarkMode ? 'text-gray-300' : 'text-custom-grey'
                }`}>
                  out of {scoreLength}
                </p>
              </div>
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="bg-custom-purple rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer mt-4 mb-10"
              >
                <h1 className="text-white font-medium text-[28px] flex items-center justify-center">
                  Play Again
                </h1>
              </button>
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
};

export default ScorePage;
