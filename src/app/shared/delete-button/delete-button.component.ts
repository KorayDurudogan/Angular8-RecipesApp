import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.css']
})
export class DeleteButtonComponent implements OnInit {

  @Output() deleteClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  deleteItem() {
    this.deleteClick.emit();
  }
}
