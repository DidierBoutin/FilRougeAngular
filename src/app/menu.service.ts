import { Menu } from './menu';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() {
    this.selectedMenu = this.menu[0];

  }
  public selectedMenu: Menu;

  menu: Menu[] = [

    {
      'id': 0,
      'name': 'Connexion',
      'description': 'Page under construction !',
      'position': 'header',
      'path': '/connexion',
    },
    {
      'id': 1,
      'name': 'Aliments',
      'description': 'Ca va bientôt fonctionner !!!',
      'position': 'header',
      'path': '/aliments',
    },
    {
      'id': 2,
      'name': 'Repas',
      'description': 'Ca va bientôt fonctionner !! !',
      'position': 'header',
      'path': '/repas',
    },
    {
      'id': 3,
      'name': 'Recette',
      'description': 'Page under construction ! !',
      'position': 'header',
      'path': '/recette',
    },
    {
      'id': 4,
      'name': 'Historique',
      'description': 'Page under construction ! !',
      'position': 'header',
      'path': '/historique',
    },
    {
      'id': 5,
      'name': 'Profil',
      'description': 'Page under construction ! !',
      'position': 'header',
      'path': '/profil',
    },
    {
      'id': 6,
      'name': 'Mentions légales',
      'description': 'Page under construction ! !',
      'position': 'footer',
      'path': '/mentions légales',
    },
    {
      'id': 7,
      'name': 'Données personnelles',
      'description': 'Page under construction ! !',
      'position': 'footer',
      'path': '/Données personnelles',
    },

  ];

  getList(position): Menu [] {
    return this.menu.filter(item => item.position === position);
  }


}
