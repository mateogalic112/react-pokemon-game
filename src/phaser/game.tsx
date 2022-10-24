import Phaser from 'phaser'
import { useEffect } from 'react'
import TownScene from './scenes/TownScene'

const TownScreen = () => {
  useEffect(() => {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
        },
      },
      scene: [TownScene],
    }

    new Phaser.Game(config)
  }, [])
  return (
    <div>
      <div id="game" tabIndex={0} />
      <h1>Hello world</h1>
    </div>
  )
}

export default TownScreen
