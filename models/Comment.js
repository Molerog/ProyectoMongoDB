const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const CommentSchema = new mongoose.Schema({
    userId:{
        type: ObjectId,
        ref: 'User'
    },
    postId:{
        type: ObjectId,
        ref: 'Post'
    },
    body: {
     type: String,
     required: [true, "You can't post an empty comment!"]
    }

    
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);

module.exports = Comment;