export class Country {
  id: number;
  name: string;
  code: string;

  constructor (country) {
    this.id = country.id;
    this.name = country.name;
    this.code = country.code;
  }
}
