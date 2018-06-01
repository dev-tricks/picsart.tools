export class Segment {
  id: number;
  name: string;
  description: string;
  user: string;
  json: string;
  updateDate: number;
  type: number;

  constructor (segment?) {
    segment = segment || {};

    this.id = segment.id || null;
    this.name = segment.name || '';
    this.description = segment.description || '';
    this.user = segment.user || '';
    this.json = segment.json || '';
    this.updateDate = segment.updateDate || new Date().getTime();
    this.type = segment.type || null;
  }
}
