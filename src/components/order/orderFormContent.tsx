'use client';

import { useForm, useWatch } from 'react-hook-form';
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
  orderSchemaCustomer
} from './customerInfoSection';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';

export const OrderFormContent = ({
  clientSecret
}: {
  clientSecret: string | null;
}) => {
  const router = useRouter();
  const [selectedCountry, setSelectedCountry] = useState('PL');
  const { cart, updateCartItem, removeItemCart, removeAllItemsCart } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isValid },
    watch,
    control,
    register
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchemaCustomer),
    defaultValues: {
      vatInvoice: false,
      country: 'PL'
    },
    mode: 'onBlur'
  });

  const watchAllFields = watch();
  const watchVat = useWatch({ control, name: 'vatInvoice' });

  const onSubmit = async (data: OrderFormData) => {
    if (!stripe || !elements) return;

    delete data.vatInvoice;

    const orderPayload = {
      ...data,
      orders: cart.map((order) => ({
        price: Number(order.salePrice || order.price),
        rooms: Number(order.rooms),
        orderId: order.orderId,
        roomsDetails: order.roomsDetails
      })),
      status: 'new',
      stripe_payment_intent_id: 'not_set'
    };

    let orderId: string | null = null;

    // 1. Create order in Supabase
    try {
      const createRes = await fetch('/api/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });

      const createData = await createRes.json();

      if (!createRes.ok || !createData.id) {
        throw new Error(
          createData.error || 'Nie udało się utworzyć zamówienia'
        );
      }

      orderId = createData.id;
    } catch (err) {
      toast.error('Błąd', {
        description: 'Nie udało się utworzyć zamówienia. Spróbuj ponownie.'
      });
      console.error(err);
      return;
    }

    // 2. Try payment
    const { error: paymentError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
        payment_method_data: {
          billing_details: {
            name: data.firstName + ' ' + data.lastName,
            email: data.email,
            phone: data.phone,
            address: {
              country: data.country,
              postal_code: data.postalCode,
              line1: data.address
            }
          }
        }
      },
      redirect: 'if_required'
    });

    const newStatus = paymentError ? paymentError.decline_code : 'paid';

    // 3. Patch the order with the new status (and optionally Stripe paymentIntent id)
    try {
      await fetch(`/api/order/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: newStatus,
          stripe_payment_intent_id: paymentError
            ? paymentError?.payment_intent?.id || 'error_payment_id_not_set'
            : paymentIntent?.id || 'success_payment_id_not_set'
        })
      });
    } catch (err) {
      console.error('Błąd przy aktualizacji statusu zamówienia:', err);
    }

    if (paymentError) {
      toast.error('Błąd płatności', { description: paymentError.message });
      return;
    }

    // 4. Show success
    toast.success('Sukces!', {
      description: 'Dziękujemy za złożenie zamówienia!',
      icon: <CircleCheck className="text-green-500" size={16} />,
      dismissible: true,
      duration: 2000
    });

    localStorage.setItem('orderSuccess', 'true');
    localStorage.setItem('orderId', orderId ?? '');
    localStorage.setItem('orderEmail', data.email);

    reset();
    removeAllItemsCart();
    setSelectedCountry('PL');

    router.push('/zamowienie-potwierdzone');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-8 lg:px-8 lg:gap-8">
        <div className="flex flex-col gap-8 md:px-8 lg:px-0 lg:gap-12">
          <CustomerInfoSection
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            reset={reset}
            control={control}
            errors={errors}
            register={register}
            watchVat={watchVat}
            watchAllFields={watchAllFields}
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
          clientSecret={clientSecret}
          isValidCustomer={isValid}
        />
      </div>
    </form>
  );
};
