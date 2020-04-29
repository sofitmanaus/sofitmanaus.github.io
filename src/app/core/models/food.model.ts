import { FoodOptionsModel } from './food-options.model';

export class FoodModel {
  desc: string;
  options: Array<FoodOptionsModel> = new Array<FoodOptionsModel>();
  price: number;
  title: string;
  image: string;
  loading: boolean = true;
}
