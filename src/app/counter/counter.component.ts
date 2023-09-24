import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  @Input() count = 1;
  @Input() dcount = 1;

  @Output() likeCount = new EventEmitter<number>();
  @Output() dislikeCount = new EventEmitter<number>();
  increment() {
    this.count++;
    this.likeCount.emit(this.count);
  }
  decrement() {
    this.dcount++;
    this.dislikeCount.emit(this.dcount);
  }
  totalcount = 100;
  get finalcount() {
    return (this.totalcount % this.count) * 100;
  }
  get tcount() {
    return this.count - this.dcount >= 10;
  }
}
