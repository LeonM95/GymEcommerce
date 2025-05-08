import Stripe from "stripe";

// create a new instance of stripe - the secret key is under env file
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
