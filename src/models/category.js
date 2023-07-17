import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: 'Category', default: null },

});

export default mongoose.models.Category ||
    mongoose.model('Category', categorySchema);