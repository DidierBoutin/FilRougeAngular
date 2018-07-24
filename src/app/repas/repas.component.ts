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
    { nameFood: null,
      ig: 0,
      portion: 100,
      glucides: 0,
      cg: 0,
    }];


  constructor(public menuService: MenuService,
              public foodsService: FoodsService,
              private fb: FormBuilder) { }

  // Call to add a new row when clik on button (mat-icon button on html)
  addFoodRow() {
    const newRow = {
      nameFood: null,
      ig: 0 ,
      portion: 90,
      glucides: 0,
      cg: 0,
    };
    this.foodsRow.push(newRow);
   }


   // permet de calculer le Cg en fonction de tous les aliments, afficher via interpolation dans htlm
  getSum(i: number): number {
    let sum = 0;
    for (i = 0; i < this.foodsRow.length; i++) {
      sum += this.foodsRow[i].cg;
    }
    sum = Number.parseFloat(Number(sum).toFixed(2));
    return sum;
  }


  // call when delete a row to synchronize tab foodsRow and nn of lines in screen
  deleteFoodRow(i) {
    this.foodsRow.splice(i, 1);
  }


}
