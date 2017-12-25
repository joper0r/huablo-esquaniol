import {Book} from './Book';

export class Response {
  took: string;
  timed_out: number;
  _shards: any;
  hits: {
    total: number;
    max_score: number;
    hits: Book[];
  };
}
