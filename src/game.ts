import * as PIXI from 'pixi.js'
import moonImage from "./images/moon.png"
import bubbleImage from "./images/bubble.png"
import waterImage from "./images/water.jpg"
import { Player } from './Player'
import { Enemy } from './enemy'
import Matter from 'matter-js'
import { Background } from './background'
import backGroundImage from './images/background.png'



export class Game {
    pixi: PIXI.Application
    bg: PIXI.TilingSprite
    engine: Matter.Engine
    player: Player;
    enemy: Enemy
    elements: (Player | Enemy)[] = []
   
    
    constructor()
    {
        const container = document.getElementById("container")!
        this.pixi = new PIXI.Application({ width: 900, height: 500 })
        container.appendChild(this.pixi.view)

        this.engine = Matter.Engine.create()
        Matter.Events.on(this.engine, 'collisionStart', (event) => this.onCollision(event))

        this.pixi.loader
        .add("background", backGroundImage)
        .add("player", moonImage)


    this.pixi.loader.load(() => this.doneLoading())

    }

    doneLoading() {
        this.bg = new Background(this.pixi.loader.resources["background"].texture!, 5000, 900)
        this.pixi.stage.addChild(this.bg)
        let player = new Player(this.pixi.loader.resources["player"].texture!, this)
        this.pixi.stage.addChild(player)
        this.elements.push(player)
        let enemy = new Enemy(this.pixi.loader.resources["player"].texture!, this)
        this.pixi.stage.addChild(enemy)
        this.elements.push(enemy)
        
        this.pixi.ticker.add(() => this.update())

    }

    update(){
        Matter.Engine.update(this.engine, 1000 / 60)

        for (let el of this.elements) {
            el.update()
        }
    }

onCollision(event: Matter.IEventCollision<Matter.Engine>){
    let collision = event.pairs[0]
    let [bodyA, bodyB] = [collision.bodyA, collision.bodyB]
    if (bodyA.label === "Enemy" && bodyB.label === "Player") {
        let element = this.findSpriteWithRigidbody(bodyA)
        if (element) this.removeElement(element)
    }
    if (bodyA.label === "Player" && bodyB.label === "Enemy") {
        let element = this.findSpriteWithRigidbody(bodyB)
        if (element) this.removeElement(element)
    }
}
findSpriteWithRigidbody(rb: Matter.Body) {
    return this.elements.find((element) => element.rigidBody === rb)
}

removeElement(element: Enemy | Player){
    Matter.Composite.remove(this.engine.world, element.rigidBody)                          
    this.pixi.stage.removeChild(element)                                                    
    this.elements = this.elements.filter((el:  Enemy | Player) => el != element)  
}


}
new Game()