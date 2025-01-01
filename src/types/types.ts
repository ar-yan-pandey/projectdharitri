export interface TimeRange {
  start: string;
  end: string;
}

export interface Availability {
  monday?: TimeRange;
  tuesday?: TimeRange;
  wednesday?: TimeRange;
  thursday?: TimeRange;
  friday?: TimeRange;
  saturday?: TimeRange;
  sunday?: TimeRange;
}

export interface Vet {
  id: number;
  created_at: string;
  full_name: string;
  speciality: string;
  city: string;
  state: string;
  phone_number: string;
  image_url: string;
  rating: number;
  availability: Availability | string;
}
