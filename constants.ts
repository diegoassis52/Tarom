import { Spread } from './types';

export const MAJOR_ARCANA = [
  { name: 'O Louco', image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg' },
  { name: 'O Mago', image: 'https://upload.wikimedia.org/wikipedia/commons/d/de/RWS_Tarot_01_Magician.jpg' },
  { name: 'A Sacerdotisa', image: 'https://upload.wikimedia.org/wikipedia/commons/8/88/RWS_Tarot_02_High_Priestess.jpg' },
  { name: 'A Imperatriz', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/RWS_Tarot_03_Empress.jpg' },
  { name: 'O Imperador', image: 'https://upload.wikimedia.org/wikipedia/commons/c/c3/RWS_Tarot_04_Emperor.jpg' },
  { name: 'O Hierofante', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/RWS_Tarot_05_Hierophant.jpg' },
  { name: 'Os Amantes', image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_06_Lovers.jpg' },
  { name: 'O Carro', image: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/RWS_Tarot_07_Chariot.jpg' },
  { name: 'A Força', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg' },
  { name: 'O Eremita', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/RWS_Tarot_09_Hermit.jpg' },
  { name: 'A Roda da Fortuna', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/RWS_Tarot_10_Wheel_of_Fortune.jpg' },
  { name: 'A Justiça', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e0/RWS_Tarot_11_Justice.jpg' },
  { name: 'O Enforcado', image: 'https://upload.wikimedia.org/wikipedia/commons/2/2b/RWS_Tarot_12_Hanged_Man.jpg' },
  { name: 'A Morte', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d7/RWS_Tarot_13_Death.jpg' },
  { name: 'A Temperança', image: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/RWS_Tarot_14_Temperance.jpg' },
  { name: 'O Diabo', image: 'https://upload.wikimedia.org/wikipedia/commons/5/55/RWS_Tarot_15_Devil.jpg' },
  { name: 'A Torre', image: 'https://upload.wikimedia.org/wikipedia/commons/5/53/RWS_Tarot_16_Tower.jpg' },
  { name: 'A Estrela', image: 'https://upload.wikimedia.org/wikipedia/commons/d/db/RWS_Tarot_17_Star.jpg' },
  { name: 'A Lua', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/RWS_Tarot_18_Moon.jpg' },
  { name: 'O Sol', image: 'https://upload.wikimedia.org/wikipedia/commons/1/17/RWS_Tarot_19_Sun.jpg' },
  { name: 'O Julgamento', image: 'https://upload.wikimedia.org/wikipedia/commons/d/dd/RWS_Tarot_20_Judgement.jpg' },
  { name: 'O Mundo', image: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/RWS_Tarot_21_World.jpg' },
];

export const QUICK_QUESTIONS = [
  "O que preciso saber agora?",
  "Qual a energia do momento?",
  "O que esperar dessa situação?",
  "Qual o melhor caminho a seguir?",
];

// Fix: Applied the Spread type to ensure consistent typing for area readings.
export const AREA_READINGS: { [key: string]: { title: string; spreads: Spread[] } } = {
  amor: {
    title: 'Amor',
    spreads: [
      { title: 'Energia do relacionamento', cards: 3, positions: ['Passado', 'Presente', 'Futuro'] },
      { title: 'O que ele(a) sente?', cards: 1 },
      { title: 'Caminho futuro', cards: 3, positions: ['O que une', 'O desafio', 'O resultado'] },
    ],
  },
  trabalho: {
    title: 'Trabalho',
    spreads: [
      { title: 'Situação atual', cards: 1 },
      { title: 'Oportunidade próxima', cards: 1 },
      { title: 'Conselho profissional', cards: 1 },
    ],
  },
  saude: {
    title: 'Saúde',
    spreads: [
      { title: 'Energia geral', cards: 1 },
      { title: 'Atenções importantes', cards: 1 },
      { title: 'Conselho', cards: 1 },
    ],
  },
  dinheiro: {
    title: 'Dinheiro',
    spreads: [
      { title: 'Situação financeira', cards: 1 },
      { title: 'Fluxo futuro', cards: 1 },
      { title: 'O que fazer agora', cards: 1 },
    ],
  },
};