import { ISondage } from './ISondage';

export interface IUser {
  id: number;
  nom: string;
  prenom: string;
  mail: string;
  password: string;
  sondages: ISondage[];
  // choix: [];
}
