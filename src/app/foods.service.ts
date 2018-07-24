
import { Injectable } from '@angular/core';
import { Foods, AutoComplFoodsGroup, FoodsGroup, ListFoods, AutoFoodsGroup } from './foods_group';
import { HttpClient } from '@angular/common/http';
 import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class FoodsService {

  // list of all FoodsGroup (categorie) for autocomplete of component Aliment
  listGroup: AutoFoodsGroup[] = [];
  // list of all foods  to display in component Aliment
  listFoods: ListFoods[] = [];
  // list of all foods by FoodsGoup categorie (for autocomplete of component Repas)
  autoCFG: AutoComplFoodsGroup[] = [];


  API_URL = 'http://localhost:8090/foods';



  constructor(private http: HttpClient) {}


  getFoodByName(f: string): Observable<Foods> {
    return this.http.get<Foods>(this.API_URL + '/' + f);
   }

  getAllFoods(): Observable<Foods[]> {
    console.log(' deb getAllFoods');
    return this.http.get<Foods[]>(this.API_URL);

  }

  update (foodAliment: Foods ): Observable<Foods> {
     return this.http.put<Foods>(this.API_URL + '/' + foodAliment.id, foodAliment);
  }

  create(foodAliment: Foods ): Observable<Foods> {
       return this.http.post<Foods>(this.API_URL, foodAliment);
  }

  delete (foodAliment: Foods ): Observable<Foods> {
     return this.http.delete<Foods>(this.API_URL + '/' + foodAliment.id);
  }



  formaterAutoCompl(f: Foods[]) {

    // init data using in coponents Repas (autocomplemente name - autoCGG) and Aliment (list Foods and list category)
     const autoCFG = [];
     const listGroup = [];
     const listFoods = [];


    // init a categorie 'Non renseigné' at index 0
    listGroup.push({ title: 'Non renseignée', value: 'Non renseignée', id: null });

    // init a categorie "non renseignée" in AutoCFG
     autoCFG.push({
      categorie: 'Non renseignée',
      foods: []
    });

    // init index  principal loop
    let i: number;

    // **************** Loop on each food of foods *********************
    for (i = 0; i < f.length; i++) {

       // init List food (source of ng2-smart-table of Aliment componet)
      this.pushListFoods(f, i, listFoods);

      // === init auto completion column aliment of repas : ListFood ===
      // if Foodgroup (categorie exists)
      if (f[i]['foodsGroup']) {
        let j = 0;

        // looking for if categorie already exists in autoCFG on index j
        while ((j < autoCFG.length) && (autoCFG[j]['categorie'] !== f[i]['foodsGroup']['name'])) {
          j++; }

        // here, category exists : push only food in category indexed by j
        if (j < autoCFG.length) {
           autoCFG[j]['foods']
           .push({ name: f[i]['name'], id: f[i]['id'], ig: f[i]['glycIndex'], glucide: f[i]['carboHydrates']} );

        // here, category not exist yet  : push it with the food readed
        } else {
          autoCFG
          .push({
            categorie: f[i]['foodsGroup']['name'],
            foods: [{ name: f[i]['name'], id: f[i]['id'], ig: f[i]['glycIndex'], glucide: f[i]['carboHydrates'] }]
          });

          // save categorie for listGroup (autocompete in ng2-smart-tablle of component Aliment)
          listGroup
          .push({ title: f[i]['foodsGroup']['name'], value: f[i]['foodsGroup']['name'], id: f[i]['foodsGroup']['id'] });


        }
      } else {
        // here, no category for food readed, save it in categorie index 0 ('non renseignée')
         autoCFG[0]['foods']
         .push({ name: f[i]['name'], id: f[i]['id'], ig: f[i]['glycIndex'], glucide: f[i]['carboHydrates'] });
      }
    }

    // save data for using in components
    this.autoCFG = autoCFG;
    this.listGroup = listGroup;
    this.listFoods = listFoods;

  }


  // ***** save food in ListFood/
  pushListFoods(f: Foods[], j: number, listFoods: ListFoods[]) {



    listFoods.push(
      { id: f[j]['id'],
      name: f[j]['name'],
      categorie: (f[j]['foodsGroup']) ? f[j]['foodsGroup']['name'] : 'Non renseignée',
      idcat: (f[j]['foodsGroup']) ? f[j]['foodsGroup']['id'] : null,
      glycIndex: f[j]['glycIndex'],
      energy: f[j]['energy'],
      carboHydrates: f[j]['carboHydrates'],
      proteins: f[j]['proteins'],
      lipids: f[j]['lipids'],
      comment: f[j]['comment'],
       }) ;

  }



}

