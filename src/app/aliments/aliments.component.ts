import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { FoodsGroup, AutoComplFoodsGroup, Foods, AutoComplFoods, ListFoods } from './../foods_group';
import { FoodsService} from './../foods.service';
import { Column } from 'ng2-smart-table/lib/data-set/column';



@Component({
  selector: 'app-aliments',
  templateUrl: './aliments.component.html',
  styleUrls: ['./aliments.component.css'],
})

export class AlimentsComponent implements OnInit  {


// Setting est une propriéte de ng2-smart-table qui définit ses colonnes,
// et active ou non les acions de confirmation
// ==> "Property binding" avec html
settings = {
  Supprimer: {
    confirmDelete: true,
  },
  Ajouter: {
    confirmCreate: true,
  },
  Modifier: {
    confirmSave: true,
  },
  columns: {
    id: {
      title: 'Identifiant',
      editable: false,
      sort: true,
      filter: true,
    },
    name: {
      title: 'Aliment',
      editable: true,
      sort: true,
      width: '30%',
      filter: true,
      // filter: {
      //   type: 'list',
      //   config: {
      //     selectText: ' ',
      //     list:  this.foodsService.autoCFG2,
      //   },
      // },
    },
    categorie: {
      title: 'Catégorie',
      editable: true,
      sort: true,
      filter: true,
    },
    glycIndex: {
      title: 'Indice Glycémique',
      editable: true,
      sort: true,
      filter: true,
    },
    energy: {
      title: 'Glucides',
      editable: true,
      sort: true,
      filter: true,
    },
    carboHydrates : {
      title: 'Energie',
      editable: true,
      sort: true,
      filter: true,

    },
    proteins : {
      title: 'Protéine',
      editable: true,
      sort: true,
      filter: true,

    },
    lipids : {
      title: 'Lipide',
      editable: true,
      sort: true,
      filter: true,

    },
    comment : {
      title: 'Commentaire',
      editable: true,
      sort: true,
      filter: true,
    },
  },
};

// source est une propriéte de ng2-smart-table : données de la liste
// ==> "Property binding" avec html
source: LocalDataSource;



constructor(public foodsService: FoodsService) {}

ngOnInit() {
    this.foodsService.getAllFoods()
    .subscribe((foods) => {
      this.source = new LocalDataSource(this.formaterSource(foods)); } );
  }





  // Permet de formater la donnée source utilisé comme propriété de ng2-smart-table
  formaterSource(f: Foods[]): ListFoods[] {

    const listFoods: ListFoods[] = [];

    let i: number;
    for (i = 0 ; i < f.length; i++) {
      let cat: string;
      if (  (f[i]['foodsGroup'] !== null)
              && (f[i]['foodsGroup'] !== undefined)) {
                  cat = f[i]['foodsGroup']['name'];
          } else { cat =  f[i]['name']; }

      listFoods.push(
          { id: f[i]['id'],
            name: f[i]['name'],
            categorie: cat,
            glycIndex: f[i]['glycIndex'],
            energy: f[i]['energy'],
            carboHydrates: f[i]['carboHydrates'],
            proteins: f[i]['proteins'],
            lipids: f[i]['lipids'],
            comment: f[i]['comment']});
    }
    return listFoods;
  }


// onDeleteConfirm, onSaveConfirm, onCreateConfirm sont des fonctions liés aux évenemets
// de ng2-smart-table
// ==> "event binding" avec html

  onDeleteConfirm(event) {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    if (window.confirm('Are you sure you want to save?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
  onCreateConfirm(event) {
    if (window.confirm('Are you sure you want to create?')) {
      event.newData['name'] += ' + added in code';
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
  }
}

