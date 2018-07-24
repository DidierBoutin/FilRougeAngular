import { Ng2SmartTableModule } from 'ng2-smart-table';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { FooterComponent } from './footer/footer.component';
import {FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './/app-routing.module';
import { RouterModule, Routes } from '@angular/router';
import { AlimentsComponent } from './aliments/aliments.component';
import { RepasComponent } from './repas/repas.component';
import { RecettesComponent } from './recettes/recettes.component';
import { HistoriqueComponent } from './historique/historique.component';
import { ConnexionComponent } from './connexion/connexion.component';
import { ProfilComponent } from './profil/profil.component';
import { Page404Component } from './page404/page404.component';
import { MatChipsModule, MatTableModule, MatIconModule } from '@angular/material';
import {MatButtonModule} from '@angular/material/button';






// tslint:disable-next-line:max-line-length
import { MatToolbarModule, MatCardModule, MatAutocompleteModule, MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LineFoodComponent } from './line-food/line-food.component';




const routes: Routes = [
  { path: '',
   redirectTo: 'aliments', pathMatch: 'full' },
   {
    path: 'repas',
    component: RepasComponent
  },
   {
  path: 'aliments',
  component: AlimentsComponent
},
{
  path: 'recettes',
  component: RecettesComponent
},
{
  path: 'historique',
  component: HistoriqueComponent
},
{
  path: 'connexion',
  component: ConnexionComponent
},
{
  path: 'profil',
  component: ProfilComponent
},
{ path: '**',
component: Page404Component  }
];




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
    AlimentsComponent,
    RepasComponent,
    RecettesComponent,
    HistoriqueComponent,
    ConnexionComponent,
    ProfilComponent,
    Page404Component,
    LineFoodComponent,

    ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    MatChipsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    Ng2SmartTableModule,
    MatIconModule,
            ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

