import Pokemon, { Move } from './Pokemon'

class Battle {
  private readonly attacker: Pokemon
  private readonly defender: Pokemon
  messages: string[] = []

  constructor(attaker: Pokemon, defender: Pokemon) {
    this.attacker = attaker
    this.defender = defender
  }

  private checkForGameEnd = (damage: number, health: number): boolean => {
    return damage >= health
  }

  private handleAttack =
    (attacker: Pokemon, defender: Pokemon) =>
    (move: Move, health: number): { damage: number; messages: string[] } => {
      this.messages.push(
        `${attacker.name} attacks with ${move.name.toUpperCase()} and ${
          move.damage
        } damage`
      )

      if (defender.dodge()) {
        this.messages.push(`${defender.name} dodged the attack!`)

        return {
          damage: 0,
          messages: this.messages,
        }
      }

      if (this.checkForGameEnd(move.damage, health)) {
        this.messages.push(`Game over, ${attacker.name} wins!`)

        return {
          damage: move.damage,
          messages: this.messages,
        }
      }

      return {
        damage: move.damage,
        messages: this.messages,
      }
    }

  hasCaughtPokemon = (hp: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (hp <= this.defender.hp && Math.random() * 10 > 5) {
          resolve(true)
        } else {
          resolve(false)
        }
      }, 3000)
    })
  }

  // Strategy for attacking based on turn
  attackOpponent = (opponentTurn: boolean) => {
    if (!opponentTurn) {
      return this.handleAttack(this.attacker, this.defender)
    }
    return this.handleAttack(this.defender, this.attacker)
  }
}

export default Battle
