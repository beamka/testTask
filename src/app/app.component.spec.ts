import {AppComponent} from './app.component';

describe('AppComponent', () => {
  it('Should create the App', () => {
    const fixture = new AppComponent();
    expect(fixture.title).toEqual('TestTask');
  });
});

