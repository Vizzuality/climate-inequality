import { useState, useEffect } from 'react';

import { renderAnswers, renderCircles, renderButton, renderStep } from './components';
import FinalScreen from './components/final-screen';
import type { Question, SentenceQuestion } from './quiz-data';
import { useQuestions } from './utils';

const QuizPage: React.FC = () => {
  const [isSolutionMode, setIsSolutionMode] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | number[] | undefined>();
  const {
    getToNextQuestion,
    goToNextGroup,
    isLastGroup,
    showResult,
    currentQuestion,
    currentStep,
    userAnswers,
    addUserAnswer,
  } = useQuestions();

  const { question, text, answers, sourceLink, type } = currentQuestion || {};

  const [circleAnswer1, setCircleAnswer1] = useState<number | undefined>(
    answers && parseInt(answers[0].value, 10)
  );
  const [circleAnswer2, setCircleAnswer2] = useState<number | undefined>(
    answers && parseInt(answers[1].value, 10)
  );

  useEffect(() => {
    if (type === 'sentence') {
      setCircleAnswer1(answers && parseInt(answers[0].value, 10));
      setCircleAnswer2(answers && parseInt(answers[1].value, 10));
    }
  }, [answers, type]);

  const canAdjustAnswer =
    !isSolutionMode &&
    currentQuestion?.type === 'sentence' &&
    (currentQuestion.isComplementary ||
      (currentQuestion.isDependent && circleAnswer2 + circleAnswer1 > 100));

  // Those useEffects are used to make the circles values complementary
  useEffect(() => {
    if (canAdjustAnswer) {
      setCircleAnswer1(100 - circleAnswer2);
    }
  }, [circleAnswer2]);

  useEffect(() => {
    if (canAdjustAnswer) {
      setCircleAnswer2(100 - circleAnswer1);
    }
  }, [circleAnswer1]);

  if (showResult) {
    return (
      <FinalScreen
        isLast={isLastGroup}
        userAnswers={userAnswers}
        handleTryAnother={goToNextGroup}
      />
    );
  }

  const getQuestion = (question: Question): SentenceQuestion => {
    return question.type === 'sentence' && question;
  };

  const handleAnswerClick = (index?: number) => {
    let isCorrect = false;
    if (type === 'multiple') {
      setSelectedAnswer(index);

      isCorrect = answers[index].isCorrect;
    } else if (type === 'sentence') {
      const { solutions, max } = getQuestion(currentQuestion);
      //  Returns true if both answers are within 10% of the solution.
      isCorrect = [circleAnswer1, circleAnswer2].every((answer, i) => {
        const solution = Number(solutions[i].value);
        const tenPercentOfMax = max * 0.1;
        const minCorrectAnswer = solution - tenPercentOfMax;
        const maxCorrectAnswer = solution + tenPercentOfMax;
        return answer >= minCorrectAnswer && answer <= maxCorrectAnswer;
      });
      // Set the correct answers
      setCircleAnswer1(parseInt(solutions[0].value, 10));
      setCircleAnswer2(parseInt(solutions[1].value, 10));
    }
    addUserAnswer(isCorrect);
    setIsSolutionMode(true);
  };

  const handleNextClick = () => {
    getToNextQuestion();
    setIsSolutionMode(false);
  };

  return (
    <div className="flex flex-1 flex-col">
      <div className="container pt-10">
        <div className="mb-5 pb-4">
          {renderStep(currentStep, 4)}
          <div className="mt-3">
            {!currentQuestion ? null : currentQuestion?.type === 'multiple' ? (
              <>
                <div className="mb-5 text-2xl leading-tight text-white">{question}</div>
                <p className="mb-14 text-base leading-snug text-white/80">Select your answer.</p>
                <div className="inline-flex w-full items-start justify-between gap-x-6">
                  {renderAnswers(
                    answers,
                    handleAnswerClick,
                    isSolutionMode,
                    selectedAnswer as number
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="mb-5 text-2xl leading-tight text-white">
                  <div>
                    {question[0]}
                    <div className="mx-2 inline-flex w-20 -translate-y-1.5 justify-center border-b-2 border-white text-lg text-500">
                      {circleAnswer1}
                      {currentQuestion.isPercentage ? ' %' : ''}
                    </div>
                    {question[1]}
                    <div className="mx-2 inline-flex w-20 -translate-y-1.5 justify-center border-b-2 border-white text-lg text-500">
                      {circleAnswer2}
                      {currentQuestion.isPercentage ? ' %' : ''}
                    </div>
                    {question[2]}
                  </div>
                </div>
                <p className="mb-5 text-base leading-snug text-white/80">
                  Drag the circles to change value and validate when you are happy with your answer
                </p>
                <div className="flex h-56 w-full">
                  {renderCircles(
                    isSolutionMode,
                    circleAnswer1,
                    setCircleAnswer1,
                    circleAnswer2,
                    setCircleAnswer2,
                    currentQuestion?.isPercentage,
                    currentQuestion?.max
                  )}
                </div>
                {!isSolutionMode && (
                  <div className="mt-12 flex justify-end">
                    {renderButton(handleAnswerClick, 'Validate.')}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {isSolutionMode && (
          <div>
            <div className="pb-16 text-sm leading-tight">{text}</div>
            <div className="align-center flex w-full justify-between">
              <a
                href={sourceLink}
                target="_blank"
                className="text-center text-xs font-light leading-none text-white underline"
                rel="noreferrer"
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
