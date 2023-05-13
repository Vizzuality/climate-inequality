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

const FinalScreen = ({ userAnswers, handleTryAnother, isLast }: FinalScreenProps) => {
  const correctAnswers = userAnswers.reduce((acc, answer) => (answer ? acc + 1 : acc), 0);

  const Answers = () => (
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

  // const SizeAnimation = ({ children }) => {
  //   return (
  //     <motion.div
  //       initial={{ width: 0 }}
  //       className="size-animation overflow-hidden"
  //       animate={{ width: '100%' }}
  //     >
  //       {children}
  //     </motion.div>
  //   );
  // };

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

  return (
    <div className="container flex h-full w-full flex-1 items-center justify-center overflow-hidden pt-10 pb-9 font-sans">
      {/* <AnimatePresence> */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={contentTransition}
      >
        <div className="z-10">
          <div className="text-center">
            <PositionAnimation position="top">
              <h1 className="mb-4 font-serif text-[40px] font-normal leading-tight">
                Thank you for taking the inequality quiz.
              </h1>
            </PositionAnimation>
            <p className="font-sans text-md font-light">
              Inequality is a complex issue that affects individuals and communities in various
              ways. By sharing knowledge on the causes and consequences of inequality, we can
              identify solutions and work towards creating a more just and equitable society.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center pt-14">
            {/* <SizeAnimation> */}
            <Answers />
            {/* </SizeAnimation> */}
            <p className="mt-4 text-md font-semibold">
              You scored {correctAnswers} out of 4 questions.
            </p>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center">
            {!isLast && (
              <div className="flex flex-col items-center justify-center">
                <p>
                  Try another quiz or learn more about climate inequality and how we can tackle it.
                </p>
                <motion.div
                  initial={{ width: 200 }}
                  animate={{ width: 390 }}
                  className="button-animation mt-8 flex items-center justify-center overflow-hidden"
                  transition={contentTransition}
                >
                  <Button
                    theme="white"
                    size="s"
                    className="py-5 text-md font-semibold text-black sm:w-[390px]"
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
        <PositionAnimation position="bottom">
          <div className="mt-auto flex flex-col items-center justify-center">
            <p className="mb-3 text-center text-sm font-semibold">Share</p>
            <SocialIcons isShare className="flex gap-4" />
          </div>
        </PositionAnimation>
      </motion.div>
      {/* </AnimatePresence> */}
      <div className="absolute top-0 left-0 -z-10 flex h-screen w-screen items-center justify-center">
        {/* <AnimatePresence> */}
        <motion.div
          initial={{ opacity: 0, height: '50vh', width: '50vw' }}
          animate={{ opacity: 0.3, height: '100vh', width: '100vw' }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="animated bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/quizz-final-bg.png')" }}
        ></motion.div>
        {/* </AnimatePresence> */}
      </div>
    </div>
  );
};

export default FinalScreen;
