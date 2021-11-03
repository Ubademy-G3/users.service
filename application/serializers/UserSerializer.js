const serializeUser = (user) => ({
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName
  });
  
  module.exports = (data) => {
    if (!data) {
      throw new Error("Expect data to be not undefined nor null");
    }
  
    if (Array.isArray(data)) {
      return data.map(serializeUser);
    }
  
    return serializeUser(data);
  };