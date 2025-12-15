export default function CartDescription() {
    const cartJson = localStorage.getItem('cart') || '{}'
    let cartItems: any[] = []
    try {
        const parsed = JSON.parse(cartJson)
        cartItems = Array.isArray(parsed) ? parsed : Object.values(parsed ?? {})
    } catch {
        cartItems = []
    }
    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
     return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Resumen del Pedido
        </h2>

        <div className="space-y-4 mb-6">
          {cartItems.map((item, index) => (
            <div 
              key={index}
              className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
                  <img 
                    src={item.url_image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span>Talle: {item.size}</span>
                    <span>•</span>
                    <span>Cant: {item.quantity}</span>
                  </div>
                </div>
                
                <div className="text-lg font-bold text-gray-900">
                  ${item.price.toLocaleString('es-AR')}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-2xl font-bold text-gray-900">
              ${total.toLocaleString('es-AR')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
