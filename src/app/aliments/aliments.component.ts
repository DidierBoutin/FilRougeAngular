import { getTestBed } from '@angular/core/testing';
import { AutoComplFoodsGroup, AutoFoodsGroup } from './../foods_group';
import { FoodsService } from './../foods.service';
import { MatTableDataSource } from '@angular/material';
import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule, LocalDataSource } from 'ng2-smart-table';

import { Foods, ListFoods, FoodsGroup } from '../foods_group';
// import { eventNames } from 'cluster';





@Component({
  selector: 'app-aliments',
  templateUrl: './aliments.component.html',
  styleUrls: ['./aliments.component.css'],

})



export class AlimentsComponent implements OnInit {


  autoFoodsGroups: AutoFoodsGroup[] = [] ;

  settings: any;

  source: LocalDataSource;

  idc: number;


  constructor(public foodsService: FoodsService) {
  }

  ngOnInit() {

    console.log('ngOninit   entree');
    this.foodsService.getAllFoods()
      .subscribe((foods) => {
        console.log('ng  nginit into subsribe avant foodsservice');
        this.foodsService.formaterAutoCompl(foods);
        this.source = new LocalDataSource(this.foodsService.listFoods);
         this.autoFoodsGroups = this.foodsService.listGroup;
         console.log('ng  nginit into subsribe apres foodsservice');

         console.log('this.autoFoodsGroups : ');

        console.log(this.autoFoodsGroups);

        console.log('this.foodsService.listFoods : ');
        console.log(this.foodsService.listFoods);

        this.settings = {
          actions: {
            position: 'right',
            columnTitle: '',
          },
            delete: {
              // deleteButtonContent: 'Supprimer',
              confirmDelete: true,
              deleteButtonContent: '  <span class="glyphicon glyphicon-remove table-actions-button"></span>  ',
              mode: 'external'
            },
            add: {
              // addButtonContent: 'Ajouter',
              confirmCreate: true,
              addButtonContent: '<span class="glyphicon glyphicon-plus">'
            },
            edit: {
              confirmSave: true,
              // mode: 'inline',
              // editButtonContent: '<span class="glyphicon glyphicon-pencil"></span>'
            },
          setPaging: true,
          pager: {
            display: true,
          },
          columns: {
            // id: {
            //   title: 'ID',
            //   width: '5%',
            //   show: false,
            //   editable: false,
            //   creatable: false,
              // sort: true,
              // filter: true,
              // show: false,

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
              width: '15%',
              // valuePrepareFunction: ((cell) =>  cell.name) ,
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
              width: '7%',
              filter: true,
              type: 'number',
            },
            energy: {
              title: 'Energie',
              editable: true,
              width: '7%',
              filter: true,
            },
            // portion: {
            //   title: 'Portion (en gr)',
            //   editable: true,
            //   filter: false,
            // },
            carboHydrates: {
              title: 'Glucides',
              editable: true,
              width: '2%',
              filter: true,
            },
            proteins: {
              title: 'Proteines',
              editable: true,
              width: '7%',
              filter: true,
            },
            lipids: {
              title: 'Lipides',
              editable: true,
              width: '7%',

              filter: true,
            },
            comment: {
              title: 'Commentaires',
              editable: true,
              editor: {
                type: 'textarea',
              },
              width: '20%',
              filter: true,
            },

          },
        };

        console.log('apres this setting : ');



      });
  }




// onDeleteConfirm, onSaveConfirm, onCreateConfirm sont des fonctions liés aux évenemets
// de ng2-smart-table
// ==> "event binding" avec html

  onDeleteConfirm(event) {

    console.log('Ondelete !');
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();

      const newFood: Foods = this.formatFoodsGroupDelete(event);
      this.foodsService.delete(newFood).subscribe ( (food: Foods) => {
        food = newFood;
   });

    } else {
      event.confirm.reject();
    }
  }

  onSaveConfirm(event) {
    console.log('Onsave !');

     if (window.confirm('Are you sure you want to save?')) {
       event.confirm.resolve(event.newData);
       // this.source.remove(event.newdata);
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
    console.log('Oncreate !');

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

  formatFoodsGroup(event: any): Foods {
    const  newFoodsGroup: AutoFoodsGroup = this.foodsService.listGroup
       .find( (element) => { if (element.value === event.newData.categorie) { return event.newData.categorie; }
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
  formatFoodsGroupDelete(event: any): Foods {
    const  newFoodsGroup: AutoFoodsGroup = this.foodsService.listGroup
       .find( (element) => { if (element.value === event.data.categorie) { return event.data.categorie; }
      });

      return  {
        id: event.data.id ,
        name: event.data.name ,
        foodsGroup: { id: newFoodsGroup.id, name: newFoodsGroup.value },
        glycIndex: event.data.glycIndex ,
        energy: event.data.energy,
        carboHydrates: event.data.carboHydrates,
        proteins: event.data.proteins,
        lipids: event.data.lipids,
        comment: event.data.comment,
        createDate: ''};

  }



}
