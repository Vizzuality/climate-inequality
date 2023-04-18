export type SectionSubtitleProps = {
  children: string;
  /**
   * (small: 20px - 32px)
   * (medium: 24px - 32px)
   * (large: 32px - 56px)
   * (xlarge: 40px - 80px)
   */
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  className?: React.HTMLAttributes<HTMLParagraphElement>['className'];
};
