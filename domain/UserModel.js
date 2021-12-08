module.exports = class User {
  constructor(UUID, email, firstName, lastName, rol,
    location, interests, profilePictureUrl, subscription,
    subscriptionExpirationDate, favoriteCourses, description,
    registerType, loginType, passwordChanged, walletId) {
    this.id = UUID;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.rol = rol;
    this.location = location;
    this.interests = interests;
    this.profilePictureUrl = profilePictureUrl;
    this.subscription = subscription;
    this.subscriptionExpirationDate = subscriptionExpirationDate;
    this.favoriteCourses = favoriteCourses;
    this.description = description;
    this.registerType = registerType;
    this.loginType = loginType;
    this.passwordChanged = passwordChanged;
    this.walletId = walletId;
    console.log(walletId);
  }
};
