import { useCallback } from 'react';

import { motion } from 'framer-motion';
import { usePlausible } from 'next-plausible';

import Button from 'components/button';

const Skip = () => {
  const plausible = usePlausible();

  const scrollTo = useCallback((id) => {
    document.documentElement.className = '';

    const getPageYOffset = () => {
      return (
        window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
      );
    };

    const $scrollEl = document.getElementById(id);
    const $header = document.getElementById('header');
    const y =
      $scrollEl.getBoundingClientRect().top +
      getPageYOffset() +
      -$header.getBoundingClientRect().height;

    window.scrollTo({
      top: y,
      // behavior: 'smooth',
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0, transition: { delay: 1 } }}
      key="step-navigation"
      className="absolute z-20 top-4 md:top-auto md:bottom-7 right-4"
    >
      <Button
        theme="secondary"
        size="xs"
        onClick={() => {
          scrollTo('about');
          plausible('skip-intro');
        }}
      >
        Skip intro
      </Button>
    </motion.div>
  );
};

export default Skip;
