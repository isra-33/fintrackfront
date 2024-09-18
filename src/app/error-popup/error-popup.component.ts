import { Component,EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-error-popup',
  standalone: true,
  imports: [],
  templateUrl: './error-popup.component.html',
  styleUrl: './error-popup.component.css'
})
export class ErrorPopupComponent {

  @Output() close = new EventEmitter<void>();

  modal!: boolean;
  onModalContentClick(event: MouseEvent): void {
    event.stopPropagation();
  }
  openModal(): void {
    this.modal = !this.modal;
  }

  discard(): void {
    this.close.emit();
  } 
  

}
