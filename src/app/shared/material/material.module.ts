import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
    imports: [
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule, 
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatBottomSheetModule,
        MatListModule,
        MatCardModule,
        MatSnackBarModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatTabsModule,
        MatAutocompleteModule
    ],
    exports: [
        MatToolbarModule,
        MatMenuModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatBottomSheetModule,
        MatListModule,
        MatCardModule,
        MatSnackBarModule,
        MatButtonToggleModule,
        MatDialogModule,
        MatTabsModule,
        MatAutocompleteModule
    ]
})
export class MaterialModule { }
