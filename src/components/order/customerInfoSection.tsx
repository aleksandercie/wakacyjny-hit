'use client';

import {
  Controller,
  UseFormReset,
  Control,
  FieldErrors,
  UseFormRegister,
} from 'react-hook-form';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { countries } from '@/lib/countries';
import { ROUTES } from '@/lib/routes';

const { TERMS } = ROUTES;

export const orderSchemaCustomer = z
  .object({
    email: z.string().email('Niepoprawny adres e-mail'),
    firstName: z.string().min(1, 'Imię jest wymagane'),
    lastName: z.string().min(1, 'Nazwisko jest wymagane'),
    country: z.string().min(1, 'Wybierz kraj'),
    city: z.string().min(1, 'Miasto jest wymagane'),
    address: z.string().min(1, 'Adres jest wymagany'),
    postalCode: z.string().min(3, 'Niepoprawny kod pocztowy'),
    prefix: z.string().nonempty(),
    number: z
      .string()
      .min(6, { message: 'Numer telefonu musi mieć co najmniej 6 cyfr' })
      .max(15, { message: 'Numer telefonu nie może mieć więcej niż 15 cyfr' })
      .regex(/^\d+$/, { message: 'Użyj tylko cyfr bez spacji' }),
    vatInvoice: z.boolean().optional(),
    companyName: z.string().optional(),
    taxId: z.string().optional(),
    acceptedPolicy: z.boolean().refine((v) => v === true, {
      message: 'Akceptacja regulaminu jest wymagana',
    }),
  })
  .superRefine((data, ctx) => {
    if (data.vatInvoice) {
      if (!data.companyName) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Nazwa firmy jest wymagana',
          path: ['companyName'],
        });
      }
      if (!data.taxId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Numer NIP jest wymagany',
          path: ['taxId'],
        });
      } else if (!/^\d{10}$/.test(data.taxId)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Numer NIP musi zawierać dokładnie 10 cyfr',
          path: ['taxId'],
        });
      }
    }
  });

export type OrderFormData = z.infer<typeof orderSchemaCustomer>;

type CustomerInfoSectionProps = {
  reset: UseFormReset<OrderFormData>;
  control: Control<OrderFormData, unknown>;
  errors: FieldErrors<OrderFormData>;
  register: UseFormRegister<OrderFormData>;
  watchVat: boolean | undefined;
  watchAllFields: OrderFormData;
};

export const LOCAL_STORAGE_KEY = 'orderFormData-v2';

