import Icon from 'components/icon';
import Facebook from 'svgs/social/facebook.svg';
import Github from 'svgs/social/github.svg';
import Linkedin from 'svgs/social/linkedin.svg';
import Twitter from 'svgs/social/twitter.svg';

const socialData = [
  {
    href: 'https://twitter.com/Vizzuality',
    icon: Twitter,
    shareLink: 'http://www.twitter.com/share?url=https://climate-inequality.vercel.app/quiz',
  },
  {
    href: 'https://www.linkedin.com/company/vizzuality',
    icon: Linkedin,
    shareLink:
      'https://www.linkedin.com/shareArticle?mini=true&url=https://climate-inequality.vercel.app/quiz',
  },
  {
    href: 'https://www.facebook.com/vizzuality',
    icon: Facebook,
    shareLink:
      'https://www.facebook.com/sharer/sharer.php?u=https://climate-inequality.vercel.app/quiz',
  },
  {
    href: 'https://github.com/Vizzuality',
    icon: Github,
    shareLink: 'https://github.com/Vizzuality',
  },
];

type SocialIconsProps = {
  className?: string;
  isShare?: boolean;
};

const SocialIcons = ({ className, isShare }: SocialIconsProps) => {
  return (
    <div className={className}>
      {socialData.map(({ href, icon: IconSvg, shareLink }) => (
        <a key={href} href={isShare ? shareLink : href} target="_blank" rel="noreferrer">
          <Icon
            icon={IconSvg}
            className="h-6 w-6 transition-all duration-500 ease-in-out hover:fill-400"
          />
        </a>
      ))}
    </div>
  );
};

export default SocialIcons;
