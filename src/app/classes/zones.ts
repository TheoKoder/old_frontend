import { Actions } from "./actions";
import { Notifications } from "./notifications";
import { ZoneDevices } from "./zone-devices";

export class Zones {
    id!: string;
    name!: string;
    lat!: any;
    lng!: any
    radius: any;
    color!: any;
    devices: ZoneDevices[] = [];
    actions: Actions[] = []; 
    notifications!: Notifications;
}
