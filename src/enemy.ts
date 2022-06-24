import * as PIXI from "pixi.js"
import { Game } from "./game"
import Matter from "matter-js"

export class Enemy extends PIXI.Sprite {
    speed: number = 0
    game: Game
    background: PIXI.Sprite
    public rigidBody: Matter.Body


    constructor(texture: PIXI.Texture, game: Game) {
        super(texture)
        this.game = game
this.scale.x= -1
this.x = 400
this.y = 300
const playerOptions: Matter.IBodyDefinition = {
    friction: 1,
    inertia: Infinity,
    inverseInertia: Infinity,
    label: "Enemy"
}
this.rigidBody = Matter.Bodies.rectangle(600, 230, 55, 100, playerOptions)
Matter.Composite.add(game.engine.world, this.rigidBody)
    }


    update() {
        this.x -= 5
    }
  
}
