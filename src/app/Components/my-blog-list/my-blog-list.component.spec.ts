import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBlogListComponent } from './my-blog-list.component';

describe('MyBlogListComponent', () => {
  let component: MyBlogListComponent;
  let fixture: ComponentFixture<MyBlogListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBlogListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBlogListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
