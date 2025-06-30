import { Location } from "./location";

export class Devices {
    name!: string;
    key!: string;
    description!: string;
    missing!: boolean;
    location!: Location;
    state!: string;
    client_outdated!: boolean;
    last_checked_in!: Date;
    os!: string;
    os_version!: string;
    client_version!: string;
    reports_count!: number;
    device_contact!: any;
    lendable!: boolean;
    created_at!: Date;
    serial_number!: string;
    uuid!: string;
    bios_vendor!: any;
    bios_version!: any;
    ram_size!: number;
    ram_modules!: any;
    cpu_model!: string;
    cpu_speed!: number;
    cpu_cores!: number;
    mb_version!: any;
    label_names!: any;
    online!: any;
}
