import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid'

@Entity("rentals")
class Rental {

  @PrimaryColumn()
  id: string;

  @Column()
  car_id: string;

  @Column()
  user_id: string;

  @Column()
  expected_return_date: Date;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @DeleteDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental }