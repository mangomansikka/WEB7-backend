const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: false,
        default: "anonymous"
    },
    lastName: {
        type: String,
        required: false,
        default: "anonymous"
    },
    phoneNumber: {
        type: String,
        required: false,
        default: "0000000000"
    },
    role: {
        type: String,
        required: false,
        default: "user"
    },
});


// static signup method
userSchema.statics.signup = async function ( email, password, firstName, lastName, phoneNumber, role) {
  
    // validation    
    if (!email) {
      throw Error("All fields must be filled");
    };

    if (!validator.isEmail(email)) {
      throw Error("Email not valid");
    };

    if (!validator.isStrongPassword(password)) {
      throw Error("Password not strong enough");
    };
 
    // check if email already exists
    const emailExists = await this.findOne({ email });

    if (emailExists) {
      throw Error("Email already in use");
    };
  
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({ email, password: hash, firstName, lastName, phoneNumber, role});
    
    console.log("User created!", user);
  
    return user;
};
  
// static login method
userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
      throw Error("All fields must be filled");
    }
  
    const user = await this.findOne({ email });
    if (!user) {
      throw Error("Incorrect email");
    }
  
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      throw Error("Incorrect password");
    }
  
    return user;
};


module.exports = mongoose.model("User", userSchema);