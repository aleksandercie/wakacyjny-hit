export type QuantityOption = {
  id: number;
  label: string;
  value: string;
  maxPersons: number;
  minPersons: number;
  salePrice: string;
};

export const quantityOptions: QuantityOption[] = [
  {
    id: 1,
    label: '1-2 osoby (249.99 zł)',
    value: '249.99',
    maxPersons: 2,
    minPersons: 1,
    salePrice: '199.99'
  },
  {
    id: 2,
    label: '3-6 osoby (299.99 zł)',
    value: '299.99',
    maxPersons: 6,
    minPersons: 3,
    salePrice: '299.99'
  },
  {
    id: 3,
    label: '7-10 osoby (499.99 zł)',
    value: '499.99',
    maxPersons: 10,
    minPersons: 7,
    salePrice: '499.99'
  }
];
