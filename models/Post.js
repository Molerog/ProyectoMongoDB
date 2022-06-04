const mongoose = require('mongoose');
const ObjectId = mongoose.SchemaTypes.ObjectId;

const PostSchema = new mongoose.Schema({
    status : String,
    title: {
       type: String,
       required: [true, 'You need to provided a title to your post']
    },
    body: {
       type: String,
       required: [true, "The post's body it's empty"]
    },
    userId:{
        type: ObjectId,
        ref: 'User'
    },
    imagepath: String,
    likes:[{type: ObjectId}],
    postdate: Date,
    comments:[{type: ObjectId, ref:'Comment'}]
}, { timestamps: true });

const Post = mongoose.model('Post', PostSchema);

module.exports = Post;
