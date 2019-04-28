const mongoose = require('mongoose');
const { Schema } = mongoose;
const CardSchema = new Schema({
    cardKey: Number,
    cardTitle: String,
    apr: Number,
	balanceTransferOfferDuration: Number,
    PurchaseOfferDuration: Number,
    creditAvailable: Number
});

mongoose.model('cards', CardSchema);