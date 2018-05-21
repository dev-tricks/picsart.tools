import { SegmentsModule } from './segments.module';

describe('SegmentsModule', () => {
  let segmentsModule: SegmentsModule;

  beforeEach(() => {
    segmentsModule = new SegmentsModule();
  });

  it('should create an instance', () => {
    expect(segmentsModule).toBeTruthy();
  });
});
