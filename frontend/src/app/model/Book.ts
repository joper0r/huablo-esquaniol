export class Book {
  _index: string;
  _type: string;
  _id: string;
  _score: number;
  _source: {
    id: string;
    title: string;
    subtitle: string;
    authors: [
      string
      ];
    publisher: string;
    publishedDate: number;
    description: string;
    industryIdentifiers: [
      {
        type:  string;
        identifier: number;
      }
      ];
    pageCount: 304;
    printType: [
      string
      ];
    categories: [
      string
      ];
    imageLinks: {
      smallThumbnail: string;
      thumbnail: string;
    };
    language: string;
    deliveryOption: string;
    price: number;
  };
}
