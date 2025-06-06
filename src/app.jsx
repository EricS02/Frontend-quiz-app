import MaxWidthWrapper from "./components/common/MaxWidthWrapper";
import Features from "./components/features";
import QuizPage from "./components/quizpage";
import { useState } from "react";
function App() {
  const [quizTitle, setQuizTitle] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  function handleClick(title) {
    setQuizTitle(title);
    console.log(title);
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  if (quizTitle) {
    return (
      <QuizPage
        quizTitle={quizTitle}
        onBackClick={() => setQuizTitle(null)}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
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
        <section className="relative min-h-screen flex items-start">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center">
            {/* Left side - Text content */}
            <div className="flex flex-col -mt-20">
              <h1 className={`text-4xl md:text-6xl mb-12 font-light ${isDarkMode ? 'text-white' : 'text-custom-dark'}`}>
                Welcome to the
                <span className="text-4xl md:text-6xl font-bold bg-clip-text block">
                  Frontend Quiz!
                </span>
              </h1>

              <p className={`text-[20px] italic ${isDarkMode ? 'text-gray-300' : 'text-custom-grey'}`}>
                Pick a subject to get started.
              </p>
            </div>

            {/* Right side - Features */}
            <div className="grid grid-cols-1 gap-6 translate-y-10">
              <Features onClick={handleClick} isDarkMode={isDarkMode} />
            </div>
          </div>
        </section>
      </MaxWidthWrapper>
    </div>
  );
}

export default App;
