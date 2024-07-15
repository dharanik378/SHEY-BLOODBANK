const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    userType: {
      type: String,
      required: true,
      enum: ["donar", "organization", "hospital", "admin"],
    },

    //is required if user is admin or donar

    name: {
      type: String,
      required: function () {
        if (this.userType == "admin" || this.userType == "donar") {
          return true;
        }
        return false;
      },
    },

    //is required if hospitalName

    hospitalName: {
      type: String,
      required: function () {
        if (this.userType == "hospital") {
          return true;
        }
        return false;
      },
    },

    //is required if organizationName

    organizationName: {
      type: String,
      required: function () {
        if (this.userType == "organization") {
          return true;
        }
        return false;
      },
    },

    //is required if hospitalName or organizationName

    website: {
      type: String,
      required: function () {
        if (
          this.userType == "organization" ||
          this.userType == "hospital"
        ) {
          return true;
        }
        return false;
      },
    },
    address: {
      type: String,
      required: function () {
        if (
          this.userType == "organization" ||
          this.userType == "hospital"
        ) {
          return true;
        }
        return false;
      },
    },

    // common for all

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", userSchema);
