import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { getCachedData, updateData } from './updateData';
import { POKEDEX } from './Constants';
import Pokedex from './model/Pokedex';
import Trainer from './model/Trainer';
import RocketTrainer from './model/RocketTrainer';
import Stats from './model/Stats';
import Battle from './model/Battle';
import BattleView from './components/BattleView';

// updateData();

const pokedex = new Pokedex();
for (let pokemon of await getCachedData(POKEDEX)) {
  pokedex.add(pokemon);
}

/* GENERATE TRAINERS */

const lyra = new Trainer('Lyra');
// lyra.add(pokedex.templates['PERSIAN'], {
//   level: 31,
//   ivs: new Stats(7, 8, 10)
// });
lyra.add(pokedex.pokemon['MACHAMP'], {
  level: 40,
  ivs: new Stats(14, 11, 14),
  moves: { fast: 'COUNTER_FAST', charged_1: 'CROSS_CHOP' }
});
lyra.add(pokedex.pokemon['MAMOSWINE'], {
  level: 41.5,
  ivs: new Stats(15, 9, 14),
  moves: { fast: 'POWDER_SNOW', charged_1: 'AVALANCHE' }
});
lyra.add(pokedex.pokemon['ROSERADE'], {
  level: 40,
  ivs: new Stats(14, 15, 15),
  moves: { fast: 'RAZOR_LEAF_FAST', charged_1: 'SOLAR_BEAM' }
});
console.log(lyra);

const level = 42;
const giovanni = new RocketTrainer('Giovanni', 42, 1.15);
giovanni.add(pokedex.pokemon['PERSIAN']);
giovanni.add(pokedex.pokemon['GARCHOMP']);
giovanni.add(pokedex.pokemon['KYOGRE']);
console.log(giovanni);

const battle = new Battle(pokedex, lyra, giovanni);
battle.simulate();
console.log(battle);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BattleView battle={battle}/>
  </React.StrictMode>
);
