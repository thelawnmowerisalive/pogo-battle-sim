import React from 'react';
import ReactDOM from 'react-dom/client';
import BattleView from './components/BattleView';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

// const pokedex = new Pokedex();
// for (let pokemon of await getCachedData(POKEDEX)) {
//   pokedex.add(pokemon);
// }

/* GENERATE TRAINERS */

// const level = 39;
// const lyra = new Trainer('Lyra', level)
//   .add(pokedex.pokemon['MACHAMP'], {
//     level: 35,
//     ivs: new Stats(14, 11, 14),
//     moves: { fast: 'COUNTER_FAST', charged_1: 'CROSS_CHOP' }
//   })
//   .add(pokedex.pokemon['MAMOSWINE'], {
//     level: 41.5,
//     ivs: new Stats(15, 9, 14),
//     moves: { fast: 'POWDER_SNOW_FAST', charged_1: 'AVALANCHE' }
//   })
//   .add(pokedex.pokemon['ROSERADE'], {
//     level: 40,
//     ivs: new Stats(14, 15, 15),
//     moves: { fast: 'RAZOR_LEAF_FAST', charged_1: 'SOLAR_BEAM' }
//   });
// lyra.strategy.autotap = true;
// console.log(lyra);

// const giovanni = new RocketTrainer('Giovanni', level, 1.15)
//   .add(pokedex.pokemon['PERSIAN'])
//   .add(pokedex.pokemon['GARCHOMP'])
//   .add(pokedex.pokemon['KYOGRE']);
// console.log(giovanni);

// // const battle = new Battle(pokedex, lyra, giovanni);
// // battle.simulate();
// // console.log(battle);

// const normal = new RocketTrainer('NORMAL', level)
//   .add(pokedex.pokemon['TEDDIURSA'])
//   .add(pokedex.pokemon['RATTATA'])
//   .add(pokedex.pokemon['BIBAREL'])
//   .add(pokedex.pokemon['URSARING']);
// console.log(normal);

// const bug = new RocketTrainer('BUG', level)
//   .add(pokedex.pokemon['DWEBBLE'])
//   .add(pokedex.pokemon['WEEDLE'])
//   .add(pokedex.pokemon['FORRETRESS'])

//   .add(pokedex.pokemon['VULPIX'])
//   .add(pokedex.pokemon['HOUNDOOM']);
// console.log(bug);

const root = ReactDOM.createRoot(document.getElementById('root') as any);
root.render(
  <React.StrictMode>
    <BattleView />
  </React.StrictMode>
);
