import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import {
    EmbeddedCheckoutProvider,
    EmbeddedCheckout
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const EmbeddedCheckoutForm = () => {
  const router = useRouter();
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  useEffect(() => {
    const feedback_id = localStorage.getItem('feedback_id');

    console.log(feedback_id)

    const fetchCheckoutSession = async () => {
      try {
        const response = await axios.post(
          'https://ymstlg2yd9.execute-api.us-east-1.amazonaws.com/prod/create-checkout-session', 
          {"feedback_id": feedback_id}, 
          {headers: {'Content-Type': 'multipart/form-data',}}
        );
        setClientSecret(response.data.clientSecret);
      } catch (error) {
          console.error('Error creating checkout session:', error);
          router.push("/error")
      }
    };
    fetchCheckoutSession();
  }, []);

  return (
    <div id="checkout">
      {clientSecret && (
        <EmbeddedCheckoutProvider
          stripe={stripePromise}
          options={{ clientSecret: clientSecret }}
        >
          <EmbeddedCheckout />
        </EmbeddedCheckoutProvider>
      )}
    </div>
  )
};

export default EmbeddedCheckoutForm;
