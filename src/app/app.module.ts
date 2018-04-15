import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

// Pages
import { AjoutPage } from '../pages/ajout/ajout';
import { ProjetsPage } from '../pages/projets/projets';
import { HomePage } from '../pages/home/home';
import { SubProjectPage } from '../pages/subproject/subproject';
import { TabsPage } from '../pages/tabs/tabs';

// Modules
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Keyboard } from '@ionic-native/keyboard';

import { SQLite } from '@ionic-native/sqlite';

// Services
import { SaverService } from "../services/saver.service";
import { NotifyService } from "../services/notify.service";

@NgModule({
  declarations: [
    MyApp,
    AjoutPage,
    ProjetsPage,
    HomePage,
    SubProjectPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AjoutPage,
    ProjetsPage,
    HomePage,
    SubProjectPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    SaverService,
    Keyboard,
    NotifyService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
