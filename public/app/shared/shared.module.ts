import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { PaginationComponent } from './pagination/pagination.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';
import { TrimPipe } from './pipes/trim.pipe';
import { FilterTextboxComponent } from './filter-textbox/filter-textbox.component';

@NgModule({
  imports: [ CommonModule, FormsModule ],
  declarations: [CapitalizePipe, TrimPipe, FilterTextboxComponent, PaginationComponent ],
  exports: [ CommonModule, FormsModule, CapitalizePipe, TrimPipe, FilterTextboxComponent, PaginationComponent ]
})
export class SharedModule { }
