

module.exports = {
  async up(db, client) {
    // Set default expiration for existing keys to 1 year from creation
    await db.collection('apikeys').updateMany(
      { expiresAt: { $exists: false } },
      [
        { $set: { expiresAt: { $add: ["$createdAt", 365*24*60*60000] } } }
      ]
    );
  },

  async down(db, client) {
    // Remove the expiresAt field if rolling back
    await db.collection('apikeys').updateMany(
      {},
      { $unset: { expiresAt: "" } }
    );
  }
};