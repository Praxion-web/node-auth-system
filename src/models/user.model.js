import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: "https://placehold.co/200x200",
        localPath: "",
      },
    },

    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    fullName: {
      type: String,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
    },

    isEmailVerified: {
      type: Boolean,
      default: false,
    },

    refreshToken: {
      type: String,
    },

    forgotPasswordToken: {
      type: String,
    },

    forgotPasswordExpiry: {
      type: Date,
    },

    emailVerificationToken: {
      type: String,
    },

    emailVerificationExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return JWT.sign(
    {
      _id: this_id,
      email: this.email,
      username: this.username,
    },
    process.env.ACESS_TOKEN_SECRET,
    { expiresIn: process.env.ACESS_TOKEN_EXPIRY },
  );

  userSchema.methods.generateRefreshToken = function () {
    return JWT.sign(
      {
        _id: this._id,
        email: this.email,
        username: this.username,
      },
      process.env.REFRESH_TOKEN_SCREET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY },
    );
  };
};

userSchema.methods.generateTemporaryToken = function () {
  const unhashedToken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex");

  const tokenExpiry = Date.now() + 20 * 60 * 1000; //20minutes
  return { unhashedToken, hashedToken, tokenExpiry };
};

export const User = mongoose.model("User", userSchema);
