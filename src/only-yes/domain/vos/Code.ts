export class Code {
  private readonly value: string
  constructor (
    length = 5
  ) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let code = ''
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length)
      code += characters[randomIndex]
    }
    this.value = code
  }

  getValue (): string {
    return this.value
  }
}
