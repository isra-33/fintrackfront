import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientsService } from '../../services/clients.service';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.css',
  standalone: true,
  imports: [NgxPaginationModule,ModalComponent,FormsModule,DatePipe,ReactiveFormsModule]
})
export class ClientListComponent implements OnInit{
  
  public isModalOpen = false;
  clients: any[] = [];
  complaintList:any[] = [];
  selectedClient: any ;

  clientToAdd = new FormGroup({
    clientName: new FormControl(''),
    clientMail: new FormControl(''),
    tel: new FormControl(''),
  })

  p:number = 1;
  total : number = 0
  buttonValue!:string;

  public constructor(private router: Router, private clientService: ClientsService) {}
  ngOnInit(): void {
    this.fetchClients();
  
  }
  navigateTo(id: number, editMode = false) {
    this.router.navigateByUrl(`/clients/details/${id}?edit_mode=${editMode}`);
  }
  
  openModal(buttonValue: string,item: any) {
    this.buttonValue = buttonValue;
    this.isModalOpen = true;
    if (buttonValue === 'remove' && item) {
      this.selectedClient = item;
  }
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSave(){console.log(`New Client : ${JSON.stringify(this.clientToAdd)}`);
    this.closeModal();};

  fetchClients(): void {
    this.clientService.getAllClients().subscribe({
      next: (data: any) => {
        this.clients = data;
        this.total=data.total;
      }
    })
  }
  pageChangeEvent(event: number){
    this.p = event;
    this.fetchClients();
}
  getComplaintlist(): void {
    this.clientService.getComplaints().subscribe((data: any[]) => {
      this.complaintList = data;
      //console.log(data);
    });
  }

  onSubmit() {
    console.log("onsubmit");
    console.log(this.clientToAdd.value);

    this.clientService.save(this.clientToAdd.value).subscribe(
        resp => {
            this.closeModal();
            this.fetchClients(); 
        }
    );
  }

  confirmRemove(item:any,){
      this.selectedClient=item;
      var currentId=this.selectedClient.id
      this.onRemove(currentId);
      this.closeModal();
      this.fetchClients(); 
  }
  onRemove(id: number) {
    this.clientService.deleteClient(id.toString()).subscribe(
      resp => {
        const indexToRemove = this.clients.findIndex(client => client.id === id);
        if (indexToRemove !== -1) {
          this.clients.splice(indexToRemove, 1);
          console.log(`Client with ID ${id} removed successfully.`);
        } else {
          console.log(`Client with ID ${id} not found.`);
        }
      }
    );
  }
  cancel(){
    this.closeModal();
  }
}
