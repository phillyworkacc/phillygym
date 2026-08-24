import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/db';
import { usersTable } from '@/db/schemas';
import { eq } from 'drizzle-orm';
import Stripe from 'stripe'

// Use Stripe secret key from env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
   const body = await req.text();
   const signature = (await headers()).get('stripe-signature')!;

   let data;
   let eventType;
   let event: Stripe.Event;
   
   // check that signature exists
   if (!signature) {
      console.log("Missing signature")
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
   }

   // verify Stripe event is legit
   try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret) as Stripe.Event;
   } catch (err: any) {
      console.error(`Webhook signature verification failed. ${err.message}`);
      return NextResponse.json({ error: err.message }, { status: 400 });
   }

   switch (event.type) {
      case "checkout.session.completed": {
         const session = event.data.object as Stripe.Checkout.Session;

         // get price id of the product
         const originalPhillyGymPriceId = "price_1TzM30RKHaUAk3Ex0RSqZShh";
         const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { expand: ["data.price.product"] });
         const priceId = lineItems.data[0].price?.id;

         // validate price id
         if (priceId === originalPhillyGymPriceId) {
            // Get whatever you passed when creating Checkout
            const email = session.customer_details?.email;
   
            // Tell user email is not found
            if (!email) {
               console.error("Customer email not found.");
               break;
            }
   
            // Mark the user as having purchased the guide
            await db.update(usersTable)
               .set({ premiumAccess: true })
               .where(eq(usersTable.email, email));
   
            console.log(`${email} purchased the gym guide.`);
         } else {
            return new Response(JSON.stringify({ success: false }), { status: 400 });
         }
         break;
      }
   }
   return new Response(JSON.stringify({ success: true }), { status: 200 });
}