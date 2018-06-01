const conditionTypes = [
  {id: 1, name: 'Demographics', color: '', types: ['country_code', 'lat-long', 'install_date']},
  {id: 2, name: 'Device', color: '', types: ['device_model', 'is_tablet', 'manufacturer']},
  {id: 3, name: 'Technology', color: '', types: ['platform', 'os_version', 'versioncode', 'market']},
  {id: 4, name: 'Custom', color: '', types: ['events', 'attributes']},
];

export class Condition {
  fieldName: string;
  operator: string;
  type: string;
  value: string;

  constructor (condition?) {
    condition = condition || {};

    this.fieldName = condition.fieldName || '';
    this.operator = condition.operator || '';
    this.type = condition.type || '';
    this.value = condition.value || '';
  }

  public static getTypes (): any[] {
    return conditionTypes;
  }

  public static getType (type: string) {
    return conditionTypes.filter(conditionType => conditionType.types.includes(type))[0];
  }
}
