/**
 * ! Patrón Proxy
 * Este patrón se utiliza para controlar el acceso a un objeto, es decir,
 * se crea un objeto que actúa como intermediario entre el cliente y el objeto real.
 *
 * * Es útil cuando necesitamos controlar el acceso a un objeto,
 * * por ejemplo, para verificar si el cliente tiene permiso
 * * para acceder a ciertos métodos o propiedades.
 *
 * https://refactoring.guru/es/design-patterns/proxy
 *
 */

import { COLORS } from "../helpers/colors.ts";

class Player {
    name: string;
    level: number;

    constructor(name: string, level: number){
        this.name = name;
        this.level = level;
    }
}

interface Room {
    enter( player: Player) : void;
}

class SecretRoom implements Room {

  enter(player: Player): void {
    console.log(`%cBienvenido a la sala secreta, ${ player.name }`, COLORS.green);
    console.log(`Un gran enemigo te espera`);
  }
}

//3. clase Proyx - Magic Portal
class MagicPortal implements Room {
  private secretRoom: Room;

  constructor(room: Room) {
    this.secretRoom = room;
  }

  enter(player: Player): void {
    if (player.level < 10) {
      console.log(`%c${ player.name }, no puedes entrar a la sala secreta, tu nivel es muy bajo`, COLORS.red);
      return;
    }
    this.secretRoom.enter(player);
  }
}

function main() {
  const magicPortal = new MagicPortal(new SecretRoom());

  const player1 = new Player("Juan", 5);
  const player2 = new Player("Maria", 15);

  console.log('%cJuan intenta entrar al portal', COLORS.blue);
  magicPortal.enter(player1);
  
  console.log('%cMaria intenta entrar al portal', COLORS.blue);
  magicPortal.enter(player2);
}

main();