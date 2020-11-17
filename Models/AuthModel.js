const sql = require("./ConnectMySQL");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const ComparePassword = (account, passwordHash) => {
  return new Promise((resolve, reject) => {
    const comparePassword = bcrypt.compareSync(account.userPassword, passwordHash);
    if (!comparePassword) {
      reject(new Error("Wrong password"));
    } else {
      resolve(account);
    }
  });
};

const CreateToken = (account) => {
  return jwt.sign({ _id: account.userSignin}, process.env.TOKEN_SECRET);
};

const ExistsAccountForSignUp = (signUpRequest) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT EXISTS(SELECT * FROM tb_signin WHERE tb_signin.userSignin = ?) AS "ExistsAccount"`,
      [signUpRequest.userSignin],
      (err, exist) => {
        if (err) {
          reject(err);
        }
        if (exist[0].ExistsAccount) {
          reject(new Error("Account already exists"));
        }
        if (!exist[0].ExistsAccount) {
          resolve(false);
        }
      }
    );
  });
};

const ExistsAccountForSignIn = (signUpRequest) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT EXISTS(SELECT * FROM tb_signin WHERE tb_signin.userSignin = ?) AS "ExistsAccount"`,
      [signUpRequest.userSignin],
      (err, exist) => {
        if (err) {
          reject(err);
        }
        if (exist[0].ExistsAccount) {
          resolve(true);
        }
        if (!exist[0].ExistsAccount) {
          reject(new Error("Account doesn't exists"));
        }
      }
    );
  });
};

const GetAccount = (userSignin) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT * FROM tb_signin WHERE tb_signin.userSignin = ? LIMIT 1`,
      [userSignin],
      (err, account) => {
        if (err) {
          reject(err);
        } else {
          resolve(account);
        }
      }
    );
  });
};

const GetUUID = () => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT UUID() AS "uuid"`, (err, uuid) => {
      if (err) {
        reject(err);
      } else {
        resolve(uuid[0].uuid);
      }
    });
  });
};

const CreateAccount = (newUUID, signUpRequest) => {
  return new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(signUpRequest.userPassword, salt);
    sql.query(
      `INSERT INTO tb_signin (tb_signin.userID, tb_signin.userSignin, tb_signin.userPassword) VALUES (?, ?, ?)`,
      [newUUID, signUpRequest.userSignin, hashPassword],
      (err, insertedAccount) => {
        if (err) {
          reject(err);
        } else {
          resolve(newUUID);
          return newUUID;
        }
      }
    );
  });
};

const ExistEmail = (signUpRequest) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT EXISTS(SELECT * FROM tb_signin WHERE tb_signin.userEmail = ? ) AS "ExistsAccount"`,
      [signUpRequest.userSignin],
      (err, exist) => {
        if (err) {
          reject(err);
        }
        if (exist[0].ExistsAccount) {
          resolve(true);
        }
        if (!exist[0].ExistsAccount) {
          reject(new Error("Account doesn't exists"));
        }
      }
    );
  });
};

module.exports.CheckExistProfileByEmail = (reqBody, result) => {
  ExistEmail(reqBody)
    .then(() => {
      result(null, { checkExistProfileByEmail: false });
    })
    .catch((err) => {
      console.log(err);
      result(null, { checkExistProfileByEmail: true, err: err.message });
    })
}

const CreateProfile = (newUUID, signUpRequest) => {
  return new Promise(async (resolve, reject) => {
    sql.query(
      `INSERT INTO tb_profile 
      (tb_profile.userID, tb_profile.userFirstname, tb_profile.userLastname,tb_profile.userGender, tb_profile.userBOD, tb_profile.userEmail, tb_profile.userPhone, tb_profile.userAddress, tb_profile.typeprofileID)
      VALUES (?,?,?,?,?,?,?,?, ?)`,
      [
        newUUID,
        signUpRequest.userFirstname,
        signUpRequest.userLastname,
        signUpRequest.userGender,
        signUpRequest.userBOD,
        signUpRequest.userEmail,
        signUpRequest.userPhone,
        signUpRequest.userAddress,
        signUpRequest.typeprofileID,
      ],
      (err, insertedProfile) => {
        if (err) {
          reject(err);
        } else {
          resolve(newUUID);
        }
      }
    );
  });
};

module.exports.SignUp = async (signUpRequest, result) => {
  ExistsAccountForSignUp(signUpRequest)
    .then(() => {
      return GetUUID();
    })
    .then((uuid) => {
      return CreateProfile(uuid, signUpRequest);
    })
    .then((uuid) => {
      CreateAccount(uuid, signUpRequest);
      const token = jwt.sign(
        {
          _id: uuid,
        },
        process.env.TOKEN_SECRET
      );
      result(null, token);
      return;
    })
    .catch((error) => {
      result(error, null);
      return;
    });
};

module.exports.Authentication = async (authRequest, result) => {
  ExistsAccountForSignIn(authRequest)
    .then(() => {
      return GetAccount(authRequest.userSignin);
    })
    .then((account) => {
      return ComparePassword(authRequest, account[0].userPassword);
    })
    .then((account) => {
      result(null, CreateToken(account));
    })
    .catch((err) => {
      result(err, null);
    });
};


const ExistsProdile = (ticket) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT EXISTS(SELECT * FROM tb_profile WHERE tb_profile.userID = ? AND tb_profile.userEmail = ?) AS "ExistsProfile"`,
      [ticket.payload.sub, ticket.payload.email],
      (err, exists) => {
        if (err) {
          reject(err);
        }
        if (exists[0].ExistsProfile) {
          resolve(true);
        }
        if (!exists[0].ExistsProfile) {
          resolve(false);
        }
      }
    );
  });
};

const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "535966501060-u53clbgqvolg9iso836ldg10on8egmeo.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

module.exports.SignInWithGoogle = async (user, result) => {
  const dataResponse = {
    existProfile: false,
    token: null,
  }

  const ticket = await client.verifyIdToken({
    idToken: user.idToken,
    audience: CLIENT_ID,
    maxExpiry: 60 * 60 * 24 * 365
  });

  //create
  console.log(ticket);

  const existProfile = await ExistsProdile(ticket);
  if (!existProfile) {
    result(null, dataResponse);
  }
}