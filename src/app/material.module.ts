import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';

const modules = [MatButtonModule, MatIconModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule { }
