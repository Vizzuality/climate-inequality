import { motion } from 'framer-motion';

import SocialIcons from 'containers/social-icons/component';

import { Button, LinkAnchor } from 'components/button/component';
import Icon from 'components/icon/component';

import CorrectIcon from 'svgs/ui/correct.svg';
import IncorrectIcon from 'svgs/ui/wrong.svg';

type FinalScreenProps = {
  userAnswers: boolean[];
  handleTryAnother: () => void;
  isLast?: boolean;
};

const contentTransition = { duration: 1, delay: 1 };

const Answers = ({ userAnswers }: Pick<FinalScreenProps, 'userAnswers'>) => (
  <motion.div
    initial={{ width: 0 }}
    animate={{ width: 200 }}
    transition={contentTransition}
    className="flex h-8 justify-between gap-6"
  >
    {userAnswers.map((answer, i) => (
      <motion.div
        key={i}
        initial={{ translateX: 0 }}
        animate={{ translateX: 56 * i }}
        className="absolute h-8 w-8 shrink-0"
        transition={contentTransition}
      >
        <Icon icon={answer ? CorrectIcon : IncorrectIcon} className="h-8 w-8" />
      </motion.div>
    ))}
  </motion.div>
);

const PositionAnimation = ({
  children,
  position,
}: {
  children: JSX.Element;
  position: 'top' | 'bottom';
}) => {
  return (
    <motion.div
      initial={{ translateY: position === 'top' ? '-300%' : '300%' }}
      animate={{ translateY: 0 }}
      transition={contentTransition}
    >
      {children}
    </motion.div>
  );
};

const FinalScreen = ({ userAnswers, handleTryAnother, isLast }: FinalScreenProps) => {
  const correctAnswers = userAnswers.reduce((acc, answer) => (answer ? acc + 1 : acc), 0);

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={contentTransition}
        className="container flex h-full w-full flex-1 flex-col items-center justify-between pt-6 pb-6 font-sans xl:pt-10 xl:pb-9"
      >
        <div className="z-10 flex flex-1 flex-col justify-center">
          <div className="text-center">
            <PositionAnimation position="top">
              <h1 className="mb-4 font-serif text-2xl font-normal leading-tight sm:text-[40px]">
                Thank you for taking the inequality quiz.
              </h1>
            </PositionAnimation>
            <p className="hidden font-sans text-md font-light sm:block">
              Inequality is a complex issue that affects individuals and communities in various
              ways.
            </p>
            <p className="hidden font-sans text-md font-light sm:block">
              By sharing knowledge on the causes and consequences of inequality, we can identify
              solutions and work towards creating a more just and equitable society.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center pt-6 sm:pt-14">
            <Answers userAnswers={userAnswers} />
            <p className="mt-4 text-sm font-semibold sm:text-md">
              You scored {correctAnswers} out of 4 questions.
            </p>
          </div>
          <div className="mt-8 flex flex-col items-center justify-center sm:mt-10">
            {!isLast && (
              <div className="flex w-full flex-col items-center justify-center text-center">
                <p className="hidden sm:block">
                  Try another quiz or learn more about climate inequality and how we can tackle it.
                </p>
                <motion.div
                  initial={{ width: 200 }}
                  animate={{ width: 390 }}
                  className="flex items-center justify-center overflow-hidden sm:mt-8"
                  transition={contentTransition}
                >
                  <Button
                    theme="white"
                    size="s"
                    className="w-[267px] py-5 text-md font-semibold text-black sm:w-[390px]"
                    onClick={handleTryAnother}
                  >
                    Try another quiz
                  </Button>
                </motion.div>
                <PositionAnimation position="bottom">
                  <LinkAnchor
                    size="xl"
                    theme="primary-alt"
                    className="mt-4 border-none px-5 text-md font-semibold"
                    href="/"
                  >
                    Explore climate inequality and solutions.
                  </LinkAnchor>
                </PositionAnimation>
              </div>
            )}
          </div>
        </div>
        <div className="mt-auto flex flex-col items-center justify-center">
          <PositionAnimation position="bottom">
            <>
              <p className="mb-3 text-center text-sm font-semibold">Share</p>
              <SocialIcons isShare className="flex gap-4" />
            </>
          </PositionAnimation>
        </div>
      </motion.div>
      <div className="fixed top-0 left-0 -z-10 flex min-h-screen w-full items-center justify-center">
        <motion.div
          initial={{ opacity: 0, height: '50vh', width: '50vw' }}
          animate={{ opacity: 0.3, height: '100vh', width: '100vw' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="animated bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/quizz-final-bg.png')" }}
        ></motion.div>
      </div>
    </>
  );
};

export default FinalScreen;
