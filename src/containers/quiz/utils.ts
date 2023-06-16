import { useCallback, useEffect, useMemo, useState } from 'react';

import { GAEvent } from 'lib/analytics/ga';

import QUESTIONS, { Question } from './quiz-data';

const GROUPS_NUMBER = 4;
const QUESTIONS_NUMBER = 4;

export const useQuestions = () => {
  const [group, setGroup] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [userAnswers, setUserAnswers] = useState<boolean[]>([]);

  const currentQuestion: Question = useMemo(
    () => questions[currentStep - 1],
    [questions, currentStep]
  );

  const getToNextQuestion = useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, [currentStep]);

  const goToNextGroup = useCallback(() => {
    setGroup(group + 1);
    GAEvent({ action: 'level_up', params: { level: group + 1, character: 'User' } });
    setCurrentStep(1);
    setUserAnswers([]);
  }, [group]);

  const addUserAnswer = useCallback(
    (isCorrect: boolean) => {
      setUserAnswers([...userAnswers, isCorrect]);
    },
    [userAnswers]
  );

  // Generate new questions every time the group changes
  useEffect(() => {
    const newQuestions: Question[] = [];

    /** Array of the indexes of available questions on QUESTIONS */
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const storedAvailableQuestionsId: number[] = JSON.parse(
      localStorage.getItem('available-questions')
    );

    let availableQuestionsId: number[] =
      group === 1 ? [...Array(QUESTIONS.length).keys()] : storedAvailableQuestionsId;

    // This code selects random questions from a list of available questions
    // The selected question is added to the new questions array and removed from the available questions array
    for (let i = 0; i < QUESTIONS_NUMBER; i++) {
      const availableQuestions = QUESTIONS.filter(({ id }) => availableQuestionsId.includes(id));
      const randomIndex = Math.floor(Math.random() * availableQuestionsId.length);
      const newQuestion = availableQuestions[randomIndex];
      newQuestions.push(newQuestion);
      availableQuestionsId = availableQuestionsId.filter((i) => i !== newQuestion.id);
    }
    localStorage.setItem('available-questions', JSON.stringify(availableQuestionsId));
    setQuestions(newQuestions);
  }, [group]);

  return {
    questions,
    group,
    goToNextGroup,
    getToNextQuestion,
    currentQuestion,
    currentStep,
    isLastGroup: group === GROUPS_NUMBER,
    showResult: currentStep === QUESTIONS_NUMBER + 1,
    userAnswers,
    addUserAnswer,
  };
};
