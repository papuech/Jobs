import { Component } from '@angular/core';

import { AjoutPage } from '../ajout/ajout';
import { ProjetsPage } from '../projets/projets';
import { HomePage } from '../home/home';
import { SubProjectPage } from '../subproject/subproject';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ProjetsPage;
  tab3Root = AjoutPage;
  tab4Root = SubProjectPage;

  constructor() {

  }
}
