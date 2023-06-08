import FadeYScroll from 'containers/home/animations/fade-y-scroll/component';
import SocialIcons from 'containers/social-icons/component';

import Button from 'components/button';
import Logo from 'components/logo';

const Footer = () => {
  return (
    <div>
      <FadeYScroll threshold={0.2}>
        <div className="container mb-10 mt-16 hidden sm:block">
          <div className="grid grid-cols-12 py-10 text-xl font-bold">
            <p className="col-span-12 inline pr-6 lg:col-span-9">
              At Vizzuality, we help organizations tackle global challenges by turning knowledge
              into action.{' '}
              <span className="text-green">Interested in what we could achieve together?</span>
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
                  We&apos;re committed to addressing climate inequality and promoting a more just
                  and sustainable future. This microsite aims to raise awareness and inspire action
                  on this mission, drawing inspiration from organizations like the{' '}
                  <a
                    href="https://wid.world/"
                    className="underline"
                    target="_blank"
                    rel="noreferrer"
                  >
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
        <div className="container my-16 text-center sm:hidden">
          <div className="font-semibold text-white">
            <p>
              At Vizzuality, we help organizations tackle global challenges by turning knowledge
              into action.
            </p>
            <p className="text-green">Interested in what we could achieve together?</p>
          </div>
          <Button
            className="mt-10 py-6 px-5 text-base font-semibold"
            size="base"
            theme="secondary"
            href={'mailto:hello@vizzuality.com'}
          >
            Contact us.
          </Button>
          <div className="mt-8 flex flex-col items-center space-y-4 border-t border-white pt-12 ">
            <Logo width={140} height={32} />
            <p className="text-sm font-semibold">Follow us</p>
            <SocialIcons className="mx-1 flex justify-between gap-x-4" />
          </div>
        </div>
      </FadeYScroll>
    </div>
  );
};

export default Footer;
