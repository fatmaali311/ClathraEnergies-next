import { en } from './en';
import { fr } from './fr';
import { zh } from './zh';

const dictionaries = { en, fr, zh };

export const getDictionary = (lang) => {
  return dictionaries[lang] || dictionaries.en;
};
