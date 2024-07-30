const { Client, Environment } = require('square');
const { randomUUID } = require('crypto');
require('dotenv').config();

// const { paymentsApi } = new Client({
//     accessToken: process.env.REACT_APP_SQUARE_ACCESS_TOKEN,
//     environment: Environment.Sandbox, // or Environment.Production
// });

const client = new Client({
    accessToken: process.env.REACT_APP_SQUARE_ACCESS_TOKEN, // Ensure you have this variable in your .env file
    environment: Environment.Sandbox, // or Environment.Production
  });

const paymentsApi = client.paymentsApi;

exports.paymentIntent = async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { sourceId } = req.body;

            if (!sourceId) {
                return res.status(400).json({ error: 'sourceId and amount are required' });
            }

            const { result } = await paymentsApi.createPayment({
                idempotencyKey: randomUUID(),
                sourceId: sourceId,
                amountMoney: {
                    currency: 'USD',
                    amount: 1,
                },
            });

            console.log(result);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: error.message });
        }
    } else {
        res.status(405).json({ error: 'Method Not Allowed' });
    }
};