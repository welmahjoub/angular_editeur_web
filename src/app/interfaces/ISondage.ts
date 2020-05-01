import {IReunion} from '../interfaces/IReunion';
import {IUser} from '../interfaces/IUser';

export interface ISondage {
  id: string;
  lien: string;
  clos: boolean;
  user: IUser;
  reunion: IReunion;
  dateProposees: [];
  choix: [];
  dateCreation: string;
  datereunion: string;
}
