import { getTestBed } from '@angular/core/testing';
import { AutoComplFoodsGroup, AutoFoodsGroup } from './../foods_group';
import { FoodsService } from './../foods.service';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';
import { Foods, ListFoods, FoodsGroup } from '../foods_group';

@Component({
  selector: 'app-aliments',
  templateUrl: './aliments.component.html',
  styleUrls: ['./aliments.component.css'],
})


export class AlimentsComponent implements OnInit {


// data list of ng2-smart table
  source: LocalDataSource;

  // using by ng2-smart table to set parameter
  settings: any;

  constructor(public foodsService: FoodsService) {}

  ngOnInit() {

     this.foodsService.getAllFoods()
      .subscribe((foods) => {

        // service to get datg in BDD and formating for ng2-smart-table
        this.foodsService.formaterAutoCompl(foods);
        this.source = new LocalDataSource(this.foodsService.listFoods);

        // we can use create, upadate and delete  services og ng2-smart-table
        this.settings = {
          actions: {
            add: true,
            edit: true,
            delete: true,
            position: 'right',
            columnTitle: '',
            },
          delete: {
              confirmDelete: true,
              deleteButtonContent: '  <span class="glyphicon glyphicon-trash table-actions-button"></span>  ',
              mode: 'external'
            },
          add: {
              // addButtonContent: 'Ajouter',
              confirmCreate: true,
              addButtonContent: '<span class="glyphicon glyphicon-plus">'
            },
          edit: {
              confirmSave: true,
              editButtonContent: '<span class="glyphicon glyphicon-pencil"></span>'
            },
          setPaging: true,
          pager: {
            display: true,
          },

          // list of columns :
          columns: {
            name: {
              title: 'Aliment',
              editable: true,
              sort: true,
              width: '20%',
              filter: true,
              editor: {
                type: 'textarea',
              },
            },
            categorie: {
              title: 'Catégorie',
              width: '20%',
              // In editor and Filter, Categorie display with autocomplete (type list), with data get by foods service
              editor: {
                type: 'list',
                 config: {
                    selectText: 'Select...',
                    list: this.foodsService.listGroup,
                    confirmSave: true,
                          },
                      },
               filter: {
                type: 'list',
                config: {
                  selectText: 'Select...',
                  list:  this.foodsService.listGroup,
                        }
                      }
            },
            glycIndex: {
              title: 'IG (pour 100gr)   ',
              editable: true,
              width: '9%',
              filter: true,
              type: 'number',
            },
            energy: {
              title: 'Energie',
              editable: true,
              width: '9%',
              filter: true,
              type: 'number',

            },
            carboHydrates: {
              title: 'Glucides',
              editable: true,
              width: '9%',
              filter: true,
            },
            proteins: {
              title: 'Proteines',
              editable: true,
              width: '9%',
              filter: true,
            },
            lipids: {
              title: 'Lipides',
              editable: true,
              width: '9%',

              filter: true,
            },
            comment: {
              title: 'Commentaires',
              editable: true,
              editor: {
                type: 'textarea',
              },
              width: '15%',
              filter: true,
            },
          },
        };
      });
  }




// onDeleteConfirm, onSaveConfirm, onCreateConfirm sont des fonctions liés aux évenemets
// de ng2-smart-table
// ==> "event binding" avec html

  onDeleteConfirm(event) {
     if (window.confirm('Are you sure you want to delete?')) {

      // ***init screen without food deleted
      event.confirm.resolve();

      // *****Delete food in  BDD
      // format food Foofs from line
      const delFood: Foods = this.formatFoodsGroupDelete(event);
      this.foodsService.delete(delFood).subscribe ( (food: Foods) => {
        food = delFood;
   });

    } else {
      event.confirm.reject();
    }
  }


  onSaveConfirm(event) {

     if (window.confirm('Are you sure you want to save?')) {
       event.confirm.resolve(event.newData);
        const newFood: Foods = this.formatFoodsGroup(event);

       this.foodsService.update(newFood).subscribe ( (food: Foods) => {
             food = newFood;
        });
     } else {
      event.confirm.reject();
    }
    this.source.refresh();
  }


  onCreateConfirm(event) {

     if (window.confirm('Are you sure you want to create   ?')) {

      const newFood: Foods = this.formatFoodsGroup(event);
      this.foodsService.create(newFood).subscribe ( (food: Foods) => {
        food = newFood; });
      event.confirm.resolve(event.newData);
    } else {
      event.confirm.reject();
    }
    this.source.refresh();
  }


  // get value of event.newData to save in Food
  formatFoodsGroup(event: any): Foods {

    // get id of categorie  in listGroup to save it in Foods
    const  newFoodsGroup: AutoFoodsGroup = this.foodsService.listGroup
        .find( (element) => { if (element.value === event.newData.categorie) {  return event.newData.categorie; }
       });


      return  {
        id: event.newData.id ,
        name: event.newData.name ,
        foodsGroup: { id: newFoodsGroup.id, name: newFoodsGroup.value },
         glycIndex: event.newData.glycIndex ,
        energy: event.newData.energy,
        carboHydrates: event.newData.carboHydrates,
        proteins: event.newData.proteins,
        lipids: event.newData.lipids,
        comment: event.newData.comment,
        createDate: ''};
  }



  // get value of event.data to save in Food
  formatFoodsGroupDelete(event: any): Foods {


    // get id of categorie  in listGroup to save it in Foods
    const  delFoodsGroup: AutoFoodsGroup = this.foodsService.listGroup
       .find( (element) => { if (element.value === event.data.categorie) { return event.data.categorie; }
      });

      return  {
        id: event.data.id ,
        name: event.data.name ,
        foodsGroup: { id: delFoodsGroup.id, name: delFoodsGroup.value },
        glycIndex: event.data.glycIndex ,
        energy: event.data.energy,
        carboHydrates: event.data.carboHydrates,
        proteins: event.data.proteins,
        lipids: event.data.lipids,
        comment: event.data.comment,
        createDate: ''};
  }
}
