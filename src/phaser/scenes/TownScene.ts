import Phaser from 'phaser'

export default class TownScene extends Phaser.Scene {
  private platform?: Phaser.Physics.Arcade.StaticGroup

  constructor() {
    super('town-scene')
  }

  preload() {
    this.load.image('sky', 'phaser/sky.png')
    this.load.image('ground', 'phaser/platform.png')
    this.load.image('star', 'phaser/star.png')
    this.load.image('bomb', 'phaser/bomb.png')
    this.load.spritesheet('dude', 'phaser/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
  }
  create() {
    this.add.image(400, 300, 'sky')
    this.add.image(400, 300, 'star')
  }
  update() {}
}
