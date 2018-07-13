import { Component, OnInit } from '@angular/core';
import { MenuService } from './../menu.service';
import { FoodsService } from './../foods.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { FoodsGroup, AutoComplFoodsGroup, Foods } from './../foods_group';
import { FoodRow } from './../food-row';

@Component({
  selector: 'app-repas',
  templateUrl: './repas.component.html',
  styleUrls: ['./repas.component.css']
})

export class RepasComponent implements OnInit {

  typeMeal = [
    { value: 'petitdej-0', viewValue: 'Petit-Dejeuner' },
    { value: 'dej-1', viewValue: 'Dejeuner' },
    { value: 'diner-2', viewValue: 'Diner' }
  ];

  foodForm: FormGroup = this.fb.group({
    foodsGroup: ''
  });

  foodsGroupOptions: Observable<AutoComplFoodsGroup[]>;


  public autoCFG: AutoComplFoodsGroup[] = [];


  foodsRow: FoodRow[] = [
    {
      nameFood: null,
      ig: 0,
      portion: 0,
      glucides: 0,
      cg: 0,
    }
  ];

  constructor(public menuService: MenuService,
    public foodsService: FoodsService,
    private fb: FormBuilder) { }


  ngOnInit() {

    this.foodsService.getAllFoods()
        .subscribe((foods) => {
          this.autoCFG = this.formaterAutoCompl(foods);
          console.log(this.autoCFG);
        });
    this.foodsGroupOptions = this.foodForm.get('foodsGroup').valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterGroup(val)) );
  }

   filterGroup(val: string): AutoComplFoodsGroup[] {

    if (val) {

      return this.autoCFG
        .map(group => ({ categorie: group.categorie, foods: this._filter(group.foods, val) }))
        .filter(group => group.foods.length > 0);
    }

    return this.autoCFG;
  }

  // private _filter(opt: string[], val: string) {
    private _filter(opt, val) {

    const filterValue = (typeof val === 'string') ? val.toLowerCase() : val.name.toLowerCase();
    // return opt.filter(item => item.toLowerCase().startsWith(filterValue));
    return opt.filter(item => {
      return (typeof item === 'string') ? item.toLowerCase().startsWith(filterValue) :  item.name.toLowerCase().startsWith(filterValue);
    } );

  }



  displayFn(f): string | undefined {
    return f ? f.name : undefined;
  }


  formaterAutoCompl(f: Foods[]): AutoComplFoodsGroup[] {
    let i: number;
    // const autoCFG: AutoComplFoodsGroup[] = [];
    const autoCFG = [];


    for (i = 0; i < f.length; i++) {
      let j: number;
      const foodsByCat = [];
      if (f[i]['foodsGroup']) {
        for (j = i; (j < f.length) && f[j]['foodsGroup']
          && (f[j]['foodsGroup']['name'] === f[i]['foodsGroup']['name'])
          ; j++) {
          // foodsByCat.push(f[j]['name']);
          foodsByCat.push({name: f[j]['name'], id: f[j]['id'], ig: f[j]['glycIndex'], glucide: f[j]['carboHydrates']});

        }
        autoCFG.push({
          categorie: f[i]['foodsGroup']['name'],
          foods: foodsByCat
        });
        i = j - 1;
      } else {
        autoCFG.push({
          categorie: f[i]['name'],
          // foods: [ f[i]['name']]
          foods: [{name: f[i]['name'], id: f[i]['id'], ig: f[i]['glycIndex'], glucide: f[i]['carboHydrates']}]
        });
      }
    }
    return autoCFG;
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
    this.foodsRow[i].cg =
    (this.foodsRow[i].ig  * (this.foodsRow[i].glucides
                          * this.foodsRow[i].portion) / 100) / 100;
  }


  addFoodRow() {
    const newRow = {
      nameFood: null,
      ig: 40,
      portion: 0,
      glucides: 2.6,
      cg: 0,
    };
    this.foodsRow.push(newRow);
   }

  deleteFoodRow(i) {
    this.foodsRow.splice(i, 1);
  }

  getSum(i: number): number {
    let sum = 0;
    for (i = 0; i < this.foodsRow.length; i++) {
      sum += this.foodsRow[i].cg;
    }
    return sum;
  }




}
