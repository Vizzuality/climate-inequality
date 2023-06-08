export type SectionSubtitleProps = {
  children: string;
  /**
   * (medium: 24px - 32px)
   * (large: 32px - 56px)
   * (xlarge: 40px - 80px)
   */
  size?: 'medium' | 'large' | 'xlarge';
  className?: React.HTMLAttributes<HTMLParagraphElement>['className'];
};
