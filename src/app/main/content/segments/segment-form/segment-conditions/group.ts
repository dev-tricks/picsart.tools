import { Condition } from './condition';
import { GroupDecoded } from './group-decoded';

const groupKeys: string[] = ['$and', '$or'];

export class Group {
  $and: Condition[];
  $or: Condition[];

  constructor (group?, addConditionsCount?) {
    group = group || {'$and': []};

    const groupKey = Group.getKey(group);
    this[groupKey] = group[groupKey].length ? group[groupKey] : [];

    if (addConditionsCount) {
      for (let i = 0; i < addConditionsCount; i++) {
        this[groupKey].push(new Condition());
      }
    }
  }

  public static isGroup (conditionOrGroup: any): boolean {
    return conditionOrGroup instanceof GroupDecoded;
  }

  public static decode (group: Group, isNew: boolean = false): GroupDecoded {
    const groupKey = Group.getKey(group);

    return new GroupDecoded({
      key: isNew ? '' : groupKey,
      conditions: group[groupKey]
    });
  }

  public static encode (group: GroupDecoded): Group {
    return new Group({
      [group.key]: group.conditions
    });
  }

  public static getKey (group: Group): string {
    for (let i = 0; i < groupKeys.length; i++) {
      if (group[groupKeys[i]]) {
        return groupKeys[i];
      }
    }

    return '';
  }
}
