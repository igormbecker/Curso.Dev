export const up = (pgm) => {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    //For reference, Github limits usernames to 39 characters.
    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },

    //Why 254 in lenght? https://stackoverflow.com/a/1199238/33149555
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },

    //Why 72 in length? https://security.stackexchange.com/a/39851
    password: {
      type: "varchar(72)",
      notNull: true,
    },

    //Why timestamp with timezone? https://justatheory.com/2012/04/postgres-use-timestamptz/
    created_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },

    updated_at: {
      type: "timestamptz",
      default: pgm.func("now()"),
    },
    /*
    name: {
      type: "varchar(255)",
      notNull: true,
    },


    */
  });
};

exports.down = false;
