import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-edit-button',
  templateUrl: './edit-button.component.html',
  styleUrls: ['./edit-button.component.css']
})
export class EditButtonComponent implements OnInit {

  @Output() editClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

  editItem() {
    this.editClick.emit();
  }
}
