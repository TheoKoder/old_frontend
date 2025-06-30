import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { PanelModule } from 'primeng/panel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TwoLayerLayoutComponent } from './layout/two-layer-layout/two-layer-layout.component';
//import { ThreeLayerLayoutComponent } from './layout/three-layer-layout/three-layer-layout.component';
import { LeftMenuComponent } from './common/left-menu/left-menu.component';
import { TopMenuComponent } from './common/top-menu/top-menu.component';
import { TreeViewComponent } from './common/tree-view/tree-view.component';
import { MatTreeModule } from '@angular/material/tree';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { DataTableComponent } from './data-table/data-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { UIService } from './utils/ui.service';
import { MapComponent } from './map/map.component';
import { CZDetailDialogComponent } from './dialogs/czdetail-dialog/czdetail-dialog.component';
import { ControlZoneDetailsComponent } from './controlzones/control-zone-details/control-zone-details.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatListModule } from '@angular/material/list';
import { DeviceDetailsComponent } from './device/device-details/device-details.component';
import { AlarmComponent } from './device/actions/alarm/alarm.component';
import { LockComponent } from './device/actions/lock/lock.component';
import { AlertComponent } from './device/actions/alert/alert.component';
import { ActionsComponent } from './device/actions/actions/actions.component';
import { NotificationsComponent } from './device/actions/notifications/notifications.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ControlZoneMapComponent } from './controlzones/control-zone-map/control-zone-map.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ConfirmationDialogComponent } from './device/confirmation-dialog/confirmation-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { PreybuttonComponent } from './admin/preybutton/preybutton.component';
import { MesgDialogComponent } from './dialogs/mesg-dialog/mesg-dialog.component';
import { VerificationDialogComponent } from './dialogs/verification-dialog/verification-dialog.component';
import {MatStepperModule} from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { AddTagComponent } from './dialogs/add-tag/add-tag.component';
import { DeactivateTagComponent } from './dialogs/deactivate-tag/deactivate-tag.component';
import { ClouddeviceDialogComponent } from './dialogs/clouddevice-dialog/clouddevice-dialog.component';
import { AssetViewDialogComponent } from './dialogs/asset-view-dialog/asset-view-dialog.component';


@NgModule({
  declarations: [
    LoginComponent,
    TwoLayerLayoutComponent,
    //ThreeLayerLayoutComponent,
    LeftMenuComponent,
    TopMenuComponent,
    TreeViewComponent,
    DataTableComponent,
    ProgressBarComponent,
    MapComponent,
    CZDetailDialogComponent,
    ControlZoneDetailsComponent,
    DeviceDetailsComponent,
    AlarmComponent,
    LockComponent,
    AlertComponent,
    ActionsComponent,
    NotificationsComponent,
    ControlZoneMapComponent,
    ConfirmationDialogComponent,
    PreybuttonComponent,
    MesgDialogComponent,
    VerificationDialogComponent,
    AddTagComponent,
    DeactivateTagComponent,
    ClouddeviceDialogComponent,
    AssetViewDialogComponent
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule,
    PanelModule,
    ReactiveFormsModule,
    FormsModule,
    MatTreeModule,
    MatIconModule,
    RouterModule,
    MatPaginatorModule,
    MatProgressBarModule,
    NgxPaginationModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    MatCardModule,
    MatStepperModule
  ],
  exports: [
    LoginComponent,
    TwoLayerLayoutComponent,
    DataTableComponent,
    TopMenuComponent,
    LeftMenuComponent,
    ProgressBarComponent,
    MapComponent,
    CZDetailDialogComponent,
    ControlZoneDetailsComponent,
    DeviceDetailsComponent,
    TreeViewComponent,
    AlertComponent,
    ActionsComponent,
    LockComponent,
    NotificationsComponent,
    AlarmComponent,
    ControlZoneMapComponent,
    ConfirmationDialogComponent,
    PreybuttonComponent,
    MesgDialogComponent,
    VerificationDialogComponent,
    AddTagComponent,
    DeactivateTagComponent,
    ClouddeviceDialogComponent,
    AssetViewDialogComponent
  ],
  providers: [UIService],
})
export class SPSharedModule { }
