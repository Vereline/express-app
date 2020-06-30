db.createUser({
  user: 'root-user',
  pwd: 'root-password',
  roles: [
    {
      role: 'readWrite',
      db: 'express-app-db',
    },
  ],
});
