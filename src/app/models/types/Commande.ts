import { StatusOption } from './StatusOption';

export type Commande = {
  id: number;
  prix: number;
  date: Date;
  status: string | StatusOption;
  bar_id: number;
};
