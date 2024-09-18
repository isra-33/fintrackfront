import { Component,EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  standalone: true,
})
export class ModalComponent {  
  
  @Output() close = new EventEmitter<void>();

  @Output() save = new EventEmitter<void>();


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
  
  onSave(): void{
    this.save.emit();
  }

}