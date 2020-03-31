import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-directions',
  templateUrl: './directions.component.html',
  styleUrls: ['./directions.component.css']
})
export class DirectionsComponent implements OnInit {

  @Input() directions: string[];

  constructor() { }

  ngOnInit() {
  }

}
