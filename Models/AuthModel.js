const sql = require("./ConnectMySQL");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const CLIENT_ID = "535966501060-u53clbgqvolg9iso836ldg10on8egmeo.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);

const ComparePassword = (authRequest, account) => {
  return new Promise((resolve, reject) => {
    const comparePassword = bcrypt.compareSync(authRequest.userPassword, account.userPassword);
    if (!comparePassword) {
      reject(new Error("Wrong password"));
    } else {
      resolve(account);
    }
  });
};

const GetProfileById = (account) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT tb_profile.*, tb_image.imageSource FROM tb_profile, tb_image WHERE tb_profile.imageID = tb_image.imageID AND tb_profile.userID = ?`,
      [account.userID],
      (err, profile) => {
        if (err) {
          reject(err);
        }
        if (profile.length > 0) {
          profile[0].imageSource = process.env.BASE_URL + profile[0].imageSource;
        } resolve(profile[0]);
        reject(new Error('Profile does not exist.'));
      }
    );
  });
}

module.exports.GetProfileById = GetProfileById;

const CreateToken = (profile) => {
  return jwt.sign({ _id: profile.userID, _typeProfile: profile.typeprofileID }, process.env.TOKEN_SECRET);
};

const ExistUserSignin = (signUpRequest) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT EXISTS(SELECT * FROM tb_signin WHERE tb_signin.userSignin = ?) AS "ExistUserSignin"`,
      [signUpRequest.userSignin],
      (err, exist) => {
        if (err) {
          reject(err);
        }
        if (exist[0].ExistUserSignin) {
          reject(new Error("Account already exists"));
        }
        if (!exist[0].ExistUserSignin) {
          resolve(false);
        }
      }
    );
  });
};

const ExistUserEmail = (signUpRequest) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT EXISTS(SELECT * FROM tb_profile WHERE tb_profile.userEmail = ?) AS "ExistUserEmail"`,
      [signUpRequest.userEmail],
      (err, exist) => {
        if (err) {
          reject(err);
        }
        if (exist[0].ExistUserEmail) {
          reject(new Error("Account already exists"));
        }
        if (!exist[0].ExistUserEmail) {
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

const ExistsProfileGoogle = (ticket) => {
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

const GetAccountByUserSignin = (userSignin) => {
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

module.exports.GetUUID = GetUUID;

const CreateAccount = (uuid, signUpRequest) => {
  return new Promise(async (resolve, reject) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(signUpRequest.userPassword, salt);
    sql.query(
      `INSERT INTO tb_signin (tb_signin.userID, tb_signin.userSignin, tb_signin.userPassword) VALUES (?, ?, ?)`,
      [uuid, signUpRequest.userSignin, hashPassword],
      (err, insertedAccount) => {
        if (err) {
          reject(err);
        } else {
          resolve(uuid);
        }
      }
    );
  });
};

const ExistEmail = (signUpRequest) => {
  return new Promise((resolve, reject) => {
    sql.query(
      `SELECT EXISTS(SELECT * FROM tb_profile WHERE tb_profile.userEmail = ? ) AS "ExistEmail"`,
      [signUpRequest.userEmail],
      (err, exist) => {
        if (err) {
          reject(err);
        }
        if (exist[0].ExistEmail) {
          resolve(true);
        }
        if (!exist[0].ExistEmail) {
          resolve(false);
        }
      }
    );
  });
};

module.exports.CheckExistProfileByEmail = (reqBody, result) => {
  ExistEmail(reqBody)
    .then((isExistEmail) => {
      result(null, { checkExistProfileByEmail: isExistEmail });
    })
    .catch((err) => {
      result(null, { checkExistProfileByEmail: true, err: err.message });
    })
}

const CreateProfile = (newUUID = null, signUpRequest = null) => {
  if (signUpRequest.typeprofileID == 2) newUUID = signUpRequest.userIDGoogle;
  return new Promise(async (resolve, reject) => {
    sql.query(
      `INSERT INTO tb_profile 
      (tb_profile.userID, tb_profile.userFirstname, tb_profile.userLastname,tb_profile.userGender, tb_profile.userBOD, tb_profile.userEmail, tb_profile.userPhone, tb_profile.userAddress, tb_profile.imageID, tb_profile.typeprofileID)
      VALUES (?,?,?,?,?,?,?,?,?,?)`,
      [
        newUUID,
        signUpRequest.userFirstname,
        signUpRequest.userLastname,
        signUpRequest.userGender,
        signUpRequest.userBOD,
        signUpRequest.userEmail,
        signUpRequest.userPhone,
        signUpRequest.userAddress,
        signUpRequest.userAvatar,
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
  if (signUpRequest.typeprofileID == 1) {
    try {
      await ExistUserSignin(signUpRequest);
      await ExistUserEmail(signUpRequest);
      const uuid = await GetUUID();
      const idProfile = await CreateProfile(uuid, signUpRequest);
      await CreateAccount(uuid, signUpRequest);
      const profile = await GetProfileById({ userID: idProfile });
      result(null, { token: CreateToken(profile), profile: profile });
    } catch (error) {
      result(error, null);
    }
  }
  if (signUpRequest.typeprofileID == 2) {
    const ticket = await client.verifyIdToken({
      idToken: signUpRequest.userTicketGoogle,
      audience: CLIENT_ID,
      maxExpiry: 60 * 60 * 24 * 365
    });
    try {
      const existProfile = await ExistsProfileGoogle(ticket);
      if (existProfile) {
        throw new Error("Profile already exists");
      }
      const idProfile = await CreateProfile(null, signUpRequest);
      const profile = await GetProfileById({ userID: idProfile });
      result(null, { idToken: CreateToken(profile), isSignedIn: true });
    } catch (error) {
      result(error, null);
    }

  }

};

module.exports.SignIn = async (authRequest, result) => {
  ExistsAccountForSignIn(authRequest)
    .then(() => {
      return GetAccountByUserSignin(authRequest.userSignin);
    })
    .then((account) => {
      return ComparePassword(authRequest, account[0]);
    })
    .then((account) => {
      return GetProfileById(account);
    })
    .then((profile) => {
      result(null, { token: CreateToken(profile), profile: profile });
    })
    .catch((err) => {
      result(err, null);
    });
};

module.exports.SignInWithGoogle = async (user, result) => {
  const ticket = await client.verifyIdToken({
    idToken: user.idToken,
    audience: CLIENT_ID,
    maxExpiry: 60 * 60 * 24 * 365
  });

  try {
    const existProfile = await ExistsProfileGoogle(ticket);

    if (existProfile) {
      const profile = await GetProfileById({ userID: user.user.id });
      const token = await CreateToken(profile);
      result(null, { token: token, profile: profile });
    } else {
      throw new Error('No profile');
    }

  } catch (error) {
    result(error, null);
  }
}

module.exports.VerifyToken = async (tokenRequest, result) => {
  try {
    const verified = await jwt.verify(tokenRequest, process.env.TOKEN_SECRET);
    if (verified) {
      const profile = await GetProfileById({ userID: verified._id });
      result(null, {
        token: tokenRequest, profile: profile
      });
    }

  } catch (error) {
    result(error, null);
  }
};
