import { useState } from 'react';

import cx from 'classnames';

import Link from 'next/link';

import { motion, PanInfo } from 'framer-motion';

import QUESTIONS from './quiz-data';
import type { Answer, SentenceQuestion } from './quiz-data';

const renderButton = (onClick: () => void, text: string) => (
  <button
    type="button"
    onClick={onClick}
    className="inline-flex h-16 w-64 items-center justify-center gap-x-2 bg-white px-5 text-center text-xl font-bold text-black"
  >
    {text}
  </button>
);

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

const renderFinalScreen = (userCorrectAnswers: number) => {
  return (
    <div>
      <div className="container pt-14 font-serif">
        <p className="text-center text-2xl">
          You answered correctly {userCorrectAnswers} out of 4 questions.
        </p>
        <div className="flex items-center justify-center">
          <Link
            href="/"
            className="flex h-16 w-56 items-center justify-center bg-white px-5 text-center"
          >
            <span className="text-xl font-bold text-black">Discover story.</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

const Circle = ({
  answer,
  setAnswer,
  isSolutionMode,
  isPercentage,
}: {
  answer: number;
  setAnswer: (index: number) => void;
  isSolutionMode: boolean;
  isPercentage: boolean;
}) => {
  const answerToSize = (n: number) => n * 4;
  const handlePan = (_: Event, info: PanInfo) => {
    if (isSolutionMode) return;
    const {
      velocity: { x: xVelocity },
    } = info;
    const newAnswer = Math.round(answer + xVelocity / 100);
    if (newAnswer > -1 && !(isPercentage && newAnswer > 100)) {
      setAnswer(newAnswer);
    }
  };
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div
        className="flex items-center justify-center rounded-full border border-500 text-500"
        onPan={handlePan}
        style={{
          height: answerToSize(answer),
          width: answerToSize(answer),
        }}
        whileTap={{ cursor: !isSolutionMode && 'grabbing' }}
      />
      <div className="pointer-events-none absolute flex h-24 w-24 items-center justify-center">
        {answer}
        {isPercentage && ' %'}
      </div>
    </div>
  );
};

const renderCircles = (
  isSolutionMode: boolean,
  circleAnswer1: number,
  setCircleAnswer1: (index: number) => void,
  circleAnswer2: number,
  setCircleAnswer2: (index: number) => void,
  isPercentage: boolean
) => {
  return (
    <>
      <Circle
        answer={circleAnswer1}
        setAnswer={setCircleAnswer1}
        isSolutionMode={isSolutionMode}
        isPercentage={isPercentage}
      />
      <Circle
        answer={circleAnswer2}
        setAnswer={setCircleAnswer2}
        isSolutionMode={isSolutionMode}
        isPercentage={isPercentage}
      />
    </>
  );
};

const QuizPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSolutionMode, setIsSolutionMode] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | number[] | undefined>();
  const [userCorrectAnswers, setUserCorrectAnswers] = useState<number>(0);
  const currentQuestion = QUESTIONS[currentStep - 1];

  const { question, text, answers, sourceLink, type } = currentQuestion || {};
  const [circleAnswer1, setCircleAnswer1] = useState<number | undefined>(
    answers && parseInt(answers[0].value, 10)
  );
  const [circleAnswer2, setCircleAnswer2] = useState<number | undefined>(
    answers && parseInt(answers[1].value, 10)
  );

  if (!currentQuestion) {
    return renderFinalScreen(userCorrectAnswers);
  }

  const handleAnswerClick = (index?: number) => {
    if (type === 'multiple') {
      setSelectedAnswer(index);
      setIsSolutionMode(true);
      if (answers[index].isCorrect) {
        setUserCorrectAnswers(userCorrectAnswers + 1);
      }
    } else if (type === 'sentence') {
      const { solutions }: { solutions: Answer[] } = currentQuestion as SentenceQuestion;

      setIsSolutionMode(true);
      setCircleAnswer1(parseInt(solutions[0].value, 10));
      setCircleAnswer2(parseInt(solutions[1].value, 10));
    }
  };

  const handleNextClick = () => {
    setCurrentStep(currentStep + 1);
    setIsSolutionMode(false);
  };

  const renderQuestion = () => {
    const { type } = currentQuestion;
    if (type === 'multiple') {
      return (
        <>
          <p className="mb-5 text-2xl text-white">{question}</p>
          <p className="mb-5 text-base leading-snug text-white/80">Select your answer.</p>
          <div className="inline-flex items-start justify-start gap-x-6 pb-6">
            {renderAnswers(answers, handleAnswerClick, isSolutionMode, selectedAnswer as number)}
          </div>
        </>
      );
    }
    return (
      <>
        <p className="mb-5 text-2xl text-white">
          <div
            dangerouslySetInnerHTML={{
              __html: question
                .replace(
                  '<answer1>',
                  `<span class="border-b-2 -translate-y-1.5 border-white text-500 text-lg inline-flex w-20 justify-center">${circleAnswer1}${
                    currentQuestion.isPercentage && ' %'
                  }</span>`
                )
                .replace(
                  '<answer2>',
                  `<span class="border-b-2 -translate-y-1.5 border-white text-500 text-lg inline-flex w-20 justify-center">${circleAnswer2}${
                    currentQuestion.isPercentage && ' %'
                  }</span>`
                ),
            }}
          />
        </p>
        <p className="mb-5 text-base leading-snug text-white/80">
          Drag the circles to change value and validate when you are happy with your answer
        </p>
        <div className="flex h-56 w-full space-y-5">
          {renderCircles(
            isSolutionMode,
            circleAnswer1,
            setCircleAnswer1,
            circleAnswer2,
            setCircleAnswer2,
            currentQuestion.isPercentage
          )}
        </div>
        {!isSolutionMode && (
          <div className="mt-12 flex justify-end">
            {renderButton(handleAnswerClick, 'Validate.')}
          </div>
        )}
      </>
    );
  };
  return (
    <div>
      <div className="container pt-10 pr-36">
        <div className="mb-5 pb-4">
          {renderStep(currentStep, 4)}
          {renderQuestion()}
        </div>
        {isSolutionMode && (
          <div>
            <p className="pb-16 text-sm leading-tight">{text}</p>
            <div className="align-center flex w-full justify-between">
              <a
                href={sourceLink}
                className="text-center text-xs font-light leading-none text-white underline"
              >
                Source
              </a>
              {renderButton(handleNextClick, 'Next.')}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default QuizPage;
