import Stripe from "stripe";
import Transaction from "../models/Transaction.model.js";
import User from "../models/User.model.js";
export const stripeWebhooks = async (req, res) => {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const sig = req.headers['stripe-signature'];
    let event;
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    }
    catch (error) {
        return res.status(400).send(`Webhook Error: ${error instanceof Error ? error?.message : ''}`);
    }
    try {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                console.log("Payment Intent ID:", paymentIntent.id);
                console.log("Payment Intent Metadata:", JSON.stringify(paymentIntent.metadata, null, 2));
                // First try to get metadata directly from payment intent
                let transactionId = paymentIntent.metadata?.transactionId;
                let appId = paymentIntent.metadata?.appId;
                console.log("From Payment Intent - appId:", appId, "transactionId:", transactionId);
                // If payment intent metadata is empty, fallback to session metadata
                if (!transactionId || !appId) {
                    console.log("Payment intent metadata empty, checking sessions...");
                    const sessionList = await stripe.checkout.sessions.list({
                        payment_intent: paymentIntent.id,
                    });
                    console.log("Found sessions:", sessionList.data.length);
                    if (sessionList.data[0]) {
                        const session = sessionList.data[0];
                        console.log("Session ID:", session.id);
                        console.log("Session Metadata:", JSON.stringify(session.metadata, null, 2));
                        transactionId = session.metadata?.transactionId;
                        appId = session.metadata?.appId;
                        console.log("From Session - appId:", appId, "transactionId:", transactionId);
                    }
                    else {
                        console.log("No sessions found for payment intent");
                    }
                }
                // If we have a transactionId, we can proceed even if appId is missing
                if (transactionId) {
                    console.log("Processing transaction with transactionId:", transactionId);
                    const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false });
                    if (transaction) {
                        console.log("Transaction found, processing...");
                        await User.updateOne({ _id: transaction?.userId }, {
                            $inc: { credits: transaction?.credits || 0 }
                        });
                        transaction.isPaid = true;
                        await transaction?.save();
                        console.log("Transaction processed successfully");
                    }
                    else {
                        console.log("Transaction not found or already paid");
                        // Check if transaction exists but is already paid
                        const existingTransaction = await Transaction.findOne({ _id: transactionId });
                        if (existingTransaction) {
                            console.log("Transaction already processed (isPaid: true)");
                        }
                        else {
                            console.log("Transaction not found in database");
                            return res.status(400).send(`Transaction not found: ${transactionId}`);
                        }
                    }
                }
                else {
                    console.log(`Missing transactionId in metadata - appId: ${appId}, transactionId: ${transactionId}`);
                    return res.status(400).send(`Missing transactionId in metadata - appId: ${appId}, transactionId: ${transactionId}`);
                }
                break;
            }
            default:
                console.log(`Unhandled event type ${event.type}`);
                break;
        }
        return res.status(200).json({ received: true });
    }
    catch (error) {
        return res.status(500).send(`Server Error: ${error instanceof Error ? error.message : ''}`);
    }
};
//# sourceMappingURL=webhooks.controller.js.map