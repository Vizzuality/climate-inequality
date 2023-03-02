export type Answer = { value?: string; isCorrect?: boolean };

export type Question = {
  sourceLink: string;
  answers: Answer[];
  text: React.ReactElement;
};

const QUESTIONS: Question[] = [
  {
    answers: [
      { value: '3,400', isCorrect: true },
      { value: '400' },
      { value: '400' },
      { value: '0' },
    ],
    text: (
      <div key="0">
        {' '}
        Inequality can manifest in many ways and can have a wide range of negative consequences on
        individuals and communities, including increased mortality.{' '}
        <span className="text-500">
          It is estimated that every 4 seconds, one person dies as a result of inequality
        </span>
        , primarily due to issues such as hunger, lack of access to healthcare, climate breakdown in
        low-income countries, and gender-based violence. This amounts to over{' '}
        <span className="text-500">21,300 deaths per day</span>.
      </div>
    ),
    sourceLink: '#',
  },
  {
    answers: [{ value: '00', isCorrect: true }, { value: '400' }, { value: '400' }, { value: '0' }],
    text: (
      <div key="1">
        {' '}
        Other
        <span className="text-500">
          It is estimated that every 4 seconds, one person dies as a result of inequality
        </span>
        , primarily due to issues such as hunger, lack of access to healthcare, climate breakdown in
        low-income countries, and gender-based violence. This amounts to over{' '}
        <span className="text-500">21,300 deaths per day</span>.
      </div>
    ),
    sourceLink: '#',
  },
];

export default QUESTIONS;
