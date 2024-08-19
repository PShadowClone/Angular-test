import { TestBed } from '@angular/core/testing';

import {FormService} from './form-service.service';

describe('FormService', () => {
  let service: FormService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService<any>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
