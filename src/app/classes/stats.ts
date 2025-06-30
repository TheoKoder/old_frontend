import { OperatingSystem } from "./operating-system"
import { LoanedDevices } from "./loaned-devices"
import { PreyClient } from "./prey-client"
import { MissingDevices } from "./missing-devices"


export class Stats {
    operating_system!: OperatingSystem;    
    loaned_devices!: LoanedDevices;
    missing_devices!: MissingDevices;
    prey_client!: PreyClient;
}
