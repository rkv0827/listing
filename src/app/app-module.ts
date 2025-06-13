import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { AppCall } from './service/app-call';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { FormsModule } from '@angular/forms';
import { Default } from './components/default/default';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { View } from './components/view/view';
import { Addnew } from './components/addnew/addnew';
import { Cardview } from './components/cardview/cardview';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
  declarations: [
    App,
    Home,
    Login,
    Register,
    Default,
    View,
    Addnew,
    Cardview
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
