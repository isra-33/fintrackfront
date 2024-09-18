import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ViewlistComponent } from './complaints/viewlist/viewlist.component';
import { HomeComponent } from './home/home.component';
import { ClientListComponent } from './client/client-list/client-list.component';
import { LayoutComponent } from './layout/layout.component';
import { ComplaintDetailsComponent } from './complaints/complaint-details/complaint-details.component';
import { ClientDetailsComponent } from './client/client-details/client-details.component';
import { AgentListComponent } from './agents/agent-list/agent-list.component';
import { AgentDetailsComponent } from './agents/agent-details/agent-details.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },{
    path: 'login',
    component: LoginComponent
  },
  { path: '',
    component: LayoutComponent,
    children:[
      { path: '**', redirectTo: 'login', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'complaints', component: ViewlistComponent },
      { path: 'complaints/details/:id', component: ComplaintDetailsComponent },
      { path: 'clients', component: ClientListComponent },
      { path: 'clients/details/:id', component: ClientDetailsComponent },
      { path: 'agent',component: AgentListComponent}, 
      { path: 'agent/details/:id',component: AgentDetailsComponent
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
