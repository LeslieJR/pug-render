const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
   username:{
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin:{
        type: Boolean,
        default: false
    } 
}
    
)

userSchema.statics.encrypt = async function(password){
    const hash = await bcrypt.hash(password, 10);
    return hash;
}

userSchema.statics.compare = async function(plainPassword, hash){
    const isValid = await bcrypt.compare(plainPassword, hash);
    return isValid;
}
const UserModel = model("user", userSchema);
module.exports = UserModel;
