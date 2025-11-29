
export type BlockType = 'navigation' | 'hero' | 'feature' | 'cta' | 'footer' | 'split' | 'map' | 'form' | 'image' | 'text' | 'button' | 'divider' | 'pricing' | 'testimonial' | 'team' | 'faq';
export type Spacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type FontFamily = 'sans' | 'serif' | 'mono' | 'display';
export type BackgroundType = 'solid' | 'gradient' | 'image';
export type ButtonStyle = 'solid' | 'outline' | 'ghost';
export type AnimationType = 'none' | 'fade-in' | 'slide-up' | 'slide-down' | 'slide-left' | 'slide-right' | 'zoom-in' | 'bounce';

export interface AppPreferences {
  darkMode: boolean;
  showGridLines: boolean;
  language: 'en' | 'pt' | 'es' | 'fr';
}

export interface SeoSettings {
  title: string;
  description: string;
  keywords: string;
  ogImage: string;
  robots: string;
  author: string;
}

export interface GlobalSettings extends SeoSettings {
  fontFamily: FontFamily;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
}

export interface BaseBlock {
  id: string;
  instanceId: string;
  type: BlockType;
  anchorId?: string;
  backgroundType: BackgroundType;
  backgroundColor: string;
  gradient: string; // e.g., "linear-gradient(to right, #000, #fff)"
  backgroundImage: string;
  paddingTop: Spacing;
  paddingBottom: Spacing;
  animation: AnimationType;
}

// --- ATOMIC BLOCKS ---

export interface TextBlockData extends BaseBlock {
  type: 'text';
  content: string;
  tag: 'h1' | 'h2' | 'h3' | 'p' | 'div' | 'blockquote';
  align: 'left' | 'center' | 'right' | 'justify';
  fontSize: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl';
  fontWeight: 'normal' | 'medium' | 'bold' | 'black';
  color: string;
}

export interface ButtonBlockData extends BaseBlock {
  type: 'button';
  text: string;
  url: string;
  align: 'left' | 'center' | 'right';
  variant: ButtonStyle;
  buttonBg: string;
  buttonColor: string;
  radius: Radius;
  width: 'auto' | 'full';
}

export interface DividerBlockData extends BaseBlock {
  type: 'divider';
  lineColor: string;
  lineWidth: 'full' | 'short' | 'middle';
  height: Spacing;
  showLine: boolean;
}

export interface ImageData extends BaseBlock {
  type: 'image';
  url: string;
  alt: string;
  caption: string;
  width: 'auto' | 'full' | '50%' | '75%';
  align: 'left' | 'center' | 'right';
  borderRadius: Radius;
  shadow: boolean;
  aspectRatio: 'auto' | '1/1' | '16/9' | '4/3' | '3/4';
}

// --- MARKETING BLOCKS ---

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  isPopular: boolean;
  badgeText?: string;
}

