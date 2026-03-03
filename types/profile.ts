export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface Profile {
  name: string;
  role: string;
  specialization: string;
  headline: string;
  subheadline: string;
  email: string;
  github_url: string;
  linkedin_url: string;
  hero_image_path: string;
  cv_url: string;
  education: Education[];
  languages: Language[];
}
