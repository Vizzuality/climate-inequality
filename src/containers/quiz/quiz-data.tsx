/* eslint-disable react/no-unescaped-entities */
export type Answer = { value?: string; isCorrect?: boolean };

export type MultipleQuestion = {
  question: string;
  type: 'multiple';
  sourceLink: string;
  answers: Answer[];
  text: React.ReactElement;
};

export type SentenceQuestion = {
  question: string;
  type: 'sentence';
  sourceLink: string;
  answers: Answer[];
  solutions: Answer[];
  text: React.ReactElement;
  isPercentage: boolean;
};

export type Question = MultipleQuestion | SentenceQuestion;

const QUESTIONS: Question[] = [
  {
    question: 'How many people die every day in consequence of some form of inequality?',
    answers: [
      { value: '21,300', isCorrect: true },
      { value: '3,400' },
      { value: '67,800' },
      { value: '5,900' },
    ],
    text: (
      <div key="1">
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
    sourceLink:
      'https://www.oxfam.org/en/5-shocking-facts-about-extreme-global-inequality-and-how-even-it',
    type: 'multiple',
  },
  {
    question:
      'How much more carbon do 20 billionaires emit compared to 1 billion of the poorest people in the world?',
    answers: [
      { value: '8,000', isCorrect: true },
      { value: '30' },
      { value: '5' },
      { value: '600' },
    ],
    text: (
      <div key="2">
        Several factors, such as population size, industrialisation level, and consumption patterns
        influence the greenhouse gas emissions of individuals, groups, or countries. However, it is
        widely acknowledged that the wealthiest individuals and countries contribute
        disproportionately to global emissions. The richest 20 billionaires are estimated to emit an
        average of <span className="text-500">8,000 times</span> more carbon than the billion
        poorest people.
      </div>
    ),
    sourceLink:
      'https://www.oxfam.org/en/5-shocking-facts-about-extreme-global-inequality-and-how-even-it',
    type: 'multiple',
  },
  {
    question: `The wealthiest countries represent <answer1> % of the world population but contribute to <answer2> % of CO2 emissions.`,
    answers: [{ value: '50' }, { value: '50' }],
    solutions: [{ value: '16' }, { value: '40' }],
    text: (
      <div key="3">
        Inequality in carbon emissions is evident as the wealthiest countries, representing only{' '}
        <span className="text-500">16%</span> of the world population, are responsible for almost{' '}
        <span className="text-500">40%</span> of CO2 emissions. In contrast, the two categories of
        the poorest countries in the World Bank classification, which account for nearly 60% of the
        world's population, are responsible for less than 15% of emissions.
      </div>
    ),
    sourceLink:
      'https://www.imf.org/en/Publications/fandd/issues/2021/09/climate-change-and-inequality-guivarch-mejean-taconet',
    type: 'sentence',
    isPercentage: true,
  },
  {
    question:
      'How much will the healthcare costs associated with air pollution increase from 2015 to 2060?',
    answers: [
      { value: '$21 billion to $176 billion', isCorrect: true },
      { value: '$21 billion to $45 billion' },
      { value: '$21 billion to $30 billion' },
      { value: '$21 billion to $355 billion' },
    ],
    text: (
      <div key="3b">
        According to the Organization for Economic Cooperation and Development, global annual
        healthcare costs associated with air pollution will increase{' '}
        <span className="text-500">from $21 billion in 2015 to $176 billion</span> in 2060. It is
        important to note that these costs are estimates and can vary depending on the specific
        context and the actions taken to address air pollution. Air pollution is a critical
        environmental and public health issue. It is linked to several health problems, including
        respiratory and cardiovascular diseases, and is estimated to cause millions of premature
        deaths worldwide each year.
      </div>
    ),
    sourceLink:
      'https://www.oecd.org/environment/indicators-modelling-outlooks/Policy-Highlights-Economic-consequences-of-outdoor-air-pollution-web.pdf',
    type: 'multiple',
  },
  {
    question: `According to US 2019 data on wage distribution among the top 1% earners, <answer1> are women
    and <answer2> are men.`,
    answers: [{ value: '50' }, { value: '50' }],
    solutions: [{ value: '70' }, { value: '20' }],
    text: (
      <div key="4">
        In most countries, there is a significant gender gap, particularly in top-income groups.
        This disparity, known as the "glass ceiling" effect, highlights that women are significantly
        under-represented in these top-paying positions, leading to a significant wage gap towards
        the top of the wage distribution. In the United States, the representation of women in the
        top 1% has been increasing slowly, with data showing that in 2019, only about{' '}
        <span className="text-500">18%</span> of the top 1% were women.
      </div>
    ),
    sourceLink: 'https://wir2022.wid.world/chapter-5/',
    type: 'sentence',
    isPercentage: true,
  },
  {
    question:
      'How much more likely are black people to live in areas with higher increased temperature-related deaths?',
    answers: [
      { value: '40%', isCorrect: true },
      { value: '25%' },
      { value: '10%' },
      { value: '80%' },
    ],
    text: (
      <div key="5">
        Black communities are disproportionately affected by the impacts of climate change.
        According to a study from 2022, Black people are <span className="text-500">40%</span> more
        likely to live in areas that will experience extreme temperature-related deaths and 34% more
        likely to live in areas with childhood asthma diagnoses. They are 41-60% more likely to live
        in areas with high projection rates of premature death due to exposure to harmful
        particulate matter.
      </div>
    ),
    sourceLink:
      'https://www.kff.org/racial-equity-and-health-policy/issue-brief/climate-change-and-health-equity-key-questions-and-answers/',
    type: 'multiple',
  },
  {
    question:
      "How much of global carbon emissions are contributed by the world's wealthiest 1% compared to the bottom 50%?",
    answers: [
      { value: 'x2 <div class="font-normal">(or twice as much)</div>', isCorrect: true },
      { value: 'x1 <div class="font-normal">(or the same)</div>' },
      { value: 'x1/2 <div class="font-normal">(or half)</div>' },
      { value: 'x1/3 <div class="font-normal">(or a third)</div>' },
    ],
    text: (
      <div key="6">
        Recent data from Oxfam’s research with the Stockholm Environment Institute shows that from
        1990 to 2015, a critical period in which annual emissions grew 60% and cumulative emissions
        doubled, the wealthiest 1 percent of humanity was responsible for{' '}
        <span className="text-500">twice</span> as many emissions as the poorest 50 percent. By
        2030, their carbon footprints are set to be 30 times greater than the level compatible with
        the 1.5°C goal of the Paris Agreement.
      </div>
    ),
    sourceLink: `https://www.oxfam.org/en/press-releases/billionaire-emits-million-times-more-greenhouse-gases-average-person#:~:text=Recent%20data%20from%20Oxfam's%20research,%C2%B0C%20goal%20of%20the`,
    type: 'multiple',
  },
  {
    question: `In the US, the richest men live <answer1> years longer than the poorest portion of the population. And the richest women <answer2> years longer.`,
    answers: [{ value: '50' }, { value: '50' }],
    solutions: [{ value: '15' }, { value: '10' }],
    text: (
      <div key="7">
        According to a study published in the Journal of the American Medical Association (JAMA),
        the life expectancy divide between the richest and poorest in U.S. society is significant.
        Men in the top 1 percent of the income distribution can now expect to live{' '}
        <span className="text-500">15</span> years longer than those in the bottom 1 percent. For
        women, the difference is about <span className="text-500">10</span> years. This highlights
        the significant impact of income inequality on health outcomes and the need for policies to
        address this issue.
      </div>
    ),
    sourceLink: 'https://jamanetwork.com/journals/jama/article-abstract/2513561',
    type: 'sentence',
    isPercentage: true,
  },
  {
    question:
      'What has been the increase in heat-related deaths for people over 65 in the past 20 years?',
    answers: [
      { value: '68%', isCorrect: true },
      { value: '50%' },
      { value: '25%' },
      { value: '12%' },
    ],
    text: (
      <div key="8">
        A study by the Lancet Countdown found that heat-related deaths for people over 65 have
        increased by <span className="text-500">68%</span> between the years 2000-2004 and
        2017-2021. This data highlights the growing threat that extreme heat poses to vulnerable
        populations and the importance of addressing climate change to mitigate this risk.
      </div>
    ),
    sourceLink:
      'https://www.lancetcountdown.org/data-platform/health-hazards-exposures-and-impacts/1-1-health-and-heat/1-1-5-heat-and-sentiment',
    type: 'multiple',
  },
  {
    question:
      'How many of the richest people hold the same wealth as the 3.1 billion who make up the poorer half of humanity?',
    answers: [{ value: '26', isCorrect: true }, { value: '2' }, { value: '97' }, { value: '153' }],
    text: (
      <div key="9">
        According to a 2019 report by Oxfam International, <span className="text-500">10</span> of
        the world's richest individuals own more than the poorest 3.1 billion people. This means
        these 10 individuals have almost the same wealth as the poorest half of the world combined.
        The report also highlighted that this concentration of wealth at the top is increasing and
        that the gap between the rich and the poor is growing. We need policies and actions to
        address economic inequality and redistribute wealth fairly.
      </div>
    ),
    sourceLink: `https://oxfamilibrary.openrepository.com/bitstream/handle/10546/621341/bp-inequality-kills-170122-summ-en.pdf`,
    type: 'multiple',
  },
  {
    question: `<answer1> % of all displaced people by climate change-related events are women while <answer2> % are men.
    `,
    answers: [{ value: '50' }, { value: '50' }],
    solutions: [{ value: '80' }, { value: '20' }],
    text: (
      <div key="10">
        Migration and forced displacement are among the most serious impacts of the climate crisis
        that are already impacting millions worldwide. An estimated{' '}
        <span className="text-500">80</span> percent of people displaced by climate change are
        women, according to UN Environment. When women are displaced, they are at greater risk of
        violence, including sexual violence.
      </div>
    ),
    sourceLink:
      'https://www.ohchr.org/en/stories/2022/07/climate-change-exacerbates-violence-against-women-and-girls#:~:text=It%20is%20estimated%20that%2080,High%20Commissioner%20for%20Human%20Rights',
    type: 'sentence',
    isPercentage: true,
  },
  {
    question:
      'How many billion tons of greenhouse gases were produced in 2021 from human activities? How many billion tons of greenhouse gases were produced in 2021 from human activities?',
    answers: [
      { value: '~ 50', isCorrect: true },
      { value: '~ 10' },
      { value: '164' },
      { value: '32' },
    ],
    text: (
      <div key="11">
        Since the Industrial Revolution, emissions of greenhouse gases due to human activities have
        increased from negligible to nearly <span className="text-500">50</span> billion tons of CO2
        in 2021. According to the Intergovernmental Panel on Climate Change (IPCC), human
        activities, primarily the burning of fossil fuels, have increased atmospheric concentrations
        of carbon dioxide, methane, and nitrous oxide, which are the three main greenhouse gases.
        Industrialised countries, particularly those in North America, Europe, and Asia, are
        responsible for the majority of these emissions.
      </div>
    ),
    sourceLink: `https://www.imf.org/en/Publications/fandd/issues/2021/09/climate-change-and-inequality-guivarch-mejean-taconet`,
    type: 'multiple',
  },
  {
    question:
      'How many people could fall into poverty as a result of the impacts of climate change by 2030?',
    answers: [
      { value: '32 to 132 million', isCorrect: true },
      { value: '2 to 26 <br/> million' },
      { value: '14 to 58 million' },
      { value: '29 to 81 million' },
    ],
    text: (
      <div key="12">
        A World Bank report estimates that{' '}
        <span className="text-500">between 32 and 132 million</span> people could fall into poverty
        by 2030 as a result of the impacts of climate change. The report cites the increasing
        evidence of the potential harm climate change can cause to people's livelihoods and
        well-being, particularly in low-income countries where many people already live in poverty.
        Climate change can lead to various impacts, including natural disasters, crop failure, and
        water scarcity, all of which can contribute to poverty. The estimates provided by the World
        Bank highlight the urgency of addressing climate change and mitigating its effects on
        vulnerable populations.
      </div>
    ),
    sourceLink: `https://documents1.worldbank.org/curated/en/706751601388457990/pdf/Revised-Estimates-of-the-Impact-of-Climate-Change-on-Extreme-Poverty-by-2030.pdfhttps://documents1.worldbank.org/curated/en/706751601388457990/pdf/Revised-Estimates-of-the-Impact-of-Climate-Change-on-Extreme-Poverty-by-2030.pdf`,
    type: 'multiple',
  },
  {
    question: `The top 10% of emitters are responsible for close to <answer1> % of all emissions, while the bottom 50% produce <answer2> % of the total carbon output.`,
    answers: [{ value: '50' }, { value: '50' }],
    solutions: [{ value: '50' }, { value: '12' }],
    text: (
      <div key="13">
        The top 10% of carbon emitters contribute to nearly <span className="text-500">50%</span> of
        all emissions, while the bottom 50% produce just <span className="text-500">12%</span> of
        the total. Carbon emission inequality is not limited to high- vs. low-income countries. High
        emitters can be found in both low- and middle-income countries and vice versa. In Europe,
        the bottom 50% of the population emits an average of 5 tonnes of carbon dioxide equivalent
        per person per year. In East Asia, the bottom 50% emit 3 tonnes, and in North America 10
        tonnes. This is in stark contrast to the top 10% earners in these regions, which emit 29
        tonnes in Europe, 39 in East Asia, and 73 in North America.
      </div>
    ),
    sourceLink: 'https://wir2022.wid.world/chapter-6/',
    type: 'sentence',
    isPercentage: true,
  },
  {
    question:
      'How much less economic losses due to extreme climate-related events did very high Human Development Index countries suffer compared to others?',
    answers: [
      { value: '½ <div class="font-normal"> (half)</div>', isCorrect: true },
      { value: ' ⅓ <div class="font-normal"> (a third)</div>' },
      { value: '¼ <div class="font-normal"> (a fourth)</div>' },
      { value: '⅕ <div class="font-normal"> (a fifth)</div>' },
    ],
    text: (
      <div key="14">
        In 2021, very high Human Development Index (HDI) countries suffered{' '}
        <span className="text-500">around half</span> of the global economic losses due to
        climate-related extreme events, double the rate of the global average as a proportion of
        GDP. According to the Lancet Countdown, while around half of their losses were insured, the
        vast majority of losses in other countries were uninsured. Countries ranked 1 to 66 in the
        HDI index are designated as "very high", while those ranked 67 to 115 are designated "high",
        those ranked 116 to 159 are designated "medium", and those ranked 160 to 191 are designated
        "low".
      </div>
    ),
    sourceLink: `https://www.lancetcountdown.org/data-platform/`,
    type: 'multiple',
  },
  {
    question: 'What percentage of delegates at COP27 were women?',
    answers: [
      { value: '35.6', isCorrect: true },
      { value: '50' },
      { value: '43.2' },
      { value: '10.5' },
    ],
    text: (
      <div key="15">
        The representation of women in global climate negotiations, specifically at the Conference
        of Parties (COP) of the United Nations Framework Convention on Climate Change (UNFCCC),
        remains unequal. Despite being a crucial platform shaping climate change policy, the latest
        COP27 demonstrated that there has been little progress in promoting gender balance. Women
        constituted just 35.6% of all national Party delegates and an even lower 20.0% of Heads of
        Delegation. These imbalances are not uniform across different countries and regions. While
        women's participation is often higher than 45% in Eastern and Western Europe, it falls below
        35% in Africa and the Asia-Pacific region.
      </div>
    ),
    sourceLink: `https://www.genderclimatetracker.org/participation-stats/quick-analysishttps://www.genderclimatetracker.org/participation-stats/quick-analysis`,
    type: 'multiple',
  },
];

export default QUESTIONS;