export interface PricingData extends BaseBlock {
  type: 'pricing';
  plans: PricingPlan[];
  cardBg: string;
  textColor: string;
  accentColor: string;
  radius: Radius;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface TestimonialData extends BaseBlock {
  type: 'testimonial';
  items: TestimonialItem[];
  layout: 'grid' | 'slider';
  cardBg: string;
  textColor: string;
  starColor: string;
  radius: Radius;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface TeamData extends BaseBlock {
  type: 'team';
  heading: string;
  members: TeamMember[];
  cardBg: string;
  textColor: string;
  radius: Radius;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface FaqData extends BaseBlock {
  type: 'faq';
  heading: string;
  items: FaqItem[];
  questionColor: string;
  answerColor: string;
  cardBg: string;
}

// --- LAYOUT BLOCKS ---

export interface HeroData extends BaseBlock {
  type: 'hero';
  heading: string;
  subheading: string;
  alignment: 'left' | 'center' | 'right';
  headingColor: string;
  subheadingColor: string;
  // Button 1
  showButton1: boolean;
  button1Text: string;
  button1Url: string;
  button1Bg: string;
  button1Color: string;
  // Button 2
  showButton2: boolean;
  button2Text: string;
  button2Url: string;
  button2Bg: string;
  button2Color: string;
  buttonRadius: Radius;
}

export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface FeatureData extends BaseBlock {
  type: 'feature';
  title: string;
  description: string;
  features: FeatureItem[];
  gridCols: 2 | 3 | 4;
  titleColor: string;
  descriptionColor: string;
  featureTitleColor: string;
  featureDescColor: string;
  iconBgColor: string;
  iconColor: string;
  cardBgColor: string;
  cardRadius: Radius;
  gap: Spacing;
  shadow: boolean;
}

export interface CtaData extends BaseBlock {
  type: 'cta';
  heading: string;
  subtext: string;
  showButton: boolean;
  buttonText: string;
  destinationUrl: string;
  headingColor: string;
  subtextColor: string;
  buttonBg: string;
  buttonTextColor: string;
  buttonRadius: Radius;
  overlayOpacity: number;
}

export interface SocialLink {
  id: string;
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'github' | 'youtube' | 'tiktok' | 'website' | 'email' | 'phone';
  url: string;
}

export interface FooterData extends BaseBlock {
  type: 'footer';
  copyrightText: string;
  socialLinks: SocialLink[];
  textColor: string;
  iconColor: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface NavigationData extends BaseBlock {
  type: 'navigation';
  logoType: 'text' | 'image';
  logoText: string;
  logoImage: string;
  logoWidth: number;
  links: NavLink[];
  layout: 'left' | 'center' | 'right';
  layoutStyle: 'topbar' | 'sidebar';
  textColor: string;
  linkColor: string;
  hoverColor: string;
  menuBgColor: string;
  // Button
  showButton: boolean;
  buttonText: string;
  buttonUrl: string;
  buttonBg: string;
  buttonTextColor: string;
  buttonRadius: Radius;
}

export interface SplitData extends BaseBlock {
  type: 'split';
  imageSide: 'left' | 'right';
  title: string;
  content: string;
  imageUrl: string;
  textColor: string;
  splitRatio: '50-50' | '40-60' | '60-40';
}

export interface MapData extends BaseBlock {
  type: 'map';
  address: string;
  height: number;
  zoom: number;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'textarea' | 'number' | 'select';
  label: string;
  placeholder: string;
  required: boolean;
}

export interface FormData extends BaseBlock {
  type: 'form';
  title: string;
  subtitle: string;
  fields: FormField[];
  submitText: string;
  textColor: string;
  inputBg: string;
  inputBorderColor: string;
  buttonBg: string;
  buttonTextColor: string;
  buttonRadius: Radius;
  boxShadow: boolean;
}

export type BlockData = HeroData | FeatureData | CtaData | FooterData | NavigationData | SplitData | MapData | FormData | ImageData | TextBlockData | ButtonBlockData | DividerBlockData | PricingData | TestimonialData | TeamData | FaqData;

// --- DEFAULTS ---

const commonDefaults = {
  backgroundType: 'solid' as BackgroundType,
  backgroundColor: 'transparent',
  gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  backgroundImage: '',
  paddingTop: 'md' as Spacing,
  paddingBottom: 'md' as Spacing,
  animation: 'none' as AnimationType,
};

export const BLOCK_TEMPLATES: { [K in BlockType]: Omit<Extract<BlockData, { type: K }>, 'instanceId'> } = {
  hero: {
    id: 'hero',
    type: 'hero',
    anchorId: 'hero',
    heading: 'Build Your Next Idea Faster',
    subheading: 'The perfect starting point for your next project.',
    alignment: 'center',
    headingColor: 'var(--color-text)',
    subheadingColor: 'var(--color-text)',
    showButton1: true,
    button1Text: 'Get Started',
    button1Url: '#',
    button1Bg: 'var(--color-primary)',
    button1Color: '#FFFFFF',
    showButton2: true,
    button2Text: 'Learn More',
    button2Url: '#',
    button2Bg: 'transparent',
    button2Color: 'var(--color-text)',
    buttonRadius: 'md',
    ...commonDefaults,
    paddingTop: 'xl',
    paddingBottom: 'xl',
  },
  feature: {
    id: 'feature',
    type: 'feature',
    anchorId: 'features',
    title: 'Everything you need',
    description: 'Possimus magnam voluptatum cupiditate veritatis in.',
    features: [
      { id: 'f1', title: 'Push to deploy', description: 'Maiores impedit perferendis suscipit eaque.', icon: 'cloud_upload' },
      { id: 'f2', title: 'SSL certificates', description: 'Anim aute id magna aliqua ad ad non deserunt sunt.', icon: 'lock' },
    ],
    gridCols: 3,
    gap: 'lg',
    titleColor: 'var(--color-text)',
    descriptionColor: 'var(--color-text)',
    featureTitleColor: 'var(--color-text)',
    featureDescColor: 'var(--color-text)',
    iconBgColor: 'var(--color-primary)',
    iconColor: '#FFFFFF',
    cardBgColor: '#FFFFFF',
    cardRadius: 'lg',
    shadow: true,
    ...commonDefaults,
  },
  cta: {
    id: 'cta',
    type: 'cta',
    anchorId: 'cta',
    heading: 'Ready to dive in?',
    subtext: 'Start your free trial today.',
    showButton: true,
    buttonText: 'Get Started Now',
    destinationUrl: '#',
    headingColor: '#FFFFFF',
    subtextColor: '#E5E7EB',
    buttonBg: '#FFFFFF',
    buttonTextColor: 'var(--color-primary)',
    buttonRadius: 'md',
    overlayOpacity: 20,
    ...commonDefaults,
    backgroundType: 'gradient',
    paddingTop: 'xl',
    paddingBottom: 'xl',
  },
  footer: {
    id: 'footer',
    type: 'footer',
    anchorId: 'footer',
    copyrightText: '© 2024 Company. All rights reserved.',
    socialLinks: [
      { id: 's1', platform: 'twitter', url: '#' },
      { id: 's2', platform: 'instagram', url: '#' },
    ],
    textColor: '#D1D5DB',
    iconColor: '#9CA3AF',
    ...commonDefaults,
    backgroundColor: '#111827',
    backgroundType: 'solid',
    paddingTop: 'lg',
    paddingBottom: 'lg',
  },
  navigation: {
    id: 'nav',
    type: 'navigation',
    anchorId: 'nav',
    logoType: 'text',
    logoText: 'Brand',
    logoImage: 'https://placehold.co/120x40',
    logoWidth: 100,
    layout: 'right',
    layoutStyle: 'topbar',
    links: [
      { id: 'n1', label: 'Home', href: '#' },
      { id: 'n2', label: 'About', href: '#about' },
      { id: 'n3', label: 'Services', href: '#services' },
    ],
    textColor: 'var(--color-text)',
    linkColor: 'var(--color-text)',
    hoverColor: 'var(--color-primary)',
    menuBgColor: '#FFFFFF',
    showButton: true,
    buttonText: 'Get Started',
    buttonUrl: '#',
    buttonBg: 'var(--color-primary)',
    buttonTextColor: '#FFFFFF',
    buttonRadius: 'md',
    ...commonDefaults,
    backgroundColor: '#FFFFFF',
    backgroundType: 'solid',
    paddingTop: 'sm',
    paddingBottom: 'sm',
  },
  split: {
    id: 'split',
    type: 'split',
    anchorId: 'split',
    imageSide: 'right',
    title: 'Share your story',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    textColor: 'var(--color-text)',
    splitRatio: '50-50',
    ...commonDefaults,
  },
  map: {
    id: 'map',
    type: 'map',
    anchorId: 'location',
    address: 'New York, NY',
    height: 400,
    zoom: 12,
    ...commonDefaults,
  },
  form: {
    id: 'form',
    type: 'form',
    anchorId: 'contact',
    title: 'Contact Us',
    subtitle: 'We would love to hear from you.',
    fields: [
        { id: 'f1', type: 'text', label: 'Name', placeholder: 'Your Name', required: true },
        { id: 'f2', type: 'email', label: 'Email', placeholder: 'your@email.com', required: true },
        { id: 'f3', type: 'textarea', label: 'Message', placeholder: 'How can we help?', required: true },
    ],
    submitText: 'Send Message',
    textColor: 'var(--color-text)',
    inputBg: '#FFFFFF',
    inputBorderColor: '#E5E7EB',
    buttonBg: 'var(--color-primary)',
    buttonTextColor: '#FFFFFF',
    buttonRadius: 'md',
    boxShadow: true,
    ...commonDefaults,
    backgroundColor: 'var(--color-bg)',
  },
  image: {
    id: 'img',
    type: 'image',
    anchorId: '',
    url: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1000&q=80',
    alt: 'Office',
    caption: 'Our space',
    width: 'full',
    align: 'center',
    borderRadius: 'lg',
    shadow: true,
    aspectRatio: '16/9',
    ...commonDefaults,
  },
  text: {
    id: 'txt',
    type: 'text',
    anchorId: '',
    content: 'Start editing this text',
    tag: 'p',
    align: 'left',
    fontSize: 'base',
    fontWeight: 'normal',
    color: 'var(--color-text)',
    ...commonDefaults,
  },
  button: {
    id: 'btn',
    type: 'button',
    anchorId: '',
    text: 'Click Me',
    url: '#',
    align: 'center',
    variant: 'solid',
    buttonBg: 'var(--color-primary)',
    buttonColor: '#FFFFFF',
    radius: 'md',
    width: 'auto',
    ...commonDefaults,
  },
  divider: {
    id: 'div',
    type: 'divider',
    anchorId: '',
    lineColor: '#E5E7EB',
    lineWidth: 'full',
    height: 'md',
    showLine: true,
    ...commonDefaults,
    paddingTop: 'none',
    paddingBottom: 'none',
  },
  pricing: {
    id: 'pricing',
    type: 'pricing',
    anchorId: 'pricing',
    plans: [
        { id: 'p1', name: 'Basic', price: '$9', period: '/mo', features: ['5 Projects', 'Basic Analytics'], buttonText: 'Choose', isPopular: false, badgeText: 'Most Popular' },
        { id: 'p2', name: 'Pro', price: '$29', period: '/mo', features: ['Unlimited Projects', 'Adv Analytics', 'Priority Support'], buttonText: 'Choose', isPopular: true, badgeText: 'Best Value' },
        { id: 'p3', name: 'Enterprise', price: '$99', period: '/mo', features: ['Custom Solutions', '24/7 Support'], buttonText: 'Contact', isPopular: false, badgeText: 'Most Popular' },
    ],
    cardBg: '#FFFFFF',
    textColor: 'var(--color-text)',
    accentColor: 'var(--color-primary)',
    radius: 'lg',
    ...commonDefaults,
  },
  testimonial: {
    id: 'testimonial',
    type: 'testimonial',
    anchorId: 'reviews',
    items: [
        { id: 't1', name: 'Jane Doe', role: 'CEO, TechCo', avatar: '', quote: 'This builder saved me hours of work. Highly recommended!', rating: 5 },
        { id: 't2', name: 'John Smith', role: 'Developer', avatar: '', quote: 'Clean code and easy to use. A game changer.', rating: 4 },
    ],
    layout: 'grid',
    cardBg: '#FFFFFF',
    textColor: 'var(--color-text)',
    starColor: '#FBBF24',
    radius: 'lg',
    ...commonDefaults,
  },
  team: {
    id: 'team',
    type: 'team',
    anchorId: 'team',
    heading: 'Meet Our Team',
    members: [
        { id: 'm1', name: 'Alex Johnson', role: 'Founder', image: 'https://i.pravatar.cc/150?u=a', bio: 'Visionary leader.' },
        { id: 'm2', name: 'Sarah Williams', role: 'CTO', image: 'https://i.pravatar.cc/150?u=b', bio: 'Tech wizard.' },
        { id: 'm3', name: 'Mike Brown', role: 'Designer', image: 'https://i.pravatar.cc/150?u=c', bio: 'Creative mind.' },
    ],
    cardBg: '#FFFFFF',
    textColor: 'var(--color-text)',
    radius: 'lg',
    ...commonDefaults,
  },
  faq: {
    id: 'faq',
    type: 'faq',
    anchorId: 'faq',
    heading: 'Frequently Asked Questions',
    items: [
        { id: 'q1', question: 'Is it free?', answer: 'Yes, there is a free tier available.' },
        { id: 'q2', question: 'Can I export code?', answer: 'Absolutely! You can export HTML and React code.' },
    ],
    questionColor: 'var(--color-text)',
    answerColor: '#4B5563',
    cardBg: '#F9FAFB',
    ...commonDefaults,
  }
};
