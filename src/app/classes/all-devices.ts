import { DeviceDetails } from "./device-details";
import { Labels } from "./labels";
import { LoanDetails } from "./loan-details";
import { NetworkStatus } from "./network-status";
import { OsDetails } from "./os-details";
import { ReportDetails } from "./report-details";
import { User } from "./user";

export class AllDevices {
    id!: any;
    missing!: boolean;
    name: any;
    os_details!: OsDetails
    type!: any;
    client_outdated!: boolean;
    client_version!: any;
    description!: any;
    logged_user!: any;
    network_status!: NetworkStatus
    user!: User
    automations!: [];
    zone!: [];
    labels: Labels[] = [];
    reports_details!: ReportDetails;
    device_details!: DeviceDetails;
    loan_details!: LoanDetails;
}
