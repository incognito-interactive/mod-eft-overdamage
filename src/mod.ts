import { IPostDBLoadMod } from "@spt/models/external/IPostDBLoadMod";
import { DatabaseServer } from "@spt/servers/DatabaseServer";
import { DependencyContainer } from "tsyringe";
import { ILogger } from "@spt/models/spt/utils/ILogger";


// Imports the stuff from the config file.
import {
    enabled,
    logBalancingWarnings,
    multiplierHands,
    multiplierLegs,
    multiplierStomach
} from "../config/config.json";


// Mod stuff here.
class Overdamage implements IPostDBLoadMod {
    public postDBLoad(container: DependencyContainer): void {
        // Return if the mod is disabled.
        if (!enabled) return;

        // Get the logger.
        const logger = container.resolve<ILogger>("WinstonLogger");

        // Calculate the average multiplier which the user has set.
        const averageMultiplier = (multiplierHands + multiplierLegs + multiplierStomach) / 3;

        // Log a balancing warning if the average multiplier is very high or very low.
        if (logBalancingWarnings && averageMultiplier < 0.1 || averageMultiplier > 10) logger.warning("Overdamage: The recommended multiplier range is between '1.5' and '3.0'!");

        // Get the Database Server.
        const databaseServer = container.resolve<DatabaseServer>("DatabaseServer");

        // Get the globals config.
        const globals = databaseServer.getTables().globals.config;

        // Multiply all the overdamage values.
        // That is literally all this mod does, we're done.
        globals.HandsOverdamage *= multiplierHands;
        globals.LegsOverdamage *= multiplierLegs;
        globals.StomachOverdamage *= multiplierStomach;
    }
}


// Export the mod.
export const mod = new Overdamage();
