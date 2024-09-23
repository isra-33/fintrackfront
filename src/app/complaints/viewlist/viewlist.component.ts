import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ModalComponent } from '../../modal/modal.component';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComplaintService } from '../../services/complaint.service';
import { DatePipe } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.css'],
  standalone: true,
  imports: [NgxPaginationModule, ModalComponent, FormsModule, DatePipe, ReactiveFormsModule],
})
export class ViewlistComponent implements OnInit {

  complaintToAdd = new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    client: new FormControl(''),
    status: new FormControl(''),
    agent: new FormControl(''),
    description: new FormControl('')
  });

  buttonValue!: string;
  selectedComplaint: any;
  public isModalOpen = false;
  complaints: any[] = [];
  statuses: string[] = [];
  category: string[] = [];
  clients: any[] = [];
  agents: any[] = [];
  p: number = 1;
  total: number = 0;
  agentId: any; // To store logged-in agent's ID

  constructor(
    private router: Router,
    private complaintService: ComplaintService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.agentId = this.authService.getAgentId(); // Retrieve agent ID on initialization

    if (this.agentId) {
      this.getAgents();
      this.getCategory();
      this.getClients();
      this.getStatus();
      this.fetchComplaintsBasedOnRole(); 
    } else {
      console.error('Agent ID is not available. Redirecting to login.');
      this.router.navigate(['/login']);
    }
  }

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
        this.total = data.total;
      }
    });
  }
  fetchAssignedComplaints(): void {
    this.complaintService.getAssignedComplaints(this.agentId).subscribe({
      next: (data: any) => {
        this.complaints = data;
        this.total = data.total; 
      },
      error: (err) => {
        console.error('Error fetching assigned complaints', err);
      }
    });
  }
  fetchComplaintsBasedOnRole(): void {
    const role = this.authService.getRole();
    const agentId = this.authService.getAgentId();

    if (role === 'ADMIN' || role === 'DECLARING_AGENT') {
      this.fetchComplaints();
    } else if (role === 'ASSIGNED_AGENT' && agentId) {
      this.fetchAssignedComplaints();
    } else {
      console.error('Invalid role or agent ID');
    }
  }
  pageChangeEvent(event: number) {
    this.p = event;
    this.fetchComplaintsBasedOnRole(); // Fetch complaints for the new page
  }

  navigateTo(id: number, editMode = false) {
    this.router.navigateByUrl(`/complaints/details/${id}?edit_mode=${editMode}`);
  }

  openModal(buttonValue: string, item: any) {
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
    this.complaintService.save(this.complaintToAdd.value).subscribe(resp => {
      this.closeModal();
      this.fetchComplaintsBasedOnRole(); // Refresh the complaints list after submission
    });
  }

  confirmRemove(item: any) {
    this.selectedComplaint = item;
    this.onRemove(this.selectedComplaint.id);
    this.closeModal();
    this.fetchComplaintsBasedOnRole(); // Refresh the complaints list after removal
  }

  onRemove(id: number) {
    this.complaintService.deleteData(id.toString()).subscribe(resp => {
      const indexToRemove = this.complaints.findIndex(complaint => complaint.id === id);
      if (indexToRemove !== -1) {
        this.complaints.splice(indexToRemove, 1);
        console.log(`Complaint with ID ${id} removed successfully.`);
      } else {
        console.log(`Complaint with ID ${id} not found.`);
      }
    });
  }

  cancel() {
    this.closeModal();
  }

  handleSelectChange(event: any, key: string): void {
    const value = event.target.value;
    this.complaintToAdd.patchValue({ [key]: value });
  }
}
