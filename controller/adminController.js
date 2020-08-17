const db  = require("../services/database");
const bcrypt  = require("bcryptjs");

let handleLogin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        let user = await findUserByUsername(username);
        if (user) {
            //compare password
            await bcrypt.compare(password, user.password).then((isMatch) => {
                if (isMatch) {
                    resolve(true);
                } else {
                    console.log("Password salah");
                    reject(`The password that you've entered is incorrect`);
                }
            });
        } else {
            reject(`This user email "${username}" doesn't exist`);
        }
    });
};


module.exports = {
};
