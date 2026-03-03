export type AboutMe = {
  sectionId: string;
  title: string;
  image: {
    src: string;
    alt: string;
  };
  paragraphs: string[];
};