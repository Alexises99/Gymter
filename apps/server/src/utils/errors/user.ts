export class UserExceedsFavoritesLimit extends Error {
  constructor() {
    super()
    this.name = 'UserExceedsFavoriteLimit'
    Object.setPrototypeOf(this, UserExceedsFavoritesLimit.prototype)
  }
}
