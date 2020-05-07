import { FoodOptionsModel } from './food-options.model';

export class FoodModel {
  id: number;
  desc: string;
  options: Array<FoodOptionsModel> = new Array<FoodOptionsModel>();
  price: number;
  title: string;
  image: string;
  loading: boolean = true;
  express: boolean;
}
