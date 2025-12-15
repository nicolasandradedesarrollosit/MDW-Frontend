import CartDescription from "@/components/order/CartDescription"
import GoBack from "@/components/order/goBack"
import FormAddress from "@/components/order/FormAdress"

export default function Order() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <GoBack />
      
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <CartDescription />
        <FormAddress />
      </div>
    </div>
  );
}