export const CustomerInfoSection = ({
  reset,
  control,
  errors,
  register,
  watchVat,
  watchAllFields,
}: CustomerInfoSectionProps) => {
  useEffect(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedData) {
      const parsed = JSON.parse(savedData);
      setTimeout(() => {
        reset({ ...parsed, acceptedPolicy: false });
      }, 100);
    } else {
      setTimeout(() => {
        reset({
          email: '',
          firstName: '',
          lastName: '',
          country: 'PL',
          city: '',
          address: '',
          postalCode: '',
          prefix: '+48',
          number: '',
          vatInvoice: false,
          companyName: '',
          taxId: '',
          acceptedPolicy: false,
        });
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(watchAllFields));
  }, [watchAllFields]);

  return (
    <div className="flex flex-col gap-8 p-4 pb-8 rounded-md bg-background dark:border dark:border-gray-500">
      <h2 className="text-2xl font-bold">Dane do zamówienia</h2>
      <div className="flex flex-col gap-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register('email', { onBlur: () => {} })}
            maxLength={254}
          />
          {errors.email && (
            <p className="text-red-600 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Imię</Label>
            <Input
              id="firstName"
              type="text"
              {...register('firstName', { onBlur: () => {} })}
              maxLength={50}
            />
            {errors.firstName && (
              <p className="text-red-600 text-sm">{errors.firstName.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Nazwisko</Label>
            <Input
              id="lastName"
              type="text"
              {...register('lastName', { onBlur: () => {} })}
              maxLength={50}
            />
            {errors.lastName && (
              <p className="text-red-600 text-sm">{errors.lastName.message}</p>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="country">Kraj</Label>
            <Controller
              control={control}
              name="country"
              render={({ field: { onChange, value } }) => (
                <Select
                  value={value}
                  onValueChange={(val) => {
                    onChange(val);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz kraj" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.value}>
                        <span className="mr-1">{country.flag}</span>{' '}
                        {country.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.country && (
              <p className="text-red-600 text-sm">{errors.country.message}</p>
            )}
          </div>
          <div>
            <Label htmlFor="postalCode">Kod pocztowy</Label>
            <Input
              id="postalCode"
              type="text"
              maxLength={12}
              {...register('postalCode', { onBlur: () => {} })}
              onInput={(e) => {
                const input = e.currentTarget;
                input.value = input.value
                  .replace(/[^a-zA-Z0-9 -]/g, '')
                  .slice(0, 12);
              }}
              className="mt-2"
            />
            {errors.postalCode && (
              <p className="text-red-600 text-sm">
                {errors.postalCode.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="city">Miasto</Label>
          <Input
            id="city"
            type="text"
            {...register('city', { onBlur: () => {} })}
            maxLength={100}
          />
          {errors.city && (
            <p className="text-red-600 text-sm">{errors.city.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="address">Adres</Label>
          <Input
            id="address"
            type="text"
            {...register('address', { onBlur: () => {} })}
            maxLength={100}
          />
          {errors.address && (
            <p className="text-red-600 text-sm">{errors.address.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="phone" className="text-gray-500 text-base">
            Numer telefonu
          </Label>
          <div className="flex gap-2">
            <Controller
              control={control}
              name="prefix"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-[112px]">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country.value} value={country.dial_code}>
                        <span className="mr-1">{country.flag}</span>{' '}
                        {country.dial_code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            <Input
              id="phone"
              type="tel"
              {...register('number')}
              onInput={(e) => {
                e.currentTarget.value = e.currentTarget.value
                  .replace(/[^\d]/g, '')
                  .slice(0, 15);
              }}
              placeholder=""
              className="flex-1"
            />
          </div>
          {(errors.prefix || errors.number) && (
            <p className="text-red-600 text-sm">
              {errors.prefix?.message || errors.number?.message}
            </p>
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
                {...register('companyName', { onBlur: () => {} })}
                maxLength={100}
              />
              {errors.companyName && (
                <p className="text-red-600 text-sm">
                  {errors.companyName.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="taxId">Numer NIP</Label>
              <Input
                id="taxId"
                type="text"
                maxLength={10}
                {...register('taxId', { onBlur: () => {} })}
                onInput={(e) => {
                  const input = e.currentTarget;
                  input.value = input.value.replace(/[^0-9]/g, '').slice(0, 10);
                }}
              />
              {errors.taxId && (
                <p className="text-red-600 text-sm max-w-[220px]">
                  {errors.taxId.message}
                </p>
              )}
            </div>
          </div>
        )}
        <div>
          <div className="flex items-center gap-2">
            <Controller
              control={control}
              name="acceptedPolicy"
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  id="acceptedPolicy"
                  checked={value}
                  onCheckedChange={onChange}
                />
              )}
            />
            <Label htmlFor="acceptedPolicy" className="max-w-prose">
              <div>
                Żądam rozpoczęcia wykonywania usługi (przekazania pełnej
                informacji o podróży) przed upływem terminu do odstąpienia od
                umowy, o którym mowa w{' '}
                <a
                  href={TERMS}
                  className="text-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Regulaminie serwisu
                </a>
                , i przyjmuję do wiadomości, że z chwilą jej pełnego wykonania
                stracę prawo odstąpienia od umowy.
              </div>
            </Label>
          </div>
          {errors.acceptedPolicy && (
            <p className="text-red-600 text-sm">
              {errors.acceptedPolicy.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
