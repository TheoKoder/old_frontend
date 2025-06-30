
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/Access-control/login/login.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { EGovComponent } from './pages/EGOVdata/e-gov/e-gov.component';
import { EGovDatabaseComponent } from './pages/EGOVdata/egov-database/egov-database.component';
import { AutomationsComponent } from './pages/automationComponents/automations/automations.component';
import { ControlZonesComponent } from './pages/controlZoneComponents/control-zones/control-zones.component';
import { AllDevicesComponent } from './pages/device/all-device-view/all-devices/all-devices.component';
import { ReportsDetailsComponent } from './components/device/reports-details/reports-details.component';
import { AutomationsDetailsComponent } from './pages/automationComponents/automations-details/automations-details.component';
//import { ReportsComponent } from './pages/device/device-reports/reports/reports.component';
import { ControlZoneDetailsComponent } from './components/controlzones/control-zone-details/control-zone-details.component';
import { DeviceLastlocationComponent } from './pages/device/device-details/device-lastlocation/device-lastlocation.component';
import { RegisterComponent } from './pages/Access-control/register/register.component';
import { DatabaseReportsComponent } from './pages/reports/database-reports/database-reports.component';
import { AllTagsComponent } from './pages/RFIDFrontend/tags/all-tags/all-tags.component';
import { CreateTagComponent } from './pages/RFIDFrontend/tags/create-tag/create-tag.component';
import { UpdateTagComponent } from './pages/RFIDFrontend/tags/update-tag/update-tag.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { TagDataTableComponent } from './pages/RFIDFrontend/tags/tag-data-table/tag-data-table.component';
import { CategoryTagComponent } from './pages/RFIDFrontend/tags/category-tag/category-tag.component';
import { ConditionTagComponent } from './pages/RFIDFrontend/tags/condition-tag/condition-tag.component';
import { BrandTagComponent } from './pages/RFIDFrontend/tags/brand-tag/brand-tag.component';
import { TagCreateDataTableComponent } from './pages/RFIDFrontend/tags/tag-create-data-table/tag-create-data-table.component';
import { LocationTagComponent } from './pages/RFIDFrontend/tags/location-tag/location-tag.component';
import { DataTablesUpdateComponent } from './pages/RFIDFrontend/tags/data-tables-update/data-tables-update.component';
import { DisposalTagComponent } from './pages/RFIDFrontend/tags/disposal-tag/disposal-tag.component';
import { ExistingTagsComponent } from './pages/RFIDFrontend/tags/existing-tags/existing-tags.component';
import { MissingtagsComponent } from './pages/RFIDFrontend/tags/missingtags/missingtags.component';
import { RFIDGateCurrentComponent } from './pages/RFIDFrontend/Gates/rfidgate-current/rfidgate-current.component';
import { RFIDGateReportComponent } from './pages/RFIDFrontend/Gates/rfidgate-report/rfidgate-report.component';
import { RFIDRegisterComponent } from './pages/RFIDFrontend/Gates/rfidregister/rfidregister.component';
import { DeviceDaliyReportComponent } from './pages/reports/device-daliy-report/device-daliy-report.component';
import { ReaderComponent } from './pages/RFIDFrontend/FixedReader/reader/ReaderComponent';
import { TagStatusComponent } from './pages/RFIDFrontend/FixedReader/tag-status/tag-status.component';
import { TagNewComponent } from './pages/RFIDFrontend/FixedReader/tag-new/tag-new.component';
import { TagInuseComponent } from './pages/RFIDFrontend/FixedReader/tag-inuse/tag-inuse.component';
import { TagLastlocationComponent } from './pages/RFIDFrontend/FixedReader/tag-lastlocation/tag-lastlocation.component';
import { roleGuard } from './services/role.guard';
import { Roles } from './classes/roles.model';
//import { UnauthorizedPageComponent } from './pages/unauthorized-page/unauthorized-page.component';
import { authGuard } from './services/auth.guard';
import { LogoutComponent } from './components/logout/logout.component';
import { LoginPageComponent } from './pages/Access-control/login-page/login-page.component';
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
import { TagPageComponent } from './pages/Admin-panel/tag-page/tag-page.component';
import { AssetViewDialogComponent } from './components/dialogs/asset-view-dialog/asset-view-dialog.component';
import { AssetViewTestPageComponent } from './pages/test/asset-view-test-page/asset-view-test-page.component';


