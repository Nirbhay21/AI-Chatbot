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
        
        // First try to get metadata directly from payment intent
        let transactionId = paymentIntent.metadata?.transactionId;
        let appId = paymentIntent.metadata?.appId;
        
        // If payment intent metadata is empty, fallback to session metadata
        if (!transactionId || !appId) {
          const sessionList = await stripe.checkout.sessions.list({
            payment_intent: paymentIntent.id,
          });

          if (sessionList.data[0]) {
            const session = sessionList.data[0];
            transactionId = session.metadata?.transactionId;
            appId = session.metadata?.appId;
          }
        }

        if (appId === "quickgpt" && transactionId) {
          const transaction = await Transaction.findOne({ _id: transactionId, isPaid: false });
          if (transaction) {
            await User.updateOne({ _id: transaction?.userId }, {
              $inc: { credits: transaction?.credits || 0 }
            });
            transaction.isPaid = true;
            await transaction?.save();
          }
        } else {
          console.log(`Missing or invalid metadata - appId: ${appId}, transactionId: ${transactionId}`);
          return res.status(400).send(`Missing or invalid metadata - appId: ${appId}, transactionId: ${transactionId}`);
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