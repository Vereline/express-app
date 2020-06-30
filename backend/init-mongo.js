db.createUser({
  user: 'TestUser',
  pwd: 'TestPass',
  roles: [
    {
      role: 'readWrite',
      db: 'express-app-db',
    },
  ],
});
