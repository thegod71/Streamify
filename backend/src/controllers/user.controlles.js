import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUserId = req.user.id;
    const currentUser = req.user;
    const recommendedUsers = User.find({
      $and: [
        { _id: { $ne: currentUserId } }, // exclude current user  $ne means:not equal
        { $id: { $nin: currentUser.friends } }, // exclude friend  $nin means:not in
        { isOnboarded: true }, //
      ],
    });
    res.status(200).json(recommendedUsers);
  } catch (err) {
    console.log(err, "Error in the user Controllers");
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyFriends(req, res) {
  try {
    const user = await User.findById(req.user.id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage",
      );
    //  findById = find user
    //select = what information do I want?
    //populate = ID ko actual user information mein badlo.
    //     select = KYA chahiye?
    // populate = ID ke peeche KAUN hai?

    res.status(200).json(user.friends);
  } catch {
    console.log(err, "Error in the userControlles - GetmyFriend");
    res.status(500).json({ message: "Internal server Error" });
  }
}

export async function sendfriendRequest(req, res) {
  try {
    const myId = req.user.id;
    const { id: recipientId } = req.params;

    if (myId === recipientId) {
      return res
        .status(400)
        .json({ message: "You can not sent Friend request to yourself" });
    }

    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(400).json({ message: "Recipient not find" });
    }

    if (recipient.friends.includes(myId)) {
      return res
        .status(400)
        .json({ message: "You are already Friend with this user" });
    }

    const existingRequest = await FriendRequest.findOne({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
        //"Check whether a friend request already exists between these two people, no matter who sent it."
      ],
    });
    if (existingRequest) {
      return res
        .status(400)
        .json({ message: "You are already Friend Request with this user" });
    }

    const friendRequest = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    return res.status(200).json(friendRequest);
  } catch (err) {
    console.log(err, "Error in the user Controller sendfriends");
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function acceptfriendRequest(req, res) {
  try {
    const { id: requestId } = req.params;
  } catch (error) {
    console.log(err, "Error in the user Controller sendfriends");
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
