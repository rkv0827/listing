import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Login } from './components/login/login';
import { Register } from './components/register/register';
import { App } from './app';
import { Default } from './components/default/default';
import { Addnew } from './components/addnew/addnew';
import { View } from './components/view/view';
import { Cardview } from './components/cardview/cardview';


const routes: Routes = [
  {path:'',component:Default},
  {path:'Home',component:Home},
  {path:'Login',component:Login},
  {path:'Register',component:Register},
  {path:'Adddata',component:Addnew},
  { path: 'Card/:id', component: Cardview },
  {path:'View',component:View}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
