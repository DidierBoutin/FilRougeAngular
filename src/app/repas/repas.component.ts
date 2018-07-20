import { Component, OnInit } from '@angular/core';
import { MenuService } from './../menu.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { AutoComplFoodsGroup, Foods } from './../foods_group';
import { FoodRow } from './../food-row';
import { FoodsService } from '../foods.service';

@Component({
  selector: 'app-repas',
  templateUrl: './repas.component.html',
  styleUrls: ['./repas.component.css']
})



export class RepasComponent  {


 // type de rapas; initialisé en dur en attendant une table de parametrage
  typeMeal = [
    { value: 'petitdej-0', viewValue: 'Petit-Dejeuner' },
    { value: 'dej-1', viewValue: 'Dejeuner' },
    { value: 'diner-2', viewValue: 'Diner' }
  ];

// svgde de toute les lignes crée via composant line-food, initialisé à blanc
  foodsRow: FoodRow[] = [
    {
      nameFood: null,
      ig: 0,
      portion: 100,
      glucides: 0,
      cg: 0,
    }
  ];

  maxIndex: number = this.foodsRow.length - 1;

   constructor(public menuService: MenuService,
    public foodsService: FoodsService,
    private fb: FormBuilder) { }


    // ngOnInit() {
    // }

  // Call to add a new row when clik on button (mat-icon button on html)
  addFoodRow() {
    const newRow = {
      nameFood: null,
      ig: 0 ,
      portion: 100,
      glucides: 0,
      cg: 0,
    };
    this.foodsRow.push(newRow);
   }


  getSum(i: number): number {
    let sum = 0;
    for (i = 0; i < this.foodsRow.length; i++) {
      sum += this.foodsRow[i].cg;
    }
    return sum;
  }


  // call when delete u
  deleteFoodRow(i) {
    this.foodsRow.splice(i, 1);
  }

  getFood(i: number) {

    console.log('Methode getFood ', this.foodsRow[i]);

   //  setTimeout( () => {this.foodsRow[i].ig = this.foodsRow[i].nameFood.glycIndex; }, 0);

   // if (this.foodsRow[i].nameFood) {

      this.foodsRow[i].ig = this.foodsRow[i].nameFood.ig;

       this.foodsRow[i].glucides = this.foodsRow[i].nameFood.glucide;

   // }

 }

calculCG(i: number) {

 console.log('ch=' + (this.foodsRow[i].ig * (this.foodsRow[i].glucides * this.foodsRow[i].portion) / 100) / 100);

 this.foodsRow[i].cg = (this.foodsRow[i].ig * (this.foodsRow[i].glucides * this.foodsRow[i].portion) / 100) / 100;

 // return (this.foodsRow[i].ig * (this.foodsRow[i].glucides * this.foodsRow[i].portion) / 100) / 100;

 // cg.value= (ig.value * (glucides.value* portion.value)/100)/100

}








}
