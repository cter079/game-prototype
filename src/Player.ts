import * as PIXI from "pixi.js"
import { Game } from "./game"
import Matter from 'matter-js'


export class Player extends PIXI.Sprite {
    public rigidBody: Matter.Body
    xspeed = 0
    yspeed = 0
    game: Game
    background: PIXI.Sprite

    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game
        this.x = 0
        this.y = 300
        window.addEventListener("keydown", (e: KeyboardEvent) => this.onKeyDown(e))
        window.addEventListener("keyup", (e: KeyboardEvent) => this.onKeyUp(e))

        const playerOptions: Matter.IBodyDefinition = {
            inertia: Infinity,
            inverseInertia: Infinity,
            label: "Player"
        }
        this.rigidBody = Matter.Bodies.rectangle(600, 230, 55, 100, playerOptions)
        Matter.Composite.add(game.engine.world, this.rigidBody)
    }
    update() {
        this.x += this.xspeed
        this.y += this.yspeed
    }
    onKeyDown(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "ARROWLEFT":
                this.xspeed = -7
                break
            case "D":
            case "ARROWRIGHT":
                this.xspeed = 7
                break
            case "W":
            case "ARROWUP":
                this.yspeed = -7
                break
            case "S":
            case "ARROWDOWN":
                this.yspeed = 7
                break
        }
    }

    private onKeyUp(e: KeyboardEvent): void {
        switch (e.key.toUpperCase()) {
            case " ":
                break;
            case "A":
            case "D":
            case "ARROWLEFT":
            case "ARROWRIGHT":
                this.xspeed = 0
                break
            case "W":
            case "S":
            case "ARROWUP":
            case "ARROWDOWN":
                this.yspeed = 0
                break
        }
}
}
