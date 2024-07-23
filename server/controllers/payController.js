const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY, {
    apiVersion: "2024-04-10"
})

exports.config = async(req, res) => {
    res.send({
        publishableKey: process.env.REACT_APP_STRIPE_PUBLISH_KEY
    })
}

exports.paymentIntent = async(req, res) => {
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            currency: 'jpy',
            amount: 300,
            automatic_payment_methods: {
                enabled: true
            },
        });

        res.send({clientSecret: paymentIntent.client_secret})
    } catch (error) {
        return res.status(400).send({
            error: error
        })
    }
}