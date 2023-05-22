import SocialIcons from 'containers/social-icons/component';

import Button from 'components/button';
import Logo from 'components/logo';

const Footer = () => {
  return (
    <div className="mb-10">
      <div className="grid grid-cols-12 py-10 text-xl font-bold">
        <p className="col-span-12 inline pr-6 lg:col-span-9">
          At Vizzuality, we help organizations tackle global challenges by turning knowledge into
          action. <span className="text-green">Interested in what we could achieve together?</span>
        </p>
        <Button
          className="col-span-6 mt-10 grid h-24 whitespace-nowrap text-xl lg:col-span-3 lg:mt-0 lg:h-20"
          size="xl"
          theme="secondary"
          href={'mailto:hello@vizzuality.com'}
        >
          Contact us.
        </Button>
      </div>
      <div className="border-t border-white py-6 text-sm">
        <div className="flex justify-between">
          <div className="w-9/12 pt-4">
            <p className="mb-2 font-semibold">
              Vizzuality&apos;s look at climate action and equality.
            </p>
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
          <div>
            <Logo width={160} height={60} />
            <SocialIcons className="mx-1 flex justify-between" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
