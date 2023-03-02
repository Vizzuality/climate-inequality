import { useState } from 'react';

import cx from 'classnames';

import QUESTIONS from './quiz-data';
import type { Answer } from './quiz-data';

const renderStep = (step: number, totalSteps: number) => (
  <div className="font-semibold text-white">
    0{step}
    <span className="text-white/20"> — 0{totalSteps}</span>
  </div>
);

const wrongIcon = () => (
  <div className="absolute top-4">
    <div className="relative flex h-6 w-6 items-center justify-center rounded-full border border-solid border-500">
      <svg
        width="17"
        height="18"
        viewBox="0 0 17 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-500"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.7426 4.75741C12.3521 4.36689 11.719 4.36689 11.3284 4.75741L8.5 7.58584L5.67157 4.75741C5.28105 4.36689 4.64788 4.36689 4.25736 4.75741C3.86684 5.14794 3.86684 5.7811 4.25736 6.17162L7.08579 9.00005L4.25736 11.8285C3.86684 12.219 3.86684 12.8522 4.25736 13.2427C4.64788 13.6332 5.28105 13.6332 5.67157 13.2427L8.5 10.4143L11.3284 13.2427C11.719 13.6332 12.3521 13.6332 12.7426 13.2427C13.1332 12.8522 13.1332 12.219 12.7426 11.8285L9.91421 9.00005L12.7426 6.17162C13.1332 5.7811 13.1332 5.14794 12.7426 4.75741Z"
        />
      </svg>
    </div>
  </div>
);

const correctIcon = () => (
  <div className="absolute top-4">
    <div className="relative flex h-6 w-6 items-center justify-center rounded-full bg-black">
      <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          className="stroke-500"
          d="M0 4L3.5 7.5L10.5 0.5"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  </div>
);

const renderAnswer = (
  index: number,
  answer: Answer,
  handleAnswerClick: (index: number) => void,
  isSolutionMode: boolean,
  isSelectedAnswer: boolean
) => {
  const { value, isCorrect } = answer;
  return (
    <button
      key={index}
      onClick={() => !isSolutionMode && handleAnswerClick(index)}
      className={cx(
        'duration-250 relative flex h-44 w-44 flex-1 items-center justify-center gap-x-2 rounded-sm border border-500 transition-colors',
        {
          'cursor-pointer text-500 hover:bg-500 hover:text-black': !isSolutionMode,
          'cursor-default bg-500 text-black': isSolutionMode && isCorrect,
          'cursor-default border-500/50 text-500/50': isSolutionMode && !isCorrect,
        }
      )}
    >
      <>
        {isSolutionMode && isCorrect && correctIcon()}
        {isSolutionMode && isSelectedAnswer && !isCorrect && wrongIcon()}
        <span className="text-center text-xl font-bold">{value}</span>
      </>
    </button>
  );
};

const renderAnswers = (
  answers: Answer[],
  handleAnswerClick: (index: number) => void,
  isSolutionMode: boolean,
  selectedAnswer: number | undefined
) =>
  answers.map((answer, i) =>
    renderAnswer(i, answer, handleAnswerClick, isSolutionMode, selectedAnswer === i)
  );

const QuizPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSolutionMode, setIsSolutionMode] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | undefined>();

  const handleAnswerClick = (index: number) => {
    setSelectedAnswer(index);
    setIsSolutionMode(true);
  };

  const handleNextClick = () => {
    setCurrentStep(currentStep + 1);
    setIsSolutionMode(false);
  };

  const currentQuestion = QUESTIONS[currentStep - 1];
  const { text, answers, sourceLink } = currentQuestion;
  return (
    <div>
      <div className="container pt-14 pr-36">
        <div className="space-y-5 pb-10">
          {renderStep(currentStep, 4)}
          <p className="text-2xl text-white">
            How many people die every day in consequence of some form of inequality?
          </p>
          <p className="text-zinc-100 text-base leading-snug">Select your answer.</p>
        </div>
        <div className="inline-flex items-start justify-start gap-x-6 pb-6">
          {renderAnswers(answers, handleAnswerClick, isSolutionMode, selectedAnswer)}
        </div>
        {isSolutionMode && (
          <div>
            <p className="pb-16 text-sm  leading-tight">{text}</p>
            <div className="align-center flex w-full justify-between">
              <a
                href={sourceLink}
                className="text-center text-xs font-light leading-none text-white underline"
              >
                Source
              </a>
              <button
                onClick={handleNextClick}
                className="inline-flex h-16 w-64 items-center justify-center gap-x-2 bg-white px-5 text-center text-xl font-bold text-black"
              >
                Next.
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default QuizPage;
