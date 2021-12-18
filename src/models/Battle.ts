import Pokemon from './Pokemon'

class Battle {
  myPokemon: Pokemon
  myPokemonHp: number
  enemyPokemon: Pokemon
  enemyPokemonHp: number
  turn = 0

  constructor(pokemonOne: Pokemon, pokemonTwo: Pokemon) {
    this.myPokemon = pokemonOne
    this.myPokemonHp = pokemonOne.getHp()
    this.enemyPokemon = pokemonTwo
    this.enemyPokemonHp = pokemonTwo.getHp()
  }

  pokeAttack(index: number): { myHp: number; enemyHp: number } {
    if (this.turn % 2 === 0) {
      const damage = this.myPokemon.attack(index)
      this.enemyPokemonHp = this.enemyPokemonHp - damage
    } else {
      const damage = this.enemyPokemon.attack(index)
      this.myPokemonHp = this.myPokemonHp - damage
    }

    this.turn++

    return {
      myHp: this.myPokemonHp,
      enemyHp: this.enemyPokemonHp,
    }
  }

  getMyPokemonHp() {
    return this.myPokemonHp
  }

  getEnemyPokemonHp() {
    return this.enemyPokemonHp
  }
}

export default Battle
