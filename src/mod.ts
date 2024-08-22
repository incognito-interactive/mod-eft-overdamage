import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { DependencyContainer } from "tsyringe";

import {
    multiplier
} from "../config/config.json";

class Overdamage implements IPostDBLoadMod {
    public postDBLoad(container: DependencyContainer): void {
        // Get the Database Server.
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        // Get the globals config.
        const globals = databaseServer.getTables().globals.config;

        // Multiply all the overdamage values.
        // That is literally all this mod does, we're done.
        globals.LegsOverdamage *= multiplier;
        globals.HandsOverdamage *= multiplier;
        globals.StomachOverdamage *= multiplier;
    }
}

export const mod = new Overdamage();
