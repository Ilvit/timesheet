import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataStateEnum, Project } from 'src/app/models/timesheet.model';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectFormGroup!:FormGroup;
  projects!:Project[];
  project!:Project;
  projectsDataState!:DataStateEnum;
  projectDataState!:DataStateEnum;
  readonly DataStateEnum=DataStateEnum;

  constructor(private timesheetService:FtimesheetService, private fb:FormBuilder){}

  ngOnInit(): void {
    this.getAllProjects();
  }
  getAllProjects(){
    this.projectsDataState=DataStateEnum.LOADING;
    this.projectDataState=DataStateEnum.NONE
    this.timesheetService.getAllProjects().subscribe({
      next:data=>{
        this.projectsDataState=DataStateEnum.LOADED;
        this.projectDataState=DataStateEnum.READ;
        this.projects=data;        
      }, error:err=>alert('Can not get the projects')
    })
  }
  getProject(id:number){
    this.projectDataState=DataStateEnum.LOADING
    this.timesheetService.getProject(id).subscribe({
      next:data=>{
        this.projectDataState=DataStateEnum.READ
        this.project=data;
      },error:err=>{
        this.projectDataState=DataStateEnum.ERROR
        console.log(err)
      }
    })
  }
  editProject(id:number){
    this.projectDataState=DataStateEnum.LOADING;
    this.timesheetService.getProject(id).subscribe({
      next:data=>{
        this.projectDataState=DataStateEnum.EDITING;
        this.project=data;
        this.projectFormGroup=this.fb.group({
          id:this.fb.control(data.id),
          name:this.fb.control(data.name),
          description:this.fb.control(data.description)
        })
      }, error:err=>{
        this.projectDataState=DataStateEnum.ERROR
        alert(err)
      }
    })
  }
  getNewProject(){
    this.projectDataState=DataStateEnum.LOADING
    this.timesheetService.getNewProject().subscribe({
      next:data=>{
        this.projectDataState=DataStateEnum.ADDNEW
        this.project=data;
        this.projectFormGroup=this.fb.group({
          name:this.fb.control(""),
          description:this.fb.control("")
        })
      }, error:err=>{
        this.projectDataState=DataStateEnum.ERROR
        alert(err)
      }
    })
  }
  updateProject(){
    this.projectsDataState=DataStateEnum.LOADING;
    this.timesheetService.updateProject(this.projectFormGroup.value).subscribe({
      next:data=>{
        this.projectsDataState=DataStateEnum.LOADED;
        this.projectDataState=DataStateEnum.READ;
        this.projects=data;
      }, error:err=>{
        this.projectDataState=DataStateEnum.ERROR;
        alert("Can not update the project")
      }
    })
  }
  addNewProject(){
    this.projectsDataState=DataStateEnum.LOADING;
    this.timesheetService.saveProject(this.projectFormGroup.value).subscribe({
      next:data=>{
        this.projectsDataState=DataStateEnum.LOADED;
        this.projectDataState=DataStateEnum.READ;
        this.projects=data;
      }, error:err=>{
        this.projectDataState=DataStateEnum.ERROR;
        alert("Can not add the project")
      }
    })
  }
  deleteProject(id:number){
    if(confirm('Do you want to delete the project ?')){
      this.projectsDataState=DataStateEnum.LOADING
      this.timesheetService.deleteProject(id).subscribe({
        next:data=>{
          this.projectsDataState=DataStateEnum.LOADED;
          this.projectDataState=DataStateEnum.READ;
          this.projects=data
        }, error:err=>{
          this.projectsDataState=DataStateEnum.ERROR;
          alert('Can not get the projects')
        }
      })
    }
  }
}
