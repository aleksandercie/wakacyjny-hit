export type Trip = {
  id: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  secondaryDescription: string;
  created_at: string;
  price: number;
  flight: string[];
  accomodation: string[];
  transfer: string[];
  duration: string;
  startDate: string;
  endDate: string;
  expired: boolean;
  image: string;
  tags: string[];
  departures: string[];
};
