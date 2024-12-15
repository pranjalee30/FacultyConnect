import mongoose, { Schema } from "mongoose";

const profileSchema = new mongoose.Schema({
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    }, 
    staffProfileID: {
        type: Schema.Types.ObjectID,
        ref: 'Staff'
    },
    initiated: {
        type: Boolean,
        default: false
    },
})

const Profile = mongoose.model('Profile', profileSchema);

export default Profile;