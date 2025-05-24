const stripe = require('stripe')('sk_test_123456789'); // Votre clé secrète Stripe

exports.handler = async (event) => {
    const { pack } = JSON.parse(event.body);
    let priceId;

    // Associez chaque pack à un prix Stripe (créez-les dans le dashboard Stripe)
    switch (pack) {
        case 'essentiel':
            priceId = 'price_123'; // Remplacez par vos IDs de prix Stripe
            break;
        case 'complet':
            priceId = 'price_456';
            break;
        case 'premium':
            priceId = 'price_789';
            break;
        default:
            return { statusCode: 400, body: 'Pack invalide' };
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'payment',
            success_url: 'https://votre-site.netlify.app/success.html',
            cancel_url: 'https://votre-site.netlify.app/cancel.html',
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ id: session.id })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};