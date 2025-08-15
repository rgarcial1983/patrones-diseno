/**
 * ! Patrón decorador
 * Es un patrón de diseño estructural que permite añadir
 * funcionalidades a objetos, colocando estos objetos dentro de
 * objetos encapsuladores especiales que contienen estas funcionalidades.
 *
 * No confundirlo con los decoradores de TypeScript que son anotaciones.
 *
 * * Es útil cuando necesitas añadir funcionalidades a objetos
 *  * de manera dinámica y flexible.
 *
 * https://refactoring.guru/es/design-patterns/decorator
 */

import { COLORS } from "../helpers/colors.ts";

interface Notification {
    send(message: string): void;
}

class BasicNotification implements Notification {
    send(message: string): void {
        console.log(`%cEnviando notificación Básica: %c${message}`, COLORS.pink, COLORS.white);
    }
}

// CLASE DECORADORA
abstract class NofiticacionDecorator implements Notification {

    protected notificacion: Notification;

    constructor(notification: Notification) {
        this.notificacion = notification;
    }

    send(message: string): void {
        this.notificacion.send(message);
    }
}

// CREAR DIFERENTES DECORADORES
class EmailDecorator extends NofiticacionDecorator {
    
    private sendEmail(message: string) {
        console.log(`%cEnviando notificación por correo electrónico: %c${ message }`,COLORS.blue, COLORS.white);
    }
    
    override send(message: string): void {
      super.send(message);
      this.sendEmail(message);
    }
}

class SMSDecorator extends NofiticacionDecorator {
    
    private sendSMS(message: string) {
        console.log(`%cEnviando notificación por SMS electrónico: %c${ message }`,COLORS.green, COLORS.white);
    }
    
    override send(message: string): void {
      super.send(message);
      this.sendSMS(message);
    }
}

function main() {
    let notification: Notification = new BasicNotification();
    notification = new EmailDecorator(notification);
    notification = new SMSDecorator(notification);

    notification.send('Alerta de sistemas')
}

main();