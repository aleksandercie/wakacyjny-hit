'use client';

import { useForm, useWatch } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { CircleCheck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { OrderSummary } from './orderSummary';
import { OrderDetailsSection } from './orderDetailsSection';
import {
  CustomerInfoSection,
  OrderFormData,
  orderSchemaCustomer,
} from './customerInfoSection';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useReCaptcha } from 'next-recaptcha-v3';

export const OrderFormContent = ({
  clientSecret,
  paymentIntentId,
}: {
  clientSecret: string | null;
  paymentIntentId: string | null;
}) => {
  const router = useRouter();
  const { cart, updateCartItem, removeItemCart, removeAllItemsCart } =
    useCart();
  const stripe = useStripe();
  const elements = useElements();
  const { executeRecaptcha, loaded } = useReCaptcha();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isValid },
    watch,
    control,
    register,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchemaCustomer),
    mode: 'onBlur',
  });

  const watchAllFields = watch();
  const watchVat = useWatch({ control, name: 'vatInvoice' });

  const onSubmit = async ({
    prefix,
    number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    vatInvoice,
    ...rest
  }: OrderFormData) => {
    if (!stripe || !elements) return;

    if (!loaded || !executeRecaptcha) {
      toast.error('reCAPTCHA nie jest jeszcze gotowe. Spróbuj za chwilę.');
      return;
    }

    const token = await executeRecaptcha('order_form');
    const phone = `${prefix}${number}`;

    const orderPayload = {
      ...rest,
      phone,
      orders: cart.map((order) => ({
        price: Number(order.salePrice || order.price),
        rooms: Number(order.rooms),
        orderId: order.orderId,
        roomsDetails: order.roomsDetails,
      })),
      status: 'new',
      token,
      stripe_payment_intent_id: 'not_set',
    };

    let orderId: string | null = null;

    // 1. Create order in Supabase
    try {
      const createRes = await fetch(
        `${process.env.NEXT_PUBLIC_SITE_URL}/api/order`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderPayload),
        },
      );

      const createData = await createRes.json();

      if (!createRes.ok || !createData.id) {
        throw new Error(
          createData.error || 'Nie udało się utworzyć zamówienia',
        );
      }

      orderId = createData.id;
    } catch {
      toast.error('Błąd', {
        description: 'Nie udało się utworzyć zamówienia. Spróbuj ponownie.',
      });
      return;
    }

    if (paymentIntentId) {
      await fetch('/api/payment-intent/update-metadata', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentIntentId,
          metadata: { orderId },
        }),
      });
    }
    const { firstName, lastName, email, country, postalCode, address, city } =
      rest;
    // 2. Try payment
    const { error: paymentError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
        payment_method_data: {
          billing_details: {
            name: firstName + ' ' + lastName,
            email: email,
            phone,
            address: {
              country: country,
              postal_code: postalCode,
              line1: address,
              city,
            },
          },
        },
      },
      redirect: 'if_required',
    });

    if (paymentError) {
      toast.error('Błąd płatności', { description: paymentError.message });
      return;
    }

    // 4. Show success
    toast.success('Sukces!', {
      description: 'Dziękujemy za złożenie zamówienia!',
      icon: <CircleCheck className="text-success" size={16} />,
      dismissible: true,
      duration: 2000,
    });

    localStorage.setItem('orderSuccess', 'true');
    localStorage.setItem('orderId', orderId ?? '');
    localStorage.setItem('orderEmail', email);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    router.push('/zamowienie-potwierdzone');
    reset();
    removeAllItemsCart();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-8 lg:px-8 lg:gap-8">
        <div className="flex flex-col gap-8 md:px-8 lg:px-0 lg:gap-12">
          {cart.length > 0 && (
            <OrderDetailsSection
              cart={cart}
              updateCartItem={updateCartItem}
              removeItemCart={removeItemCart}
            />
          )}
          <CustomerInfoSection
            reset={reset}
            control={control}
            errors={errors}
            register={register}
            watchVat={watchVat}
            watchAllFields={watchAllFields}
          />
        </div>
        <OrderSummary
          cart={cart}
          isSubmitting={isSubmitting}
          removeAllItemsCart={removeAllItemsCart}
          variant="cart"
          clientSecret={clientSecret}
          isValidCustomer={isValid}
          userEmail={watchAllFields.email}
        />
      </div>
    </form>
  );
};
