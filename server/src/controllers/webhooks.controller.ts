import Stripe from "stripe";
import type { Request, Response } from "express";
import Transaction from "../models/Transaction.model.js";
import User from "../models/User.model.js";

export const stripeWebhooks = async (req: Request, res: Response) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
  const sig = req.headers['stripe-signature'] as string;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET as string);
  } catch (error) {
    return res.status(400).send(`Webhook Error: ${error instanceof Error ? error?.message : ''}`);
  }

  try {
    switch (event.type) {
      case "payment_intent.succeeded": {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const sessionList = await stripe.checkout.sessions.list({
          payment_intent: paymentIntent.id,
        });

        if (sessionList.data[0]) {
          const session = sessionList.data[0];
          const { transactionId, appId } = session.metadata as Stripe.Metadata;

          if (appId === "quickgpt") {
            const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false });
            await User.updateOne({ _id: transaction?.userId }, {
              $inc: { credits: transaction?.credits || 0 }
            })
            if (transaction) {
              transaction.isPaid = true;
              await transaction?.save();
            }
          } else {
            return res.status(400).send(`Unknown appId: ${appId}`);
          }
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    
      return res.status(200).json({ received: true });
    }
  } catch (error) {
    return res.status(500).send(`Server Error: ${error instanceof Error ? error.message : ''}`);
  }
}