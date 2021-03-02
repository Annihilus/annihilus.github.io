import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SettingsComponent } from './settings/settings.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule} from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';

import { epgpService } from './service';
import { PlayersListComponent } from './players-list/players-list.component';
import { PlayersListItemComponent } from './players-list-item/players-list-item.component';
import { PlayersAddDialogComponent } from './players-add-dialog/players-add-dialog.component';
import { PlayersAddEpgpComponent } from './players-add-epgp/players-add-epgp.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsComponent,
    PlayersListComponent,
    PlayersListItemComponent,
    PlayersAddDialogComponent,
    PlayersAddEpgpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatIconModule,
    MatTableModule,
    MatToolbarModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatDialogModule,
    MatTabsModule,
    MatMenuModule,
  ],
  providers: [
    epgpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
