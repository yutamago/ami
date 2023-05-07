import { TestBed } from '@angular/core/testing';

import { ElectronService } from './electron.service';
import {initMatIconsForSpec} from "../../../test.util";

describe('ElectronService', () => {

  beforeEach(() => TestBed.configureTestingModule({}));
  initMatIconsForSpec();

  it('should be created', () => {
    const service: ElectronService = TestBed.get(ElectronService);
    expect(service).toBeTruthy();
  });
});
