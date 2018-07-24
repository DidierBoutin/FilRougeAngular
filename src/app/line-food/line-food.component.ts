import { FoodRow } from './../food-row';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs';
import { AutoComplFoodsGroup, Foods } from '../foods_group';
import { MenuService } from '../menu.service';
import { FoodsService } from '../foods.service';
import { startWith, map } from 'rxjs/operators';


@Component({
  selector: 'app-line-food',
  templateUrl: './line-food.component.html',
  styleUrls: ['./line-food.component.css']
})
export class LineFoodComponent implements OnInit {


  // ********  Input et output pour le composant parent Repas  ****

  // tableau des aliments du repas
  @Input() foodRow: FoodRow;
  // index de l'aliment selectioné
  @Input() index: number;
   // index max du tableau
   @Input() maxIndex: number;

  // pour associer l'evnement deleted à la bonne ligne dans le composant Repas
  // on l"emet vers le composant parent via methode emit, cf. deleteFoodRow ci dessou
  @Output() deleted = new EventEmitter<number>();



 // init zone utilsée pour html mat-autocomplete
 foodForm: FormGroup = this.fb.group({foodsGroup: ''});
 foodsGroupOptions: Observable<AutoComplFoodsGroup[]>;
 public autoCFG: AutoComplFoodsGroup[] = [];


  constructor(public menuService: MenuService,
    public foodsService: FoodsService,
    private fb: FormBuilder) { }


  ngOnInit() {


    console.log(this.foodsService.autoCFG);
    // init de la donnée AutoCFG comportant tous les aliments, avec juste la categorie et les aliments associés
    this.foodsService.getAllFoods()
      .subscribe((foods) => {
        this.foodsService.formaterAutoCompl(foods);
        this.autoCFG = this.foodsService.autoCFG;
        console.log('autoCFG  : ');
        console.log(this.autoCFG);

       });

    // init  autocompetion de la zone aliment
    this.foodsGroupOptions = this.foodForm.get('foodsGroup').valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterGroup(val)));
  }

  // init  autocompetion de la zone aliment, recuperation des données en f° de la saisie utilisateur (val)
  filterGroup(val: string): AutoComplFoodsGroup[] {
    if (val) {
      return this.autoCFG
        .map(group => ({ categorie: group.categorie, foods: this._filter(group.foods, val) }))
        .filter(group => group.foods.length > 0);
    }
    return this.autoCFG;
  }

  // private   _filter = (opt: string[], val: string): string[] => {
  //    const filterValue = val.toLowerCase() ;
  //    return opt.filter(item =>  item.toLowerCase().indexOf(filterValue) === 0);

  //   }
    private _filter(opt, val) {
      const filterValue = (typeof val === 'string') ? val.toLowerCase() : val.name.toLowerCase();
      // return opt.filter(item => item.toLowerCase().startsWith(filterValue));
      return opt.filter(item => {
        return (typeof item === 'string') ? item.toLowerCase().startsWith(filterValue) : item.name.toLowerCase().startsWith(filterValue);
      });
  }





  displayFn(f): string | undefined {
     return f ? f.name : undefined;
    // return f ? f.categorie : undefined;

   }


  // declencher à la selection dans l'autocomplete,  pour afficher ig et glucides, et calculer cg
  getFood() {
    console.log('this.foodRow');     console.log(this.foodRow);

    console.log('this.foodRow.glucides');
    console.log(this.foodRow.nameFood.glucide);


    this.foodRow.ig = this.foodRow.nameFood.ig;
    this.foodRow.glucides = this.foodRow.nameFood.glucide;
     this.calculCG();
  }

  // declenché à la modification de catégorie, et de la selection d'un aliment
  calculCG() {
     this.foodRow.cg = (this.foodRow.ig * (this.foodRow.glucides * this.foodRow.portion) / 100) / 100;
  }

  // declenché au click sur le bouton pubelle
  deleteFoodRow(index: number) {
    this.deleted.emit(index);
   }

}
