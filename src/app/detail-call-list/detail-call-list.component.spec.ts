import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCallListComponent } from './detail-call-list.component';

describe('DetailCallListComponent', () => {
  let component: DetailCallListComponent;
  let fixture: ComponentFixture<DetailCallListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCallListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCallListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
