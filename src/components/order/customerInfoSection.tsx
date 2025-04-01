'use client';

import { useForm, Controller, useWatch } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select } from '../select';
import { useEffect } from 'react';

export const orderSchema = z
  .object({
    email: z.string().email('Niepoprawny adres e-mail'),
    firstName: z.string().min(1, 'Imię jest wymagane'),
    lastName: z.string().min(1, 'Nazwisko jest wymagane'),
    country: z.string().min(1, 'Wybierz kraj'),
    address: z.string().min(1, 'Ulica jest wymagana'),
    postalCode: z.string().regex(/^\d{2}-\d{3}$/, 'Niepoprawny kod pocztowy'),
    phone: z
      .string()
      .regex(/^\+48\d{9}$/, 'Numer telefonu musi zawierać +48 i 9 cyfr'),
    vatInvoice: z.boolean().optional(),
    companyName: z.string().optional(),
    taxId: z.string().optional()
  })
  .superRefine((data, ctx) => {
    if (data.vatInvoice) {
      if (!data.companyName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Nazwa firmy jest wymagana',
          path: ['companyName']
        });
      }
      if (!data.taxId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Numer NIP jest wymagany',
          path: ['taxId']
        });
      } else if (!/^\d{10}$/.test(data.taxId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Numer NIP musi zawierać dokładnie 10 cyfr',
          path: ['taxId']
        });
      }
    }
  });

export type OrderFormData = z.infer<typeof orderSchema>;

type CustomerInfoSectionProps = {
  selectedCountry: string;
  setSelectedCountry: (val: string) => void;
};

const countries = [
  { label: 'Polska', value: 'PL' },
  { label: 'Niemcy', value: 'DE' },
  { label: 'Francja', value: 'FR' },
  { label: 'Włochy', value: 'IT' },
  { label: 'Hiszpania', value: 'ES' },
  { label: 'Czechy', value: 'CZ' },
  { label: 'Słowacja', value: 'SK' },
  { label: 'Litwa', value: 'LT' },
  { label: 'Ukraina', value: 'UA' }
];

const LOCAL_STORAGE_KEY = 'orderFormData';

export const CustomerInfoSection = ({
  selectedCountry,
  setSelectedCountry
}: CustomerInfoSectionProps) => {
  const {
    register,
    control,
    formState: { errors },
    reset,
    watch
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      vatInvoice: false,
      country: 'PL'
    }
  });

  const watchAllFields = watch();
  const watchVat = useWatch({ control, name: 'vatInvoice' });

  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      reset(parsed);
      if (parsed.country) {
        setSelectedCountry(parsed.country);
      }
    }
  }, [reset, setSelectedCountry]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(watchAllFields));
  }, [watchAllFields]);

  return (
    <div className="flex flex-col gap-8 p-4 pb-8 rounded-md bg-white">
      <h2 className="text-2xl font-bold">Dane do zamówienia</h2>
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email')}
            maxLength={254}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Imię</Label>
            <Input
              id="firstName"
              type="text"
              {...register('firstName')}
              maxLength={50}
            />
            {errors.firstName && (
              <p className="text-red-600">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Nazwisko</Label>
            <Input
              id="lastName"
              type="text"
              {...register('lastName')}
              maxLength={50}
            />
            {errors.lastName && (
              <p className="text-red-600">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="country" className="mb-2">
              Kraj
            </Label>
            <Controller
              control={control}
              name="country"
              render={({ field: { onChange } }) => (
                <Select
                  id="country"
                  options={countries}
                  selected={selectedCountry}
                  setSelected={(value) => {
                    onChange(value);
                    setSelectedCountry(value as string);
                  }}
                  placeholder="Wybierz kraj"
                />
              )}
            />
            {errors.country && (
              <p className="text-red-600">{errors.country.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="postalCode">Kod pocztowy</Label>
            <Input
              id="postalCode"
              type="text"
              maxLength={6}
              {...register('postalCode')}
              onInput={(e) => {
                const input = e.currentTarget;
                let raw = input.value.replace(/[^0-9]/g, '').slice(0, 5);
                if (raw.length > 2) {
                  raw = raw.slice(0, 2) + '-' + raw.slice(2);
                }
                input.value = raw;
              }}
              className="mt-2"
            />
            {errors.postalCode && (
              <p className="text-red-600">{errors.postalCode.message}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="address">Adres</Label>
          <Input
            id="address"
            type="text"
            {...register('address')}
            maxLength={100}
          />
          {errors.address && (
            <p className="text-red-600">{errors.address.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Numer telefonu</Label>
          <Input
            id="phone"
            type="tel"
            maxLength={12}
            {...register('phone')}
            onInput={(e) => {
              const input = e.currentTarget;
              let value = input.value;
              if (!value.startsWith('+48')) {
                value = '+48' + value.replace(/[^0-9]/g, '');
              } else {
                value = '+48' + value.slice(3).replace(/[^0-9]/g, '');
              }

              input.value = value.slice(0, 12);
            }}
          />
          {errors.phone && (
            <p className="text-red-600">{errors.phone.message}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Controller
            control={control}
            name="vatInvoice"
            render={({ field: { value, onChange } }) => (
              <Checkbox
                id="vatInvoice"
                checked={value}
                onCheckedChange={onChange}
              />
            )}
          />
          <Label htmlFor="vatInvoice">Chcę otrzymać fakturę VAT</Label>
        </div>
        {watchVat && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Nazwa firmy</Label>
              <Input
                id="companyName"
                type="text"
                {...register('companyName')}
                maxLength={100}
              />
              {errors.companyName && (
                <p className="text-red-600">{errors.companyName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="taxId">Numer NIP</Label>
              <Input
                id="taxId"
                type="text"
                maxLength={10}
                {...register('taxId')}
                onInput={(e) => {
                  const input = e.currentTarget;
                  input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
                }}
              />
              {errors.taxId && (
                <p className="text-red-600">{errors.taxId.message}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
