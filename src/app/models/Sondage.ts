export  class Sondage {
  resume: string;
  intitule: string;
  idUser: string;
  dates: any [];


  constructor( resume: string, intitule: string, idUser: string, dates: string[] ) {
    this.resume = resume;
    this.intitule = intitule;
    this.idUser = idUser;
    this.dates = dates;
  }

}
