const serializeUser = (user) => ({
  id: user.id,
  email: user.email,
  firstName: user.firstName,
  lastName: user.lastName,
  rol: user.rol,
  location: user.location,
  interests: user.interests,
  profilePictureUrl: user.profilePictureUrl,
  subscription: user.subscription,
  subscriptionExpirationDate: user.subscriptionExpirationDate,
  favoriteCourses: user.favoriteCourses,
  description: user.description,
  registerType: user.registerType,
  loginType: user.loginType,
  passwordChanged: user.passwordChanged,
  walletId: user.walletId,
});

module.exports = (data) => {
  if (!data) {
    /* istanbul ignore next */
    throw new Error("Expect data to be not undefined nor null");
  }

  if (Array.isArray(data)) {
    return data.map(serializeUser);
  }
  return serializeUser(data);
};
