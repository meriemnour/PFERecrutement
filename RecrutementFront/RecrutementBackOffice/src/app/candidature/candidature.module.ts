import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { AddCandidatureComponent } from './add-candidature/add-candidature.component';
import { UpdateCandidatureComponent } from './update-candidature/update-candidature.component';
import { CandidatureRoutes } from './candidature.routing';
import { RouterModule } from '@angular/router';
import { CandidatureComponent } from './candidature.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CandidatureComponent,
    AddCandidatureComponent,
    UpdateCandidatureComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CandidatureRoutes),
    FormsModule

  ]
})
export class CandidatureModule { }
