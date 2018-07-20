
import { Injectable } from '@angular/core';
import { Foods, AutoComplFoodsGroup, FoodsGroup, ListFoods, AutoFoodsGroup } from './foods_group';
import { HttpClient } from '@angular/common/http';
 import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})


export class FoodsService {

  // liste de tous les categorie
  listGroup: AutoFoodsGroup[] = [];

  // liste de tous les aliments
  listFoods: ListFoods[] = [];


  // liste de tout les aliments par categorie
  autoCFG: AutoComplFoodsGroup[] = [];


  API_URL = 'http://localhost:8090/foods';



  constructor(private http: HttpClient) {
    this.getAllFoods();
    // this.getFoodById(this.id);
    // this.getFoodByName(this.name);
  }

  getFoodByName(f: string): Observable<Foods> {
    return this.http.get<Foods>(this.API_URL + '/' + f);
   }

  getAllFoods(): Observable<Foods[]> {
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



  // formaterAutoCompl(f: Foods[]) {
  //   let i: number;

  //    // const autoCFG = [];
  //   for (i = 0; i < f.length; i++) {
  //     let j: number;
  //     const foodsByCat = [];

  //     if (f[i]['foodsGroup']) {

  //         for (j = i; (j < f.length) && f[j]['foodsGroup']
  //         && (f[j]['foodsGroup']['name'] === f[i]['foodsGroup']['name'])
  //         ; j++) {
  //          // foodsByCat.push({name: f[j]['name'], id: f[j]['id'], ig: f[j]['glycIndex'], glucide: f[j]['carboHydrates']});
  //          foodsByCat.push({name: f[j]['name']});
  //        this.pushListFoods(f, j);
  //        }
  //       this.autoCFG.push({       categorie: f[i]['foodsGroup']['name'],
  //         foods: foodsByCat});

  //         this.autoCFG.push({
  //           categorie: f[i]['foodsGroup']['name'],
  //           foods: foodsByCat});

  //       this.listGroup.push({title: f[i]['foodsGroup']['name'], value: f[i]['foodsGroup']['name'], id: f[i]['foodsGroup']['id'] });

  //        i = j - 1;
  //     } else {
  //        this.autoCFG.push({
  //         categorie: 'Non renseignée',
  //         foods: [ f[i]['name']]
  //         // foods: [{name: f[i]['name'], id: f[i]['id'], ig: f[i]['glycIndex'], glucide: f[i]['carboHydrates']}]
  //       });
  //       this.pushListFoods(f, i);
  //     }
  //   }
  //  }

  formaterAutoCompl(f: Foods[]) {

    const autoCFG = [];

    // init d'une categorie 'NOn renseigné' à l'index 0
    this.listGroup.push({ title: 'Non renseignée', value: 'Non renseignée', id: null });

    // init 'de la categorie dans l'autocompetion de la table aliment
     autoCFG.push({
      categorie: 'Non renseignée',
      foods: []
    });

    let i: number;


    for (i = 0; i < f.length; i++) {

       // init List food (source of ng2-smart-table of Aliment componet)
      this.pushListFoods(f, i);

      // init auto completion column aliment of repas
      if (f[i]['foodsGroup']) {
        let j = 0;
        while ((j < autoCFG.length) && (autoCFG[j]['categorie'] !== f[i]['foodsGroup']['name'])) { j++; }
        if (j < autoCFG.length) {
          console.log(autoCFG[j]);
          autoCFG[j]['foods'].push({ name: f[i]['name'], id: f[i]['id'], ig: f[i]['glycIndex'], glucide: f[i]['carboHydrates']} );
        } else {
          autoCFG.push({
            categorie: f[i]['foodsGroup']['name'],
            // foods: [f[i]['name']]
            foods: [{ name: f[i]['name'], id: f[i]['id'], ig: f[i]['glycIndex'], glucide: f[i]['carboHydrates'] }]
          });

          this.listGroup.push({ title: f[i]['foodsGroup']['name'], value: f[i]['foodsGroup']['name'], id: f[i]['foodsGroup']['id'] });


        }
      } else {
         autoCFG[0]['foods'].push({ name: f[i]['name'], id: f[i]['id'], ig: f[i]['glycIndex'], glucide: f[i]['carboHydrates'] });
      }
    }

    this.autoCFG = autoCFG;
  }

  pushListFoods(f: Foods[], j: number) {



    this.listFoods.push(
      { id: f[j]['id'],
      name: f[j]['name'],
      categorie: (f[j]['foodsGroup']) ? f[j]['foodsGroup']['name'] : 'Non renseignée',
      glycIndex: f[j]['glycIndex'],
      energy: f[j]['energy'],
      carboHydrates: f[j]['carboHydrates'],
      proteins: f[j]['proteins'],
      lipids: f[j]['lipids'],
      comment: f[j]['comment'],
       }) ;

  }



}

