import { Component, OnInit } from '@angular/core';
import { Menu } from './../menu';
import { MenuService } from './../menu.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
menu;
  constructor(public menuService: MenuService) { }

  ngOnInit() {
    this.menu = this.menuService.menu;
  }
selectMenu (m: Menu) {
   this.menuService.selectedMenu = m;
  }

}
