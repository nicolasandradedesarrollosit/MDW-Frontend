import { useState } from "react";
import { sentToOrder } from "@/services/cartService";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";


type FormData = {
  phone: string;
  address: string;
  city: string;
  postalCode: string;
};

type FormErrors = {
  phone: string | null;
  address: string | null;
  city: string | null;
  postalCode: string | null;
};

export default function FormAddress() {
  const navigate = useNavigate();
  const { authState } = useAuth();

  const [formData, setFormData] = useState<FormData>({
    phone: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    phone: null,
    address: null,
    city: null,
    postalCode: null,
  });

  const validateField = (name: keyof FormData, value: string): string | null => {
    switch (name) {
      case "phone": {
        if (!value.trim()) return "El teléfono es obligatorio.";
        const digits = value.replace(/\D/g, "");
        if (digits.length < 7) return "Ingrese un teléfono válido.";
        if (!/^[+\d\s().-]+$/.test(value)) return "Formato de teléfono inválido.";
        return null;
      }
      case "address": {
        if (!value.trim()) return "La dirección es obligatoria.";
        if (value.trim().length < 3) return "Ingrese una dirección válida.";
        return null;
      }
      case "city": {
        if (!value.trim()) return "La ciudad es obligatoria.";
        return null;
      }
      case "postalCode": {
        if (!value.trim()) return "El código postal es obligatorio.";
        if (!/^\d{3,10}$/.test(value)) return "Ingrese un código postal válido (solo números).";
        return null;
      }
      default:
        return null;
    }
  };

  const validateAll = (data: FormData) => {
    return {
      phone: validateField("phone", data.phone),
      address: validateField("address", data.address),
      city: validateField("city", data.city),
      postalCode: validateField("postalCode", data.postalCode),
    } as FormErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    const fieldError = validateField(name as keyof FormData, value);
    setErrors((prev) => ({ ...prev, [name]: fieldError }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    const newErrors = validateAll(formData);
    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((v) => v !== null);
    if (hasError) {
      console.log("Errores en el formulario:", newErrors);
      return;
    }
    try {
      const cartRaw = localStorage.getItem("cart");
      const cartParsed = cartRaw ? JSON.parse(cartRaw) : [];
      const cartArray = Array.isArray(cartParsed)
        ? cartParsed
        : cartParsed && typeof cartParsed === "object"
        ? Object.values(cartParsed)
        : [];

      if (cartArray.length === 0) {
        console.error("Carrito vacío: no hay productos para enviar");
        return;
      }

      const totalAmount = cartArray.reduce((s: number, it: any) => s + (Number(it.price || 0) * Number(it.quantity || 0)), 0);
      const userId = authState?.id || localStorage.getItem("userId") || "";

      const response = await sentToOrder(
        cartParsed,
        userId,
        totalAmount,
        formData.address,
        formData.city,
        formData.postalCode,
        formData.phone
      );

      if (!response.ok) {
        console.error("Error en la respuesta del servidor:", response);
        return;
      }

      localStorage.removeItem("cart");
      localStorage.removeItem("totalAmount");
      window.location.reload();
      navigate("/");
    } catch (err) {
      console.error("Error al enviar el pedido:", err);
    }
  };

  const inputBaseClass =
    "w-full px-4 py-3 bg-gray-50 border rounded-xl focus:outline-none transition-all";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Información de Entrega</h2>
          <p className="text-gray-600 text-sm">Complete los datos para recibir su pedido</p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Teléfono</label>
            <input
              name="phone"
              type="tel"
              placeholder="+54 9 341 123-4567"
              value={formData.phone}
              onChange={handleChange}
              className={`${inputBaseClass} border-gray-200 focus:ring-2 focus:ring-black ${
                errors.phone ? "border-red-500 focus:ring-red-200" : "border-gray-200"
              }`}
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Dirección</label>
            <input
              name="address"
              type="text"
              placeholder="Calle Principal 123"
              value={formData.address}
              onChange={handleChange}
              className={`${inputBaseClass} border-gray-200 focus:ring-2 focus:ring-black ${
                errors.address ? "border-red-500 focus:ring-red-200" : "border-gray-200"
              }`}
            />
            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Ciudad</label>
              <input
                name="city"
                type="text"
                placeholder="Rosario"
                value={formData.city}
                onChange={handleChange}
                className={`${inputBaseClass} border-gray-200 focus:ring-2 focus:ring-black ${
                  errors.city ? "border-red-500 focus:ring-red-200" : "border-gray-200"
                }`}
              />
              {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Código Postal</label>
              <input
                name="postalCode"
                type="text"
                placeholder="2000"
                value={formData.postalCode}
                onChange={handleChange}
                className={`${inputBaseClass} border-gray-200 focus:ring-2 focus:ring-black ${
                  errors.postalCode ? "border-red-500 focus:ring-red-200" : "border-gray-200"
                }`}
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-4 rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 hover:shadow-lg mt-6"
          >
            Confirmar Pedido
          </button>
        </div>
      </form>
    </div>
  );
}