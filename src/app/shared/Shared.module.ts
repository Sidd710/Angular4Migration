import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatepickerModule } from 'ng2-bootstrap/ng2-bootstrap';
import { DatePickerDropDownComponent } from './datepicker-dropdown.component';

@NgModule({
    imports: [
        DatepickerModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        DatePickerDropDownComponent,
    ],
    exports: [
        DatePickerDropDownComponent,
    ]
})

export class SharedModule {}
