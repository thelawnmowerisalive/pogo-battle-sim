import NamedResource from "./NamedResource";
import Names from "./Names";

class PokemonType extends NamedResource {
  type: string;
  
  constructor(type: string, names: Names) {
    super(names);
    this.type = type;
  }
}

export default PokemonType;