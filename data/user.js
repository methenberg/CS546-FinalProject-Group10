const bcrypt = require('bcrypt');
const { user } = require('../config/mongoCollection');
const saltRounds = 16;

const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.user;

let exportedMethods = {
    async getAllUsers() {
        const userCollection = await users();
        const allusers = await userCollection.find({}).toArray();
        if (!allusers) throw 'empty database';
        return allusers;
    },

    async getUserById(id) {
        const userCollection = await users();
        const user = await userCollection.findOne({ _id: id });
        if (!user) throw 'User not found';
        return user;
    },

    async addUser(email, password, firstName, lastName, city, state, country, zip) {
        const userCollection = await users();
        //bcrypt the password
        if(typeof(firstName)!="string") throw "invalid firstname";
        let newpass = await bcrypt.hash(password, saltRounds);

        let newUser = {
            email: email,
            password: newpass,
            firstName: firstName,
            lastName: lastName,
            address:address,
            city: city,
            state: state,
            country: country,
            ZIP: zip,
            LendedGamesID: {},
            OwnedGamesID: {},
            BorrowedGamesID: {}
        };

        const newInsertInformation = await userCollection.insertOne(newUser);
        if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
        return await this.getUserById(newInsertInformation.insertedId);
    }
};

module.exports = exportedMethods;
