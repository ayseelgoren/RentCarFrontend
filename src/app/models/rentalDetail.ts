export interface RentalDetail {
  carId: number;
  userId: number;
  lastName : string;
  firstName : string;
  carName: string;
  brandName: string;
  dailyPrice : number;
  rentDate: Date;
  returnDate: Date;
  carFindexPoint : number;
  customerFindexPoint : number
}
