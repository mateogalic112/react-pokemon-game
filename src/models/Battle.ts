import Pokemon, { Move } from './Pokemon'

class Battle {
  private readonly attacker: Pokemon
  private readonly defender: Pokemon
  // battle messages
  messages: string[] = []

  constructor(attaker: Pokemon, defender: Pokemon) {
    this.attacker = attaker
    this.defender = defender
  }

  private checkForGameEnd = (damage: number, health: number): boolean => {
    return damage >= health
  }

  private handleAttack = (attacker: Pokemon, defender: Pokemon) => (
    move: Move,
    health: number,
  ): { damage: number; messages: string[] } => {
    this.messages.push(
      `${attacker.getName()} attacks with ${move.name.toUpperCase()} and ${
        move.damage
      } damage`,
    )

    if (defender.dodge()) {
      this.messages.push(`${defender.getName()} dodged the attack!`)

      return {
        damage: 0,
        messages: this.messages,
      }
    }

    if (this.checkForGameEnd(move.damage, health)) {
      this.messages.push(`Game over, ${attacker.getName()} wins!`)

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

  // Strategy for attacking based on turn
  attackOpponent = (opponentTurn: boolean) => {
    if (!opponentTurn) {
      return this.handleAttack(this.attacker, this.defender)
    }
    return this.handleAttack(this.defender, this.attacker)
  }
}

export default Battle
