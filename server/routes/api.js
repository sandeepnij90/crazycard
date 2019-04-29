const mongoose = require('mongoose');
const Cards = mongoose.model('cards');
// card keys: anywhere: 0, student : 1, liquid: 2

module.exports = app => {
    app.post('/api/findcards', async (req,res) => {
        const { income, employmentStatus } = req.body;
        const anywhereCard = await Cards.findOne({ cardKey: 0 });
        const cards = [anywhereCard];
        if (employmentStatus === 'Student') {
            const card = await Cards.findOne({ cardKey: 1});
            cards.push(card);
        }
        if (income > 16000) {
            const card = await Cards.findOne({ cardKey: 2})
            cards.push(card)
        }

        res.send(cards);
    });

    // if you want to add new cards wire up with redux and point here
    app.post('/api/addcard', async (req,res) => {
        const { cardKey, cardTitle, apr, balanceTransferOfferDuration, purchaseOfferDuration, creditAvailable} = req.body;
        await new Cards({
            cardKey,
            cardTitle,
            apr,
            balanceTransferOfferDuration,
            purchaseOfferDuration,
            creditAvailable
        }).save()

        res.redirect('/');
    });
}