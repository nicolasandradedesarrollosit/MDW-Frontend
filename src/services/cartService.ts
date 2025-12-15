export async function sentToOrder(
    cartItems: any,
    userId: any,
    totalAmount: number,
    address: string,
    city: string,
    postalCode: string,
    phone: string
) {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
    try {
        const itemsArray = Array.isArray(cartItems)
            ? cartItems
            : cartItems && typeof cartItems === "object"
            ? Object.values(cartItems)
            : [];

        const payload = {
            id_user: userId,
            products: itemsArray.map((it: any) => ({
                id_product: it.productId || it._id || it.id_product || it.id,
                quantity: it.quantity,
                size: it.size,
                price: it.price,
            })),
            phone,
            city,
            postal_code: postalCode,
            total_amount: totalAmount,
            address,
        };

        const response = await fetch(`${url}/api/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(payload),
        });

        const data = await response.json().catch(() => null);

        if (!response.ok) {
            console.error("Order failed:", { status: response.status, data });
            return { ok: false, data };
        }

        return { ok: true, data };
    } catch (err) {
        console.error("Error sending order:", err);
        throw err;
    }
}

export async function fetchOrders() {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
    try {
        const response = await fetch(`${url}/api/orders`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
        });
        const data = await response.json().catch(() => null);

        if (!response.ok) {
            console.error("Fetching user orders failed:", { status: response.status, data });
            return { ok: false, data };
        }
        return { ok: true, data };
    } catch (err) {
        console.error("Error fetching user orders:", err);
        throw err;
    }
}

export async function updateOrderStatus(orderId: string, newStatus: string) {
    const url = import.meta.env.VITE_PRODUCTION === 'true' ? import.meta.env.VITE_URL_BACK : 'http://localhost:4002';
    try {
        const response = await fetch(`${url}/api/orders/${orderId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({ status: newStatus }),
        });
        const data = await response.json().catch(() => null);
        if (!response.ok) {
            console.error("Updating order status failed:", { status: response.status, data });
            return { ok: false, data };
        }
        return { ok: true, data };
    } catch (err) {
        console.error("Error updating order status:", err);
        throw err;
    }
}