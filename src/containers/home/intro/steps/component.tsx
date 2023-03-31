import { motion, AnimatePresence } from 'framer-motion';

import { STEPS } from '../constants';

const Steps = () => {
  const step = 0;

  return (
    <div className="absolute top-0 left-0 z-10 flex h-full w-full items-center justify-center">
      <AnimatePresence>
        {STEPS.map(({ id, content }) => {
          if (id !== step) {
            return null;
          }

          return (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.33 } }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.5 }}
              className="absolute top-0 left-0 flex h-full w-full flex-col items-center justify-center px-10 text-center text-lg text-white md:text-xl"
            >
              {content}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Steps;
