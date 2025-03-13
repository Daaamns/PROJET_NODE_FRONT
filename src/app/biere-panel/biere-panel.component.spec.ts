import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BierePanelComponent } from './biere-panel.component';

describe('BierePanelComponent', () => {
  let component: BierePanelComponent;
  let fixture: ComponentFixture<BierePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BierePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BierePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
