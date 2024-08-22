import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { DependencyContainer } from "tsyringe";

import {
    enabled,
    logBalancingWarnings,
    multiplier
} from "../config/config.json";
import { ILogger } from "@spt/models/spt/utils/ILogger";

class Overdamage implements IPostDBLoadMod {
    public postDBLoad(container: DependencyContainer): void {
        // Return if the mod is disabled.
        if (!enabled) return;

        // Get the logger.
        const logger = container.resolve<ILogger>("WinstonLogger");

        // If warning is enabled and the multiplier is set incredibly high or too low then log a warning.
        if (logBalancingWarnings && multiplier < 1 || multiplier > 10) logger.warning("Overdamage: The recommended multiplier range is between '1.5' to '3.0'!")

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
