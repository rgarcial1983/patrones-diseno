import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patron Chain of Responsibility
 * Es un patrón de diseño de comportamiento que te permite pasar solicitudes
 * a lo largo de una cadena de manejadores.
 *
 * * Es útil cuando se necesita procesar datos de diferentes maneras, pero no
 * * se sabe de antemano qué tipo de procesamiento se necesita o en qué orden
 * * pero se sabe que se necesita procesar en una secuencia.
 *
 * https://refactoring.guru/es/design-patterns/chain-of-responsibility
 */
interface Handler {
    setNext(handler: Handler): Handler;
    handle(request: string): void;
}

abstract class BaseHandler implements Handler {
    private nextHandler?: Handler;

    setNext(handler: Handler): Handler {
        this.nextHandler = handler;
        return handler;
    }

    handle(request: string): void {
        if (this.nextHandler) {
            this.nextHandler.handle(request);
        }
    }
}

// Soporte Básico
class BaiscSupport extends BaseHandler {
    override handle(request: string): void {
      if(request === 'básico') {
        console.log('%cSoporte básico: Resolviendo problema básico', COLORS.green)
        return;
      }

      console.log('Soporte básico: Pasando el probema a soporte avanzado');
      super.handle(request);
    }
}

// Soporte Avanzado
class AdvancedSupport extends BaseHandler {
    override handle(request: string): void {
      if(request === 'avanzado') {
        console.log('%cSoporte avanzado: Resolviendo problema avanzado', COLORS.yellow);
        return;
      }

      console.log('Soporte avanzado: Pasando el probema a soporte expert');
      super.handle(request);
    }
}

class ExpertSupport extends BaseHandler {
    override handle(request: string): void {
      if(request === 'experto') {
        console.log('%cSoporte experto: Resolviendo problema experto', COLORS.purple);
        return;
      }

      console.log('%cSoporte experto: No se puede resolver el problema.... bye bye', COLORS.red);
    }
}


function main() {

    const basicSupport = new BaiscSupport();
    const advancedSupport = new AdvancedSupport();
    const expertSupport = new ExpertSupport();

    basicSupport.setNext(advancedSupport).setNext(expertSupport);

    console.log('%c--- COMENZAMOS ---', COLORS.blue);
    basicSupport.handle('básico');
    basicSupport.handle('avanzado');
    basicSupport.handle('experto');
    basicSupport.handle('otro');

}

main();