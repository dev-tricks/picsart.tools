export class Operator {
  code: string;
  displayName: string;

  constructor (operator) {
    this.code = operator.code;
    this.displayName = operator.displayName;
  }

  public static getOperatorsBySelectorType (type, includeExcludeOperators, compareOperators, newUserOperators, mapOperators) {
    let operators: Operator[];

    switch (type) {
      case 'COMPARE':
        operators = compareOperators;
        break;
      case 'INCLUDE_EXCLUDE':
        operators = includeExcludeOperators;
        break;
      case 'NEW_USER':
        operators = newUserOperators;
        break;
      case 'MAP':
        operators = mapOperators;
        break;
    }

    return operators
  }
}
