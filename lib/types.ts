export type SocialLink = {
  label: string;
  href: string;
  handle: string;
};

export type Fact = {
  label: string;
  value: string;
};

export type Profile = {
  name: string;
  handle: string;
  initials: string;
  role: string;
  tagline: string;
  location: string;
  email: string;
  resumeUrl: string;
  status: {
    label: string;
    available: boolean;
  };
  socials: SocialLink[];
  about: string[];
  currently: string[];
  facts: Fact[];
};

export type Experience = {
  company: string;
  role: string;
  location: string;
  period: string;
  current: boolean;
  workMode?: "full-time" | "part-time";
  highlights: string[];
  stack: string[];
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type NavItem = {
  label: string;
  href: string;
};
