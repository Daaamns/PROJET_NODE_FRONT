import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandePanelComponent } from './commande-panel.component';

describe('CommandePanelComponent', () => {
  let component: CommandePanelComponent;
  let fixture: ComponentFixture<CommandePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommandePanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommandePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
