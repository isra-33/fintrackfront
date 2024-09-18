import { Component } from '@angular/core';
import { FormGroup, FormControl , FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Router ,ActivatedRoute} from '@angular/router';
import { AgentsService } from '../../services/agents.service';
import { ModalComponent } from '../../modal/modal.component';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-agent-list',
  standalone: true,
  imports: [NgxPaginationModule,ModalComponent,ReactiveFormsModule,FormsModule],
  templateUrl: './agent-list.component.html',
  styleUrl: './agent-list.component.css'
})
export class AgentListComponent {

  public isModalOpen = false;
  buttonValue:string=''
  agentList: any[] = [];
  selectedAgent: any;
  p:number = 1;
  total : number = 0

  agentToAdd = new FormGroup({
    agentName: new FormControl(''),
    agentEmail: new FormControl('')
  })

  constructor(private router: Router,
    private route: ActivatedRoute,
    private agentService: AgentsService) 
  {}

  navigateTo(id: number, editMode = false) {
    this.router.navigateByUrl(`/agent/details/${id}?edit_mode=${editMode}`);
  }
  closeModal() {
    this.isModalOpen = false;
  }
  fetchAgents(): void {
    this.agentService.getAllAgents().subscribe({
      next: (data: any) => {
        this.agentList = data;
        this.total=data.total;

      }
    })
  }
  pageChangeEvent(event: number){
    this.p = event;
    this.fetchAgents();
}
  ngOnInit(): void {
    this.fetchAgents();
  }
  openModal(buttonValue: string,item: any) {
    this.buttonValue = buttonValue;
    this.isModalOpen = true;
    if (buttonValue === 'remove' && item) {
      this.selectedAgent = item;
  }
  }
  onSubmit() {
    console.log("onsubmit");
    console.log(this.agentToAdd.value);

    this.agentService.save(this.agentToAdd.value).subscribe(
        resp => {
            this.closeModal();
            this.fetchAgents(); 
        }
    );
  }
  confirmRemove(item:any,){
    this.selectedAgent=item;
    var currentId=this.selectedAgent.id
    this.onRemove(currentId);
    this.closeModal();
    this.fetchAgents(); 
}
  onRemove(id: number) {
  this.agentService.deleteAgent(id.toString()).subscribe(
    resp => {
      const indexToRemove = this.agentList.findIndex(agent => agent.id === id);
      if (indexToRemove !== -1) {
        this.agentList.splice(indexToRemove, 1);
        console.log(`Agent with ID ${id} removed successfully.`);
      } else {
        console.log(`Agent with ID ${id} not found.`);
      }
    }
  );
}
  cancel(){
  this.closeModal();
}
}