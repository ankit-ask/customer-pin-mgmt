export interface Pin {
  title: string;
  image: string; // URL of the uploaded image
  collaboratories: string[]; // Array of collaboratory
  privacy: 'Public' | 'Private';
}