export const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'logout', component:LogoutComponent },
    {path: 'login', component:LoginPageComponent},
    /* Laptop Install */
    {path:'laptopList',component:LaptoplistComponent,canActivate: [roleGuard], data: { expectedRole: ['OPERATOR','MANAGER']}},
    {path: 'assets', component:AssetsComponent,canActivate: [roleGuard], data: { expectedRole: ['OPERATOR','MANAGER']}},
    {path: 'e-gov', component:EGovComponent, canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    {path: 'e-govDatabase',component:EGovDatabaseComponent,canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    {path: 'automations', component:AutomationsComponent,canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    {path: 'control-zones', component:ControlZonesComponent,canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    {path: 'all-devices', component:AllDevicesComponent,canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    //{path: 'create-zone',component:CreateZoneComponent,canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    // {path: 'deviceDetails',component:AllDeviceDetailsComponent, canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    {path: 'detailed-report',component:ReportsDetailsComponent,canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    //{path: 'report',component:ReportsComponent,canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    {path: 'automations-details',component:AutomationsDetailsComponent,canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    //{path: 'reports', component:ReportsComponent,canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    {path: 'control-zone-details',component:ControlZoneDetailsComponent,canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    {path: 'last-location',component:DeviceLastlocationComponent,canActivate: [roleGuard], data: { expectedRole: ['OPERATOR','MANAGER']}},
    {path: 'register',component:RegisterComponent,canActivate:[authGuard]},
    {path:'AllReports',component:DatabaseReportsComponent,canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    {path:'DeviceDailyReport',component:DeviceDaliyReportComponent,canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    {path:'DeviceDailyExceptionReport',component:DeviceDailyExceptionComponent,canActivate: [roleGuard], data: { expectedRole: ['MANAGER']}},
    //{path: 'UnAuthorizedPage', component:UnauthorizedPageComponent,canActivate:[authGuard]},
    {path:'laptopTag',component:LaptopTagComponent,canActivate:[authGuard]},
    {path:'tagging',component:TaggingComponent,canActivate: [roleGuard], data: { expectedRole: ['OPERATOR','MANAGER']}},
    {path:'taggingValidation',component:TaggingValidationComponent,canActivate: [roleGuard], data: { expectedRole: ['OPERATOR','MANAGER']}},
    {path:'insertTag',component:InsertlaptopComponent},
    // {path:'insertTag',component:InsertlaptopComponent,canActivate: [roleGuard], data: { expectedRole: ['OPERATOR','MANAGER']}},
//-----------------------------------------------------------------------------------
//RFID Tags
    {path:'all-tags',component:AllTagsComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER']}},
    {path:'create-tag',component:CreateTagComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER']}},
    {path:'update-tag/:tagid',component:UpdateTagComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'Existing-Tags',component:ExistingTagsComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'Missing-Tags',component:MissingtagsComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'RFIDGate',component:RFIDGateCurrentComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'RFIDGateReport',component:RFIDGateReportComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER']}},
    {path:'RFIDRegister',component:RFIDRegisterComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'tag_area/:name',component:ReaderComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'status',component:TagStatusComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'newTag',component:TagNewComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'Inuse',component:TagInuseComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'lastlocation/:name',component:TagLastlocationComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},

//----------------------------------------------------------------------------------------
//Administrator
    {path:'administration',component:AdministrationComponent, canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'DataTable',component:TagDataTableComponent, canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'category-tag',component:CategoryTagComponent, canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'condition-tag',component:ConditionTagComponent, canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'brand-tag',component:BrandTagComponent, canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'createCategory',component:TagCreateDataTableComponent, canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'location-tag',component:LocationTagComponent, canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'update/:type/:id', component: DataTablesUpdateComponent, canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},
    {path:'disposal-tag',component:DisposalTagComponent, canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER']}},
    {path:'laptoplistC',component:LaptoplistdataComponent},
    // {path:'laptoplistC',component:LaptoplistdataComponent,canActivate: [roleGuard], data: { expectedRole: ['OPERATOR','ADMIN','MANAGER'] }},
    {path:'preybutton',component:PreybuttonpageComponent,canActivate: [roleGuard], data: { expectedRole: ['ADMIN','MANAGER'] }},

    // Laptops New Pages
    { path: 'AllMapView', component: MapAllViewComponent },
    { path: 'tagpage', component: TagPageComponent},
    //Theos testing page
    { path: 'assetView', component: AssetViewTestPageComponent}


];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
