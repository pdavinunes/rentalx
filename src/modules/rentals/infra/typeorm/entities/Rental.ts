import { v4 as uuidV4 } from 'uuid'

class Rental {
  id: string;

  car_id: string;

  user_id: string;

  expected_return_date: Date;

  start_date: Date;

  end_date: Date;

  total: number;

  created_at: Date;

  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental }