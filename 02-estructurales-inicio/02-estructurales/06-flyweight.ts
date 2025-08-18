import { COLORS } from "../helpers/colors.ts";

/**
 * ! Patrón Flyweight
 * Es un patrón de diseño estructural que nos permite usar objetos compartidos
 * para soportar eficientemente grandes cantidades de objetos.
 *
 * * Es útil cuando necesitamos una gran cantidad de objetos y queremos reducir
 * * la cantidad de memoria que utilizan.
 *
 * https://refactoring.guru/es/design-patterns/flyweight
 */
interface Location {
    display(coordinates: { x: number; y: number }): void;
}

// Flyweight
class LocationIcon implements Location {
    private type: string;// Hospital, escuela, parque
    private iconImage: string; //Imagen del marcador

    constructor(type: string, iconImage: string) {
        this.type = type;
        this.iconImage = iconImage;
    }

    display(coordinates: { x: number; y: number }): void {
        console.log(`Coords: ${this.type} en ${coordinates.x}, ${coordinates.y} con icono %c[${this.iconImage}]`, COLORS.blue);
    }
}

// Fabrica de Flyweight
class LocationFactory {
    private icons: Record<string, LocationIcon> = {};

    getLocationIcon( type: string) : LocationIcon {
        if(!this.icons[type]) {
            console.log(`%cCreando una nueva instancia de ${type}`, COLORS.red)
            const iconImage = `imagen_de_${type.toLocaleLowerCase()}.png`;
            this.icons[type] = new LocationIcon(type, iconImage);
        }

        return this.icons[type]
    }
}

class MapLocation {
    private coordinates: {x: number, y: number };
    private icon: LocationIcon;

    constructor(x: number, y: number, icon: LocationIcon){
        this.coordinates = {x, y};
        this.icon = icon;
    }

    display() {
        this.icon.display(this.coordinates);
    }
}


function main() {
    const factory = new LocationFactory();
    const locations = [
        new MapLocation(10,20,factory.getLocationIcon('Hospital')),
        new MapLocation(20,20,factory.getLocationIcon('Hospital')),
        new MapLocation(30,10,factory.getLocationIcon('Hospital')),

        new MapLocation(35,15,factory.getLocationIcon('Parque')),
        new MapLocation(35,15,factory.getLocationIcon('Parque')),
        new MapLocation(35,15,factory.getLocationIcon('Parque')),
        new MapLocation(35,15,factory.getLocationIcon('Parque')),
        new MapLocation(35,15,factory.getLocationIcon('Parque')),

        new MapLocation(30,10,factory.getLocationIcon('Hospital')),
        new MapLocation(30,10,factory.getLocationIcon('Hospital')),
        new MapLocation(30,10,factory.getLocationIcon('Hospital')),

        new MapLocation(30,10,factory.getLocationIcon('Escuela')),
        new MapLocation(30,10,factory.getLocationIcon('Escuela')),
        new MapLocation(30,10,factory.getLocationIcon('Escuela')),
        new MapLocation(30,10,factory.getLocationIcon('Escuela')),
        new MapLocation(30,10,factory.getLocationIcon('Escuela')),
        new MapLocation(30,10,factory.getLocationIcon('Escuela')),
        new MapLocation(30,10,factory.getLocationIcon('Escuela')),
        new MapLocation(30,10,factory.getLocationIcon('Escuela')),
        new MapLocation(30,10,factory.getLocationIcon('Escuela')),
        
    ];

    locations.forEach(location => location.display());
}

main();