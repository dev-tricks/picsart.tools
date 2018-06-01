export class Selector {
  name: string;
  displayName: string;
  type: string;
  operatorType: string;

  constructor (selector) {
    this.name = selector.name;
    this.displayName = selector.displayName;
    this.type = selector.type;
    this.operatorType = selector.operatorType;
  }

  public static getOperatorType (name: string, selectors: Selector[]): string {
    return selectors.filter((selector: Selector) => selector.name === name)[0].operatorType;
  }

  public static filterByType (types: any[], selectors: Selector[]): Selector[] {
    return selectors.filter((selector: Selector) => {
      return types.includes(selector.name);
    });
  }
}
