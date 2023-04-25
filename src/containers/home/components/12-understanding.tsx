import SectionSubtitle from 'components/section-subtitle/component';
import SectionTitle from 'components/section-title/component';

const Understanding = () => {
  const UnderstandingImage = () => (
    <div
      className="h-[40vh] w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url("/images/understanding.png")` }}
    ></div>
  );

  return (
    <div className="bg-white">
      <div className="container flex flex-col justify-between pt-14 text-900  sm:min-h-screen lg:mt-0">
        <div>
          <SectionTitle className="mb-4" color="green">
            From understanding the problem to embracing solutions.
          </SectionTitle>
          <SectionSubtitle className="text-900" size="large">
            We need to come together as humanity to tackle the climate crisis and social inequality
            simultaneously.
          </SectionSubtitle>
        </div>
        <div className="my-6 flex flex-col gap-6 sm:my-10 sm:flex-row">
          <div>
            <p>
              We need diverse solutions across all elements of society, including{' '}
              <span className="font-semibold">
                better governance, fairer wealth distribution, company-led solutions on ESG, and
                adaptation of cultural norms
              </span>
              . Answers to tackle the interdependent and complex climate and ecological crises must
              be comprehensive, bringing vulnerable and marginalised groups into the conversation.
            </p>
            <p className="mt-4 sm:hidden">
              Many are looking towards initiatives that put people and the planet at the centre
              while driving sustainable and balanced development, such as nature-based solutions
              (NBS).
            </p>
            <p className="hidden sm:block">
              Data-driven decision-making is key to ensuring the environmental and socioeconomic
              effectiveness of different solutions. However, the lack of granular socioeconomic data
              remains a major obstacle.
            </p>
          </div>
          <div>
            <p className="hidden sm:block">
              <span className="font-semibold">Predictive modelling harnessing geospatial data</span>{' '}
              is urgently needed to provide a more complete picture of the intersections between
              socioeconomic factors and environmental impacts. While progress is being made, we also
              need to communicate what is available, complementing each other’s efforts and driving
              positive change.
            </p>
            <p className="hidden sm:block">
              As we strive for sustainable and balanced development,{' '}
              <span className="font-semibold">nature-based solutions</span> (NBS) gain traction as a
              response to both people and the planet.
            </p>
          </div>
        </div>
        <div className="hidden sm:block">
          <UnderstandingImage />
        </div>
      </div>
      <div className="sm:hidden">
        <UnderstandingImage />
      </div>
    </div>
  );
};

export default Understanding;
