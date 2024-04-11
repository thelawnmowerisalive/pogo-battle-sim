import Moves from "../model/Moves";
import Pokemon from "../model/Pokemon";

enum ActionType {
  NAME = "NAME",
  LEVEL = "LEVEL",
  IVS = "IVS",
  FAST_MOVE = "FAST_MOVE",
  CHARGED_MOVE = "CHARGED_MOVE",
  CP = "CP",
  FULL = "FULL"
}

type Action = {
  type: ActionType;
  payload: any;
}

function newMoves(moves: Moves = new Moves(), fast: string, charged: string): Moves {
  return {
    fast: fast || moves.fast,
    charged_1: charged || moves.charged_1,
  }
}

function pokemonReducer(pokemon: Partial<Pokemon>, action: Action): Partial<Pokemon> {
  console.log(action.type);
  switch (action.type) {
    case ActionType.NAME:
      return {
        ...pokemon,
        name: action.payload
      }
    case ActionType.LEVEL:
      return {
        ...pokemon,
        level: action.payload
      }
    case ActionType.IVS:
      return {
        ...pokemon,
        ivs: action.payload
      }
    case ActionType.FAST_MOVE:
      return {
        ...pokemon,
        moves: newMoves(pokemon.moves, action.payload, "")
      }
    case ActionType.CHARGED_MOVE:
      return {
        ...pokemon,
        moves: newMoves(pokemon.moves, "", action.payload)
      }
    case ActionType.CP:
      return {
        ...pokemon,
        CP: action.payload
      }
    case ActionType.FULL:
      return action.payload;
    default:
      break;
  }
  return pokemon;
}

export default pokemonReducer;
export { ActionType, Action };