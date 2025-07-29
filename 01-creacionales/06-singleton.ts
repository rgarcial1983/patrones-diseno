 /**
 * ! Singleton:
 * Es un patrón de diseño creacional que garantiza que una clase
 * tenga una única instancia y proporciona un punto de acceso global a ella.
 *
 * * Es útil cuando necesitas controlar el acceso a una única instancia
 * * de una clase, como por ejemplo, en un objeto de base de datos o en un
 * * objeto de configuración.
 *
 * https://refactoring.guru/es/design-patterns/singleton
 */

import { COLORS } from "../helpers/colors.ts";

 class DragonBalls {

    private static instance: DragonBalls;
    private ballsCollected: number;

    private constructor() {
        this.ballsCollected = 0;
    }

    public static getInstance(): DragonBalls {
        if(!DragonBalls.instance) {
            DragonBalls.instance = new DragonBalls();
            console.log('%cLas bolas del Dragón has sido creadas!', COLORS.green);
        }

        return DragonBalls.instance;
    }


    collectBall(): void {
        if( this.ballsCollected < 7) {
            this.ballsCollected++;
            console.log(`Bola de dragón recolectada. Total de bolas: ${ this.ballsCollected }`);
            return;
        }

        console.log('Ya se han recolectado las 7 bolas del dragón!')
    }

    summonShenLong() {
        if ( this.ballsCollected === 7) {
            console.log('%cShenlong ha sido invocado, Pide tu deseo!', COLORS.blue);
            this.ballsCollected = 0;
            return;
        }

        console.log(`\n%cAún faltan ${ 7 - this.ballsCollected} bolas churra!!`, COLORS.red);
    }

 }

 function main() {
    const goku = DragonBalls.getInstance();
    
    goku.collectBall();
    goku.collectBall();
    goku.collectBall();

    goku.summonShenLong();

    const krilin = DragonBalls.getInstance();
    krilin.collectBall();
    krilin.collectBall();
    krilin.collectBall();
    krilin.collectBall();

    goku.summonShenLong();
    krilin.summonShenLong();
 }

 main()