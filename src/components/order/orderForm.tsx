'use client';

import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CircleCheck } from 'lucide-react';
import { Dispatch, SetStateAction, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { OrderSummary } from './orderSummary';
import { OrderDetailsSection } from './orderDetailsSection';
import {
  CustomerInfoSection,
  OrderFormData,
  orderSchema
} from './customerInfoSection';

export const OrderForm = ({
  setSuccess
}: {
  setSuccess: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selectedCountry, setSelectedCountry] = useState('PL');
  const { cart, updateCartItem, removeItemCart, removeAllItemsCart } =
    useCart();

  const methods = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      vatInvoice: false,
      country: 'PL'
    }
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting }
  } = methods;

  const onSubmit = async (data: OrderFormData) => {
    delete data.vatInvoice;

    const totalPrice = cart.reduce(
      (acc, item) => acc + Number(item.salePrice || item.price),
      0
    );
    console.log(totalPrice);

    const payload = {
      ...data,
      orders: cart.map((order) => ({
        price: Number(order.salePrice || order.price),
        rooms: Number(order.rooms),
        orderId: order.orderId,
        roomsDetails: order.roomsDetails
      })),
      status: 'new'
    };

    try {
      const res = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const responseData = await res.json();

      if (!res.ok || !responseData.id) {
        throw new Error(responseData.error || 'Failed to submit order');
      }

      toast.success('Sukces!', {
        description: 'Dziękujemy za złożenie zamówienia!',
        icon: <CircleCheck className="text-green-500" size={16} />,
        dismissible: true,
        duration: 2000
      });

      reset();
      removeAllItemsCart();
      setSelectedCountry('PL');
      setSuccess(true);
    } catch (err) {
      toast.error('Błąd', {
        description:
          'Nie udało się złożyć zamówienia. Spróbuj ponownie później lub skontaktuj się z naszym zespołem'
      });
      console.error(err);
    }
  };

  return (
    <FormProvider {...methods}>
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
    </FormProvider>
  );
};
