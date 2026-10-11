// Site-wide settings. Social icons in the hero are generated from whichever
// of `email`, `github`, `linkedin` and `scholar` are set.

export const site = {
  name: 'Jannik Mänzer',
  role: 'MSc Student, Machine Learning',
  location: 'Tübingen, Germany',

  email: 'jmaenzer@gmail.com',
  github: 'jmaen', // username
  linkedin: 'jannikmaenzer', // profile handle
  scholar: '', // full Google Scholar profile URL, leave empty to hide

  // Spellings of your own name in author lists, rendered in bold.
  selfAuthorNames: ['J. Mänzer', 'Jannik Mänzer'],

  // Used for the hero photo and the social preview image (src/assets/...).
  photoAlt: 'Portrait of Jannik Mänzer',

  description:
    "Jannik Mänzer, MSc student in Machine Learning at the University of Tübingen. Interested in world models, and more broadly in how AI systems can develop an inherent understanding of the physical world.",
};

export type Site = typeof site;
