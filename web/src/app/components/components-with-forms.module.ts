import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule, FormsModule ],
  declarations: [],
  exports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class ComponentsWithFormsModule {}
