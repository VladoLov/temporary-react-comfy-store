//example of typing something on server

//
require("dotenv").config();
const stripe = require("stripe")(process.env.REACT_APP_STRIPE_SECRET_KEY);
//how we connecting to the stripe

//domain/.netlify/functions/hello

exports.handler = async function (event, context) {
  if (event.body) {
    const { cart, shipping_fee, total_amount } = JSON.parse(event.body);

    const calculateOrderAmount = () => {
      return shipping_fee + total_amount;
    };
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: calculateOrderAmount(),
        currency: "BAM",
      });
      return {
        statusCode: 200,
        body: JSON.stringify({ clientSecret: paymentIntent.client_secret }),
      };
    } catch (error) {
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: error.message }),
      };
    }

    // return {
    //   statusCode: 200,
    //   body: JSON.stringify(cart),
    // };
  }
  return {
    statusCode: 200,
    body: "Create Payment Intent",
  };
};
