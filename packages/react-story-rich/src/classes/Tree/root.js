// intro.length === 4
const intro = ['intro', [
  `Hey, ho, let's go!`,
  `Hey, ho, let's go!`,
  `Hey, ho, let's go!`,
  `Hey, ho, let's go!`,
]];

// verse.length === 8
const verse = ['verse', [
  `They're forming in straight line,`,
  `They're going through a tight wind`,
  `The kids are losing their minds`,
  `The blitzkrieg bop`,
  `They're piling in the back seat`,
  `They're generating steam heat`,
  `Pulsatin' to the back beat`,
  `The Blitzkrieg Bop`,
]];

// chorus.length === 4
const chorus = ['chorus', [
  `Hey, ho, let's go,`,
  `Shoot 'em in the back now`,
  `What they want, I don't know`,
  `They're all revved up and ready to go`,
]];

// Tree.flat(root) should be length === 4 + 8 + 4 + 8 + 4 + 8 + 4 === 40
export const ROOT_LENGTH = 40;

export default [intro, verse, chorus, verse, chorus, verse, intro];
