import cx from 'classnames';

import Link from 'next/link';

import { motion, PanInfo } from 'framer-motion';
import { throttle } from 'lodash-es';

import { Answer } from '../quiz-data';

export const renderButton = (onClick: () => void, text: string) => (
  <button
    type="button"
    onClick={onClick}
    className="flex h-16 w-64 items-center justify-center gap-x-2 bg-white px-5 text-center text-xl font-bold text-black transition-all duration-500 hover:bg-opacity-60"
  >
    {text}
  </button>
);

export const renderStep = (step: number, totalSteps: number) => (
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
        <span
          dangerouslySetInnerHTML={{ __html: value }}
          className="text-center text-xl font-bold"
        />
      </>
    </button>
  );
};

export const renderAnswers = (
  answers: Answer[],
  handleAnswerClick: (index: number) => void,
  isSolutionMode: boolean,
  selectedAnswer: number | undefined
) =>
  answers.map((answer, i) =>
    renderAnswer(i, answer, handleAnswerClick, isSolutionMode, selectedAnswer === i)
  );

export const renderFinalScreen = (userCorrectAnswers: number) => {
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

export const Circle = ({
  answer,
  setAnswer,
  isSolutionMode,
  isPercentage,
  max,
}: {
  answer: number;
  setAnswer: (index: number) => void;
  isSolutionMode: boolean;
  isPercentage: boolean;
  max: number;
}) => {
  const answerToSize = (n: number) => n * 2.5 * (100 / max);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const handlePan = throttle((_: Event, info: PanInfo) => {
    if (isSolutionMode) return;
    const {
      delta: { x: xDelta },
    } = info;
    const newAnswer = Math.round(answer + xDelta);

    if (newAnswer !== answer && newAnswer > -1 && !(isPercentage && newAnswer > 100)) {
      if (!isPercentage && newAnswer > max) return;
      setAnswer(newAnswer);
    }
  }, 10);

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div
        className="hover:border-3 flex items-center justify-center rounded-full border-2 border-500 text-500 hover:cursor-grab"
        onPan={handlePan}
        style={{
          height: answerToSize(answer || 1),
          width: answerToSize(answer || 1),
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

export const renderCircles = (
  isSolutionMode: boolean,
  circleAnswer1: number,
  setCircleAnswer1: (index: number) => void,
  circleAnswer2: number,
  setCircleAnswer2: (index: number) => void,
  isPercentage: boolean,
  max = 100
) => {
  return (
    <>
      <Circle
        answer={circleAnswer1}
        setAnswer={setCircleAnswer1}
        isSolutionMode={isSolutionMode}
        isPercentage={isPercentage}
        max={max}
      />
      <Circle
        answer={circleAnswer2}
        setAnswer={setCircleAnswer2}
        isSolutionMode={isSolutionMode}
        isPercentage={isPercentage}
        max={max}
      />
    </>
  );
};
