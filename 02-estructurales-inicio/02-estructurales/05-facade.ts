/**
 * ! Patrón Facade
 * Este patrón proporciona una interfaz unificada para un conjunto de interfaces
 * en un subsistema.
 *
 * Facade define una interfaz de nivel más alto que hace que el subsistema
 * sea más fácil de usar.
 *
 * * Es útil cuando un subsistema es complejo o difícil de entender para
 * * proporcionar una interfaz simplificada para el cliente.
 *
 * https://refactoring.guru/es/design-patterns/facade
 */

import { COLORS } from "../helpers/colors.ts";

class Proyector {
    on() {
        console.log('Proyector encendido!');
    }

    turnoff() {
        console.log('Proyector apagándose!');
    }
}

class SoundSystem {
    on() {
        console.log('Sistema de sonido encendido!');
    }

    off() {
        console.log('Sistema de sonido apagado!');
    }
}

class VideoPlayer {
    on() {
        console.log('Video player encendido');
    }

    play (movie: string) {
        console.log(`Reproduciendo %c${ movie }`, COLORS.red);
    }

    stop() {
        console.log('pelicula detenida');
    }

    off() {
        console.log('Video player apagado')
    }
}

class PopcornMaker {
    poppingPorcorn() {
        console.log('Haciendo palomitas')
    }

    turnOffPoppingcorn() {
        console.log('apagando la palomitera')
    }
}

interface HomeTheaterFacadeOptions {
    proyector: Proyector;
    soundSystem: SoundSystem;
    videoPlayer: VideoPlayer;
    popcornMaker: PopcornMaker;
}

class HomeTheaterFacade {
    
    private proyector: Proyector;
    private soundSystem: SoundSystem;
    private videoPlayer: VideoPlayer;
    private popcornMaker: PopcornMaker;

    constructor({
        proyector,
        soundSystem,
        videoPlayer,
        popcornMaker
    }: HomeTheaterFacadeOptions) {
        this.proyector = proyector;
        this.soundSystem = soundSystem;
        this.videoPlayer = videoPlayer;
        this.popcornMaker = popcornMaker;
    }

    public watchMovie(movie: string) {
        console.log('%cPreparando para ver la película', COLORS.blue);
        this.proyector.on();
        this.soundSystem.on();
        this.videoPlayer.on();
        this.popcornMaker.poppingPorcorn();
        this.videoPlayer.play(movie);

        console.log('%cDisfrute la película', COLORS.blue);
    }

    public endMovie() {
        console.log('%c\n\nPreparando para detener la película', COLORS.blue);
        this.proyector.turnoff();
        this.soundSystem.off();
        this.videoPlayer.stop();
        this.videoPlayer.off();
        this.popcornMaker.turnOffPoppingcorn();

        console.log('%cSistema apagado\n', COLORS.blue);
    }
}



function main() {
    const proyector = new Proyector();
    const soundSystem = new SoundSystem();
    const videoPlayer = new VideoPlayer();
    const popcornMaker = new PopcornMaker();

    const homeTheater = new HomeTheaterFacade({
        proyector,
        soundSystem,
        videoPlayer,
        popcornMaker
    });

    homeTheater.watchMovie('Godzilla');
    homeTheater.endMovie();
}

main();