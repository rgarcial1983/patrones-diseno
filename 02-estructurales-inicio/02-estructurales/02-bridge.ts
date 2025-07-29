/**
 * ! Patrón Bridge
 * Este patrón nos permite desacoplar una abstracción de su implementación,
 * de tal forma que ambas puedan variar independientemente.
 *
 * * Es útil cuando se tienen múltiples implementaciones de una abstracción
 * * Se puede utilizar para separar la lógica de negocio de la lógica de presentación
 * * Se puede utilizar para separar la lógica de la interfaz de usuario también.
 *
 * https://refactoring.guru/es/design-patterns/bridge
 */

import { COLORS } from "../helpers/colors.ts";

interface Ability {
    use(): void;
}

class SwordAttack implements Ability {
    use(): void {
        console.log('Usando %cespada para atacar', COLORS.cyan);
    }
}

class MagicSpell implements Ability {
    use(): void {
        console.log('Usando %chechizo mágico para atacar', COLORS.purple);
    }
}

class FireBallSpell implements Ability {
    use(): void {
        console.log('Lanza %cbola de fuego', COLORS.red);
    }
}

class AxeAttack implements Ability {
    use(): void {
        console.log('Usando %cHacha brutalmente', COLORS.green);
    }
}


abstract class Character {
    protected ability: Ability;

    constructor(ability: Ability) {
        this.ability = ability;
    }

    setAbility(ability: Ability): void {
        this.ability = ability;
    }

    abstract performAbility(): void;
}

class Warrior extends Character {

    override performAbility(): void {
        console.log('\nEl guerrero está listo para luchar')
        this.ability.use();
    }

}

class Mage extends Character {

    override performAbility(): void {
        console.log('\nEl mago prepara su magia')
        this.ability.use();
    }

}

function main() {
    const warrior = new Warrior( new SwordAttack());
    warrior.performAbility();

    warrior.setAbility(new AxeAttack())
    warrior.performAbility();

    const mage = new Mage( new FireBallSpell());
    mage.performAbility();
}

main();
