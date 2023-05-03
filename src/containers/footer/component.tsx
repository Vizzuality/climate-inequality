import { Button } from 'components/button/component';

const Footer = () => {
  return (
    <div className="container mb-10">
      <div className="flex flex-wrap justify-between py-10 text-xl font-bold">
        <p className="w-4/6">
          At Vizzuality, we help organizations tackle global challenges by turning knowledge into
          action. <span className="text-green">Interested in what we could achieve together?</span>
        </p>
        <Button
          className="w-2/6 text-xl"
          size="xl"
          theme="secondary"
          href={'mailto:hello@vizzuality.com'}
        >
          Contact us.
        </Button>
      </div>
      <div className="border-t border-white py-10 text-sm">
        <p className="mb-2 font-semibold">Vizzuality&apos;s look at climate action and equality.</p>
        <p>
          We&apos;re committed to addressing climate inequality and promoting a more just and
          sustainable future. This microsite aims to raise awareness and inspire action on this
          mission, drawing inspiration from organizations like the{' '}
          <a href="https://wid.world/" className="underline" target="_blank" rel="noreferrer">
            World Inequality Lab
          </a>{' '}
          and our invaluable network of partners.
        </p>
      </div>
    </div>
  );
};

export default Footer;
