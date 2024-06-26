const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventoryItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    purchasedPrice: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    supplier: { 
        type: String 
    },
    imageUrl: {
         type: String ,

    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
        },
}, 
{
    timestamps: true
});


const InventoryItem = mongoose.model('InventoryItem', inventoryItemSchema);

module.exports = InventoryItem;
