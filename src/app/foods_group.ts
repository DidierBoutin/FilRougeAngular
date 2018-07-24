export interface AutoComplFoodsGroup {
    categorie: string;
    // foods: string[];
   foods:  string [];
 }


 export interface AutoFoodsGroup {
      value: string;
      title: string;
      id: number;
 }

 export interface FoodsGroup {

    id: number;
    name: string;
 }

 export interface Foods {
    id: number;
    name: string;
    foodsGroup: FoodsGroup;
    glycIndex: number;
    energy: number;
    carboHydrates: number;
    proteins: number;
    lipids: number;
    comment: string;
    createDate: string;
 }

export interface ListFoods {
    id: number;
    name: string;
    categorie: string;
    idcat: number;
    glycIndex: number;
    energy: number;
    carboHydrates: number;
    proteins: number;
    lipids: number;
    comment: string;
 }
