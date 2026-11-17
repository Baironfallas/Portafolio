export interface Education {
  degree: string;
  institution: string;
  year: string;
  note?: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  role: string;
  subheadline: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  cv_url: string;
  education: Education[];
  languages: Language[];
}
