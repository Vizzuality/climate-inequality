import { useState } from 'react';

import Icon from 'components/icon';

import Facebook from 'svgs/social/facebook.svg';
import Github from 'svgs/social/github.svg';
import Linkedin from 'svgs/social/linkedin.svg';
import Twitter from 'svgs/social/twitter.svg';
import Share from 'svgs/ui/copy.svg';
import Correct from 'svgs/ui/correct.svg';

interface SocialData {
  href?: string;
  icon: 'string | SingleIcon';
  afterIcon?: 'string | SingleIcon';
  shareLink?: string;
  action?: 'copy';
}

const socialData: SocialData[] = [
  {
    href: 'https://twitter.com/Vizzuality',
    icon: Twitter,
    shareLink: 'http://www.twitter.com/share?url=https://climate-inequality.vizzuality.com/quiz',
  },
  {
    href: 'https://www.linkedin.com/company/vizzuality',
    icon: Linkedin,
    shareLink:
      'https://www.linkedin.com/shareArticle?mini=true&url=https://climate-inequality.vizzuality.com/quiz',
  },
  {
    href: 'https://www.facebook.com/vizzuality',
    icon: Facebook,
    shareLink:
      'https://www.facebook.com/sharer/sharer.php?u=https://climate-inequality.vizzuality.com/quiz',
  },
  {
    href: 'https://github.com/Vizzuality',
    icon: Github,
    shareLink: 'https://github.com/Vizzuality',
  },
  {
    icon: Share,
    action: 'copy',
    afterIcon: Correct,
  },
];

type SocialIconsProps = {
  className?: string;
  isShare?: boolean;
};

const SocialIcons = ({ className, isShare }: SocialIconsProps) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText('https://climate-inequality.vizzuality.com/quiz');
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <div className={className}>
      {socialData.map(({ href, icon: IconSvg, shareLink, action, afterIcon: AfterIconSvg }) =>
        action ? (
          <button key={href} onClick={handleCopy}>
            <Icon
              icon={copied ? AfterIconSvg : IconSvg}
              className="h-6 w-6 transition-all duration-500 ease-in-out hover:text-400"
            />
          </button>
        ) : (
          <a key={href} href={isShare ? shareLink : href} target="_blank" rel="noreferrer">
            <Icon
              icon={IconSvg}
              className="h-6 w-6 transition-all duration-500 ease-in-out hover:fill-400"
            />
          </a>
        )
      )}
    </div>
  );
};

export default SocialIcons;
