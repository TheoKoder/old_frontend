import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoginComponent } from './pages/Access-control/login/login.component';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { LeftMenuComponent } from './components/common/left-menu/left-menu.component';
import { TopMenuComponent } from './components/common/top-menu/top-menu.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import { AngularPaginatorModule } from 'angular-paginator';
import { ThreeLayerLayoutComponent } from './pages/layouts/three-layer-layout/three-layer-layout.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { EGovComponent } from './pages/EGOVdata/e-gov/e-gov.component';
import { EGovDatabaseComponent } from './pages/EGOVdata/egov-database/egov-database.component';
import { AutomationsComponent } from './pages/automationComponents/automations/automations.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ControlZonesComponent } from './pages/controlZoneComponents/control-zones/control-zones.component';
import { AllDevicesComponent } from './pages/device/all-device-view/all-devices/all-devices.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { ReportsComponent } from './pages/reports/reports/reports.component';
import { AllDeviceMapComponent } from './pages/device/all-device-map/all-device-map.component';
import { DeviceLastlocationComponent } from './pages/device/device-details/device-lastlocation/device-lastlocation.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AutomationsDetailsComponent } from './pages/automationComponents/automations-details/automations-details.component';
import { ReportsDetailsComponent } from './components/device/reports-details/reports-details.component';
import { jsPDF } from 'jspdf';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DeviceHardwareComponent } from './pages/device/device-details/device-hardware/device-hardware.component';
import { AllDeviceCardComponent } from './pages/device/all-device-view/all-device-card/all-device-card.component';
import { RegisterComponent } from './pages/Access-control/register/register.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { DatabaseReportsComponent } from './pages/reports/database-reports/database-reports.component';
import { AllTagsComponent } from './pages/RFIDFrontend/tags/all-tags/all-tags.component';
import { TagThreeLayerLayoutComponent } from './pages/RFIDFrontend/layouts/tag-three-layer-layout/tag-three-layer-layout.component';
import { TagLeftMenuComponent } from './pages/RFIDFrontend/layouts/tag-left-menu/tag-left-menu.component';
import { CreateTagComponent } from './pages/RFIDFrontend/tags/create-tag/create-tag.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { UpdateTagComponent } from './pages/RFIDFrontend/tags/update-tag/update-tag.component';
import { TagDataTableComponent } from './pages/RFIDFrontend/tags/tag-data-table/tag-data-table.component';
import { TagCreateDataTableComponent } from './pages/RFIDFrontend/tags/tag-create-data-table/tag-create-data-table.component';
import { CategoryTagComponent } from './pages/RFIDFrontend/tags/category-tag/category-tag.component';
import { ConditionTagComponent } from './pages/RFIDFrontend/tags/condition-tag/condition-tag.component';
import { BrandTagComponent } from './pages/RFIDFrontend/tags/brand-tag/brand-tag.component';
import { LocationTagComponent } from './pages/RFIDFrontend/tags/location-tag/location-tag.component';
import { DataTablesUpdateComponent } from './pages/RFIDFrontend/tags/data-tables-update/data-tables-update.component';
import { DisposalTagComponent } from './pages/RFIDFrontend/tags/disposal-tag/disposal-tag.component';
import { ExistingTagsComponent } from './pages/RFIDFrontend/tags/existing-tags/existing-tags.component';
import { MissingtagsComponent } from './pages/RFIDFrontend/tags/missingtags/missingtags.component';
import { RFIDGateCurrentComponent } from './pages/RFIDFrontend/Gates/rfidgate-current/rfidgate-current.component';
import { RFIDGateReportComponent } from './pages/RFIDFrontend/Gates/rfidgate-report/rfidgate-report.component';
import { RFIDRegisterComponent } from './pages/RFIDFrontend/Gates/rfidregister/rfidregister.component';
import { DeviceDaliyReportComponent } from './pages/reports/device-daliy-report/device-daliy-report.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import { TreeModule } from 'primeng/tree';
import {MatTreeModule} from '@angular/material/tree';


