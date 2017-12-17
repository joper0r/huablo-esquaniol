import {Book} from './Book';

export class Response {
  kind: string;
  totalItems: number;
  items: Book[];
}
