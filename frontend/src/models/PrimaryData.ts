export interface Photo {
  download_url: string;
  expires_at: string;
}

export interface AccidentReference {
  id: string;
  refNo: string;
  busNo: string;
  bonnetNo:string;
  regNo: string;
  ksrcOrKswift: string;
  busClass: string;
  operatedDepotZone: string;
  ageOfBus: number;
  accidentPlace: string;
  accidentDate: string;
  nearestPoliceStation: string;
  /* jurisdiction_depot:string */ 
  timeOfAccident: string;
  dateOfAccident:string;
  timeZone:string;
  homeDepot: string;
  operatedDepot: string;
  scheduleNumber: string;
  driverName: string;
  driverPhone: string;
  conductorName: string;
  conductorPhone: string;
  accidentState: string;
  accidentDistrict: string;
  description: string;
  photos: Photo[];
  accidentLatitude: string;
  accidentLongitude: string;
  /* videos:Video[]; */
}