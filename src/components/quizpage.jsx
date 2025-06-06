import React, { useState } from "react";
import data from "../data.json";
import QuizQuestions from "./quizQuestions";
import MaxWidthWrapper from "./common/MaxWidthWrapper";
import ScorePage from "./scorePage";

const QuizPage = ({ quizTitle, isDarkMode: parentDarkMode, toggleDarkMode: parentToggleDarkMode }) => {
  const { quizzes } = data;
  const currentQuiz = quizzes.find((quiz) => quiz.title === quizTitle);

  const questions = currentQuiz?.questions || [];

  //check current current question index
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  //check question correct score
  const [correctScore, setCorrectScore] = useState(0);
  //check if quiz is completed
  const [quizCompleted, setQuizCompleted] = useState(false);
  //check the selected option
  const [selectedOption, setSelectedOption] = useState(null);
  // Add this new state
  const [showNoSelectionError, setShowNoSelectionError] = useState(false);
  // Use parent dark mode state if provided, otherwise use local state
  const [localDarkMode, setLocalDarkMode] = useState(false);
  const isDarkMode = parentDarkMode !== undefined ? parentDarkMode : localDarkMode;
  const toggleDarkMode = parentToggleDarkMode || (() => setLocalDarkMode(!localDarkMode));

  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  
  // Convert answer string to index
  const correctAnswerIndex = currentQuestion?.options.findIndex(
    option => option === currentQuestion.answer 
  );

  const handleNoSelection = () => {
    return (
      <div className="text-custom-red text-center justify-center items-center flex gap-2 mt-(-50px)">
         <span className="ml-2">
          <img src="/assets/images/icon-incorrect.svg" alt="error" />
        </span>
        <p>Please select an answer</p>
      </div>
    );
  };

  const handleAnswerSubmit = (index) => {
    if (isAnswerSubmitted) return; // Prevent changing answer after submission
    setSelectedOption(index);
    // Clear the error message when an option is selected
    setShowNoSelectionError(false);
  };

  const goToNextQuestion = () => {
    if (selectedOption === correctAnswerIndex) {
      setCorrectScore(correctScore + 1);
    }

    setIsAnswerSubmitted(false);
    // Clear the error message when moving to next question
    setShowNoSelectionError(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
    } else {
      setQuizCompleted(true);
    }
  };

  if (quizCompleted) {
    return (
      <ScorePage
        overallScore={correctScore}
        scoreLength={questions.length}
        quizTitle={quizTitle}
        isDarkMode={isDarkMode}
      />
    );
  }
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
        <section className="relative min-h-screen flex flex-col">
          {/* Dark Mode Toggle */}
          <div className="absolute top-8 right-8 z-10">
            <button
              onClick={toggleDarkMode}
              className={`flex items-center gap-3 p-3 rounded-full transition-all duration-300 ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              <img 
                src={isDarkMode ? "/assets/images/icon-sun-light.svg" : "/assets/images/icon-moon-dark.svg"} 
                alt="theme toggle" 
                className="w-6 h-6"
              />
              <div className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${
                isDarkMode ? 'bg-custom-purple' : 'bg-gray-400'
              }`}>
                <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-white transition-transform duration-300 ${
                  isDarkMode ? 'translate-x-6' : 'translate-x-0.5'
                }`}></div>
              </div>
            </button>
          </div>

          {/* Quiz Title - Above everything */}
          <div className="mb-8 pt-8">
            <span className="flex items-center gap-4">
              <img src={currentQuiz.icon} alt="quizIcon" className={`w-[50px] h-[50px] rounded-lg ${currentQuiz.backgroundColor} p-2`} />
              <p className={`text-start text-[28px] font-medium ${isDarkMode ? 'text-white' : 'text-custom-dark'}`}>{currentQuiz.title}</p>
            </span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-start flex-1">
            {/* Left side - Text content */}
            <div className="flex flex-col">
              <p className={`text-start text-[20px] mb-4 ${isDarkMode ? 'text-gray-300' : 'text-custom-grey'}`}> {`Question ${currentQuestionIndex + 1} of ${questions.length}`}</p>
              <h1 className={`text-[20px] md:text-4xl mb-12 font-medium ${isDarkMode ? 'text-white' : 'text-custom-dark'}`}>
                {currentQuestion.question}
              </h1>
              <div className={`flex flex-start w-[80%] h-[6px] rounded-full mt-52 ${isDarkMode ? 'bg-gray-700' : 'bg-white'}`}>
                <div className="bg-custom-purple h-full rounded-full" style={{ width: `${(currentQuestionIndex + 1) / questions.length * 100}%` }}></div>
              </div>
            </div>
            

            {/* Right side - Features */}
            <div className="grid grid-cols-1 gap-6">
              <QuizQuestions
                options={currentQuestion.options}
                selectedOption={selectedOption}
                correctAnswer={correctAnswerIndex}
                isAnswerSubmitted={isAnswerSubmitted}
                onOptionSelect={handleAnswerSubmit}
                overallScore={correctScore}
                scoreLength={questions.length}
                currentQuiz={currentQuiz}
                isDarkMode={isDarkMode}
              />
              
           
              
              <button
                onClick={() => {
                  console.log("Answer string:", currentQuestion.answer);
                  console.log("Correct answer index:", correctAnswerIndex);
                  if (selectedOption === null) {
                    // Show error message when no selection is made
                    setShowNoSelectionError(true);
                    return;
                  }
                  if (!isAnswerSubmitted) {
                    setIsAnswerSubmitted(true);
                  } else {
                    goToNextQuestion();
                  }
                }}
                className="bg-custom-purple rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 cursor-pointer mt-4 mb-10"
              >
                <h1 className="text-white font-medium text-[28px] flex items-center justify-center">
                  {isAnswerSubmitted ? "Next Question" : "Submit Answer"}
                </h1>
              </button>
              
              {/* Only show error message when submit was clicked with no selection */}
              {showNoSelectionError && (
                <div className="text-custom-red text-center mb-10">{handleNoSelection()}</div>
              )}
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
};
export default QuizPage;
