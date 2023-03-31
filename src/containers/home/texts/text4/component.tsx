const Text2 = () => {
  return (
    <div className="flex h-small-screen flex-col justify-center space-y-10 ">
      <h2 className="font-display text-4xl">Socioeconomic influences</h2>
      <div className="space-y-4">
        <p className="font-light">
          This layer zooms out to contextualize the foodscape by including market forces,
          distribution challenges, public policies and local communities and cultures.
        </p>
        <p className="font-semibold">
          More than three-quarters of global soy is fed to livestock for meat and dairy production.
          Most of the rest is used for biofuels, industry or vegetable oils. Just 7% of soy is used
          directly for human food products such as tofu, soy milk, edamame beans and tempeh.
        </p>
        <p className="font-light italic">Source: Soy - Our World in Data.</p>
      </div>
    </div>
  );
};

export default Text2;
