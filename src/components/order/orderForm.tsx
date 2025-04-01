'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CircleCheck } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { OrderSummary } from './orderSummary';
import { OrderDetailsSection } from './orderDetailsSection';
import {
  CustomerInfoSection,
  OrderFormData,
  orderSchema
} from './customerInfoSection';

export const OrderForm = () => {
  const [selectedCountry, setSelectedCountry] = useState('PL');
  const { cart, updateCartItem, removeItemCart, removeAllItemsCart } =
    useCart();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      vatInvoice: false,
      country: 'PL'
    }
  });

  const onSubmit = async (data: OrderFormData) => {
    console.log({
      ...data,
      orders: cart
    });

    toast.success('Sukces!', {
      description: 'Dziękujemy za złożenie zamówienia!',
      icon: <CircleCheck className="text-green-500" size={16} />,
      dismissible: true,
      duration: 2000
    });

    reset();
    setSelectedCountry('PL');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-8 lg:px-8 lg:gap-8">
        <div className="flex flex-col gap-8 md:px-8 lg:px-0 lg:gap-12">
          <CustomerInfoSection
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
          />
          {cart.length > 0 && (
            <OrderDetailsSection
              cart={cart}
              updateCartItem={updateCartItem}
              removeItemCart={removeItemCart}
            />
          )}
        </div>
        <OrderSummary
          cart={cart}
          isSubmitting={isSubmitting}
          removeAllItemsCart={removeAllItemsCart}
          variant="cart"
        />
      </div>
    </form>
  );
};
