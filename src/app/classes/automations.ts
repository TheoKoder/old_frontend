import { AutomationActions } from "./automation-actions";
import { AutomationDevices } from "./automation-devices";
import { AutomationEvents } from "./automation-events";
import { Options } from "./options";

export class Automations {

    id!: any;
    name!: any;
    device_name!:any
    state!: any;
    // options!: Options;
    timezone!: any;
    target!:any;
    event_type!:any;
    automation_events: AutomationEvents[] = [];
    automation_actions: AutomationActions[] = [];
    automation_devices: AutomationDevices[] = [];

}