import { AdminThreeLayerLayoutComponent } from './pages/Admin-panel/layouts/admin-three-layer-layout/admin-three-layer-layout.component';
import { AdminLeftMenuComponent } from './pages/Admin-panel/layouts/admin-left-menu/admin-left-menu.component';
import { ReaderComponent } from './pages/RFIDFrontend/FixedReader/reader/ReaderComponent';
import { TagStatusComponent } from './pages/RFIDFrontend/FixedReader/tag-status/tag-status.component';
import {MatTabsModule} from '@angular/material/tabs';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { TagNewComponent } from './pages/RFIDFrontend/FixedReader/tag-new/tag-new.component';
import { TagInuseComponent } from './pages/RFIDFrontend/FixedReader/tag-inuse/tag-inuse.component';
import { GraphModule } from './pages/RFIDFrontend/FixedReader/stacked-chart/graph.module';
import { TagLastlocationComponent } from './pages/RFIDFrontend/FixedReader/tag-lastlocation/tag-lastlocation.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { AccessDialogComponent } from './components/access-dialog/access-dialog.component';
import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
import { UrlService } from './services/url.service';
import { LaptopRegisterLinkComponent } from './components/laptop-register-link/laptop-register-link.component';
import { SPSharedModule } from './components/spshared.module';
import { LoginPageComponent } from './pages/Access-control/login-page/login-page.component'
import { LaptoplistComponent } from './pages/Laptops/laptoplist/laptoplist.component';
import { LaptopTagComponent } from './pages/Laptops/laptop-tag/laptop-tag.component';

import { TaggingValidationComponent } from './pages/Laptops/tagging-validation/tagging-validation.component';
import { LaptoplistdataComponent } from './pages/Laptops/laptoplistdata/laptoplistdata.component';
import { TaggingComponent } from './pages/Laptops/tagging/tagging.component';
import { PreybuttonpageComponent } from './pages/Admin-panel/preybuttonpage/preybuttonpage.component';
import { InsertlaptopComponent } from './pages/Laptops/insertlaptop/insertlaptop.component';
import { AdministrationComponent } from './pages/Admin-panel/administration/administration.component';
import { MapAllViewComponent } from './pages/Laptops/map-all-view/map-all-view.component';
import { DeviceDailyExceptionComponent } from './pages/reports/device-daily-exception/device-daily-exception.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TagPageComponent } from './pages/Admin-panel/tag-page/tag-page.component';
import { AssetViewTestPageComponent } from './pages/test/asset-view-test-page/asset-view-test-page.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ThreeLayerLayoutComponent,
    LoginPageComponent,
    AssetsComponent,
    EGovComponent,
    EGovDatabaseComponent,
    AutomationsComponent,
    ControlZonesComponent,
    AllDevicesComponent,
    AllDeviceMapComponent,
    DeviceLastlocationComponent,
    ReportsComponent,
    AllDeviceMapComponent,
    AutomationsDetailsComponent,
    ReportsDetailsComponent,
    DeviceHardwareComponent,
    AllDeviceCardComponent,
    RegisterComponent,
    DatabaseReportsComponent,
    AllTagsComponent,
    TagThreeLayerLayoutComponent,
    TagLeftMenuComponent,
    CreateTagComponent,
    UpdateTagComponent,
    TagDataTableComponent,
    TagCreateDataTableComponent,
    CategoryTagComponent,
    ConditionTagComponent,
    BrandTagComponent,
    LocationTagComponent,
    DataTablesUpdateComponent,
    DisposalTagComponent,
    ExistingTagsComponent,
    MissingtagsComponent,
    RFIDGateCurrentComponent,
    RFIDGateReportComponent,
    RFIDRegisterComponent,
    DeviceDaliyReportComponent,
    AdminThreeLayerLayoutComponent,
    AdministrationComponent,
    AdminLeftMenuComponent,
    ReaderComponent,
    TagStatusComponent,
    TagNewComponent,
    TagInuseComponent,
    TagLastlocationComponent,
    AccessDialogComponent,
    UnauthorizedPageComponent,
    LaptopRegisterLinkComponent,
    LaptoplistComponent,
    LaptopTagComponent,
    TaggingComponent,
    TaggingValidationComponent,
    LaptoplistdataComponent,
    PreybuttonpageComponent,
    InsertlaptopComponent,
    MapAllViewComponent,
    DeviceDailyExceptionComponent,
    TagPageComponent,
    AssetViewTestPageComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    MatTreeModule,
    CommonModule,
    FlexLayoutModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatCheckboxModule,
    MatDividerModule,
    MatListModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    AngularPaginatorModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    NgxPaginationModule,
    MatInputModule,
    MatNativeDateModule,
    CommonModule,
    MatMenuModule,
    TreeModule,
    MatTabsModule,
    CanvasJSAngularChartsModule,
    GraphModule,
    DialogModule,
    ButtonModule,
    MatTooltipModule,
    SPSharedModule

  ],
  providers: [UrlService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// platformBrowserDynamic().bootstrapModule(AppModule);
