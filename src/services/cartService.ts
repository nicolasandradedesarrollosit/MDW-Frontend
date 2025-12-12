export async function sentToOrder(cartItems: any[], userId: string, totalAmount: number) {
    try {
        const response = await fetch('https://mdw-backend.onrender.com/api/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId,
                cartItems,
                totalAmount
            })
        });
        if (!response.ok) {
            throw new Error('Failed to send order');
        }
        return await response.json();
    }
    catch (err){
        console.error('Error sending order:', err);
        throw err;
    }
}