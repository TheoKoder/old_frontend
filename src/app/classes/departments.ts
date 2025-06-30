import { Devices } from "./devices";
import { Stats } from "./stats";

export class Departments {
    id!: number;
    name!: string;
    setup_key!: string;
    created_at!: Date;
    labels: any;
    assigned_slots!: number;
    added_devices!: number;
    stats!: Stats;
    devices: Devices[] = []
          
}
