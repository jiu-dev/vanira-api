export interface CreatePropertyDTO {
  tag: string;
  name: string;
  description?: string;
  translations: [
    {
      langageCode: string;
      tag: string;
      name: string;
      description?: string;
    }
  ];
}
