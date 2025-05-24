document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.checkout-button');
    const stripe = Stripe('pk_test_123456789'); // Remplacez par votre clé publique Stripe

    buttons.forEach(button => {
        button.addEventListener('click', async () => {
            const pack = button.getAttribute('data-pack');
            
            try {
                // Appel à notre backend (Netlify Function)
                const response = await fetch('/.netlify/functions/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pack })
                });
                
                const session = await response.json();
                stripe.redirectToCheckout({ sessionId: session.id });
            } catch (error) {
                console.error('Erreur:', error);
                alert('Une erreur est survenue. Veuillez réessayer.');
            }
        });
    });
});