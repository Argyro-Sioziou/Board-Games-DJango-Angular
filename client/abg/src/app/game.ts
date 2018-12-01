import {Tag} from "./tag"
import {Creator} from "./creator"

export class Game {
  id: number;
  name: string;
  rules: string;
  price: number;
  rate: number;
  min_age: number;
  max_age: number;
  min_num_of_players: number;
  max_num_of_players: number;
  creator: string;
  tags: string[];
}
