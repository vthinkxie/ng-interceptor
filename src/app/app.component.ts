import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ng-interceptor';

  constructor(private httpClient: HttpClient) {
    this.httpClient.get('./assets/data.json').subscribe(data => {
      console.log(data);
    });
  }
}
