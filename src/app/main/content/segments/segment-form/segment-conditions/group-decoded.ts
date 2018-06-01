export class GroupDecoded {
  key: string;
  conditions: any[];

  constructor (groupDecoded) {
    this.key = groupDecoded.key;
    this.conditions = groupDecoded.conditions;
  }
}
