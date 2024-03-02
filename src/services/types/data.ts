import { ReactNode } from "react";

export type TIngredients = {
  _id: string;
  name: string;
  type: string;
  proteins: string;
  fat: string;
  carbohydrates: string;
  calories: string;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};
export type TConstructorItem = {
  item: TIngredients;
  index: number
} 
export type TIngredientItem= {
  ingredient: TIngredients;
  // onOpen : any; 
  onOpen(value: object): void;
} 
export type TIngredientsList= {
  type: string;
  ingredients: ReadonlyArray<TIngredients> ;
  onOpen(value: object): void;
  id: string
} 
export type TModal = {
  children?: ReactNode;
  header?: string | undefined;
  closeModal: () => void
} 
export type TModalOverlay = {
  children?: ReactNode;
  onClick: () => void;
}
export type TOrder = {
  createdAt: Date;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: Date;
  _id: string
} 
export type TUser = {
  name?: string,
  email?: string,
  password?: string
} 