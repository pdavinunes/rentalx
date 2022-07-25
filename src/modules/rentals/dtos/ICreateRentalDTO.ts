interface ICreateRentalDTO {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
  id?: string;
  total?: number;
  end_date?: Date;
}

export { ICreateRentalDTO }