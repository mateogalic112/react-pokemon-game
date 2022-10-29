import Phaser from 'phaser'

export default class TownScene extends Phaser.Scene {
  private platforms: Phaser.Physics.Arcade.StaticGroup
  private player: Phaser.Physics.Arcade.Sprite
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys
  private stars: Phaser.Physics.Arcade.Group

  private score = 0
  private scoreText: Phaser.GameObjects.Text

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
    this.createGround()
    this.createPlayer()
    this.createStars()
    this.cursors = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(this.player, this.platforms)
    this.physics.add.collider(this.stars, this.platforms)

    this.physics.add.overlap(
      this.player,
      this.stars,
      this.collectStar,
      null,
      this
    )

    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      fontSize: '32px',
      color: 'black',
    })
  }

  update() {
    this.createCursorCommands()
  }

  private collectStar(
    _: Phaser.GameObjects.GameObject,
    s: Phaser.GameObjects.GameObject
  ) {
    const star = s as Phaser.Physics.Arcade.Image
    star.disableBody(true, true)

    this.score += 10
    this.scoreText.setText('Score: ' + this.score)
  }

  private createGround() {
    this.add.image(400, 300, 'sky')

    this.platforms = this.physics.add.staticGroup()

    this.platforms.create(400, 568, 'ground').setScale(2).refreshBody()

    this.platforms.create(600, 400, 'ground')
    this.platforms.create(50, 250, 'ground')
    this.platforms.create(750, 220, 'ground')
  }

  private createPlayer() {
    this.player = this.physics.add.sprite(100, 450, 'dude')

    this.player.setBounce(0.2)
    this.player.setCollideWorldBounds(true)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    })

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    })

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    })
  }

  private createCursorCommands() {
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-160)

      this.player.anims.play('left', true)
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(160)

      this.player.anims.play('right', true)
    } else {
      this.player.setVelocityX(0)

      this.player.anims.play('turn')
    }

    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330)
    }
  }

  private createStars() {
    this.stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 },
    })

    this.stars.children.iterate(function (child: Phaser.Physics.Arcade.Image) {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8))
    })
  }
}
