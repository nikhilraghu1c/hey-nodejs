const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index optimization for faster query
connectionRequestSchema.index({ fromUserId: 1, toUserId: 1 });

// Pre save hook to validate the connection request before saving it
connectionRequestSchema.pre("save", async function (next){
    const connectionRequest = this;
    // Check if fromUserId and toUserId are same
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("You cannot send request to yourself");
    }
    next();
});

module.exports = mongoose.model("ConnectionRequest", connectionRequestSchema);
