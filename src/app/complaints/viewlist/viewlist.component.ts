import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintService } from '../../services/complaint.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrl: './viewlist.component.css',
  standalone: true,
  imports: [ModalComponent, FormsModule, DatePipe, ReactiveFormsModule],
})
export class ViewlistComponent implements OnInit {

  complaintToAdd = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    client: new FormControl(''),
    status: new FormControl(''),
    agent: new FormControl(''),
    description: new FormControl('')
  })

  buttonValue!: string;
  client!: any;
  public isModalOpen = false;
  complaints: any[] = [];
  statuses: string[] = [];
  selectedStatus!: string;
  category: string[] = [];
  selectedCategory!: string;
  clients: any[] = [];
  agents: any[] = [];

  selectedComplaint: any ;
   
  public constructor(private router: Router, private complaintService: ComplaintService) {}

  getCategory(): void {
    this.complaintService.getCategories().subscribe((data: string[]) => {
      this.category = data;
    });
  }

  getClients(): void {
    this.complaintService.getClients().subscribe((data: any[]) => {
      this.clients = data;
    });
  }
  getAgents(): void {
    this.complaintService.getAllAgents().subscribe((data: any[]) => {
      this.agents = data;
    });
  }
  getStatus(): void {
    this.complaintService.getStatuses().subscribe((data: string[]) => {
      this.statuses = data;
    });
  }
  
  fetchComplaints(): void {
    this.complaintService.getComplaints().subscribe({
      next: (data: any) => {
        this.complaints = data;
      }
    })
  }
  
  ngOnInit(): void {
    this.getAgents();
    this.getCategory();
    this.getClients();
    this.getStatus();
    this.fetchComplaints();
  }

  navigateTo(id: number,  editMode = false) {
    this.router.navigateByUrl(`/complaints/details/${id}?edit_mode=${editMode}`);
  }

  openModal(buttonValue: string,item: any) {
    this.buttonValue = buttonValue;
    this.isModalOpen = true;
    if (buttonValue === 'remove' && item) {
      this.selectedComplaint = item;
  }
  }
  
  
  closeModal() {
    this.isModalOpen = false;
  }
  onSubmit() {
    console.log("onsubmit");
    console.log(this.complaintToAdd.value);

    this.complaintService.save(this.complaintToAdd.value).subscribe(
        resp => {
            this.closeModal();
            this.fetchComplaints(); 
        }
    );
  }

  confirmRemove(item:any,){
      this.selectedComplaint=item;
      var currentId=this.selectedComplaint.id
      this.onRemove(currentId);
      this.closeModal();
      this.fetchComplaints(); 
  }
  onRemove(id: number) {
    this.complaintService.deleteData(id.toString()).subscribe(
      resp => {
        const indexToRemove = this.complaints.findIndex(complaint => complaint.id === id);
        if (indexToRemove !== -1) {
          this.complaints.splice(indexToRemove, 1);
          console.log(`Complaint with ID ${id} removed successfully.`);
        } else {
          console.log(`Complaint with ID ${id} not found.`);
        }
      }
    );
  }
  cancel(){
    this.closeModal();
  }
  
  handleSelectChange(event: any, key: string): void {
    const value = event.target.value;
    this.complaintToAdd.patchValue({ [key]: value });
  }
}
