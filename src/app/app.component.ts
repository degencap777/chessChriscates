import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  public bayes = `P(A|B) = \\frac{P(A|B) \\cdot P(A)}{P(B)}`;

  constructor() {

  }

  ngOnInit() {
    
  }

}
