import { KeyValuePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, map, max, of, startWith } from 'rxjs';
import { DataStateEnum, PeriodState, TimesheetDTO, TimesheetState } from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-faradja-timesheet',
  templateUrl: './faradja-timesheet.component.html',
  styleUrls: ['./faradja-timesheet.component.css']
})
export class FaradjaTimesheetComponent implements OnInit{

  readonly DataStateEnum=DataStateEnum;
  tsDTO!:TimesheetDTO;
  period!:string;
  saving=false;  
  signing=false;
  rdLoading=false;
  hdLoading=false;
  vdLoading=false;
  timesheetState!:TimesheetState
  periodStates!:PeriodState[];
  timesheetDataState!:DataStateEnum;
  timesheetStateDataState!:DataStateEnum;
  
  constructor(private timesheetService:FtimesheetService, private fb:FormBuilder, public authService:AuthenticationService){}

  ngOnInit(): void {        
    this.getTimesheetState();    
  }
  generatePDF(){
    const elementToCapture:any=document.getElementById("ts_report");
    const pdfReport=new jsPDF();
    html2canvas(elementToCapture, {scale:2}).then(canvas=>{
      pdfReport.addImage(canvas.toDataURL("image/png"),"PNG", 5,5,210,100);
      pdfReport.save(this.timesheetState.employee.nickName+' '+this.timesheetState.employee.name+'-'+this.timesheetState.currentPeriod+".pdf");
    })
  }
  getTimesheetState(){
    this.timesheetStateDataState=DataStateEnum.LOADING;
    this.timesheetService.getTimesheetState(this.authService.employeeID).subscribe({
      next:data=>{
        this.timesheetStateDataState=DataStateEnum.LOADED;
        this.timesheetState=data;     
        this.periodStates=data.periodStates;      
      }, error:err=>console.log(err)
    })
  }
  getTimesheet(){
    this.timesheetStateDataState=DataStateEnum.NONE;
    this.timesheetDataState=DataStateEnum.LOADING;
    this.timesheetService.getTimesheet(this.period,this.authService.employeeID).subscribe({
      next:data=>{
        this.timesheetDataState=DataStateEnum.LOADED;
        this.tsDTO=data;
        this.period=data.timesheetPeriod;      
        
      }, error:err=>console.log(err)
    })
  }
  getTimesheetByPeriod(per:string){
    this.timesheetStateDataState=DataStateEnum.NONE;
    this.timesheetDataState=DataStateEnum.LOADING;
    this.timesheetService.getTimesheet(per, this.authService.employeeID).subscribe({
      next:data=>{
        this.timesheetDataState=DataStateEnum.READ;
        this.tsDTO=data;
        this.period=data.timesheetPeriod;      
       
      }, error:err=>console.log(err)
    })
  }
  getNewHolidaysLine(){    
    let selPro=(document.getElementById("selpro2") as HTMLSelectElement).value;
    if(this.tsDTO?.hdProjects.includes(selPro)){
      alert("A holiday timesheetline exists for "+selPro+" project");
    }else {
      this.hdLoading=true;
      this.timesheetService.getNewTimesheetLine(this.period,selPro, this.authService.employeeID,"PUBHDCH-24").subscribe({
        next:data=>{
          this.hdLoading=false;
          this.tsDTO=data;
        }
      })
    }    
  }  
  getNewRegularDaysLine(){    
    let selPro=(document.getElementById("selpro") as HTMLSelectElement).value;
    if(this.tsDTO?.rdProjects.includes(selPro)){
      alert("A regular day timesheetline exists for "+selPro+" project");
    }else{      
      this.rdLoading=true;
      this.timesheetService.getNewTimesheetLine(this.period, selPro ,this.authService.employeeID,"BUSDCH-24").subscribe({
        next:data=>{
          this.rdLoading=false;
          this.tsDTO=data;          
        },error:err=>console.log("there is an error")
      })
    }   
  }
  getNewVacationDaysLine(){
    let selPro=(document.getElementById("selpro3") as HTMLSelectElement).value;
    if(this.tsDTO.vdProjects.includes(selPro)){
      alert("vacation-days timesheetline exists for "+selPro+" project");
    }else{
      this.vdLoading=true
      this.timesheetService.getNewTimesheetLine(this.period, selPro ,this.authService.employeeID,"VACDCH-24").subscribe({
        next:data=>{
          this.vdLoading=false
          this.tsDTO=data;
        },error:err=>console.log("there is an error")
      })
    }   
  }
  
  deleteHolidaysLine(){
    if(confirm("Do you want to delete Holidays of all the projects ?")){
      this.hdLoading=true
      this.timesheetService.deleteTimesheetLine(this.period, this.authService.employeeID,"PUBHDCH-24").subscribe({
        next:data=>{          
          this.hdLoading=false;
          this.tsDTO=data;
        }
      })
    }    
  }
  deleteRegularDaysLine(){
    if(confirm("Do you want to delete Regular-days of all the projects ?")){
      this.rdLoading=true;
      this.timesheetService.deleteTimesheetLine(this.period, this.authService.employeeID,"BUSDCH-24").subscribe({
        next:data=>{          
          this.rdLoading=false
          this.tsDTO=data;
        }
      })
    }    
  }
  deleteVacationDaysLine(){
    if(confirm("Do you want to delete Vacation-days of all the projects ?")){
      this.vdLoading=true;
      this.timesheetService.deleteTimesheetLine(this.period, this.authService.employeeID,"VACDCH-24").subscribe({
        next:data=>{          
        this.vdLoading=false;
          this.tsDTO=data;
        }
      })
    }    
  }
  deleteProjectRegularDaysLine(projectName:string){
    if(confirm("DO you want to delete the "+projectName+" PROJECT Regular timesheet-line ?")){
      this.rdLoading=true;
      this.timesheetService.deleteProjectTimesheetLine(this.period, projectName, this.authService.employeeID,"BUSDCH-24").subscribe({
        next:data=>{
          this.rdLoading=false
          this.tsDTO=data;
        }
      })
    }    
  }
  deleteProjectVacationDaysLine(projectName:string){
    if(confirm("DO you want to delete the "+projectName+" PROJECT Vacation timesheet-line ?")){
      this.vdLoading=true
      this.timesheetService.deleteProjectTimesheetLine(this.period, projectName, this.authService.employeeID,"VACDCH-24").subscribe({
        next:data=>{
          this.vdLoading=false;
          this.tsDTO=data;
        }
      })
    }    
  }
  deleteProjectHolidaysLine(projectName:string){
    if(confirm("Do you want to delete the "+projectName+" PROJECT Holiday timesheet-line ?")){
      this.hdLoading=true;
      this.timesheetService.deleteProjectTimesheetLine(this.period, projectName, this.authService.employeeID,"PUBHDCH-24").subscribe({
        next:data=>{
          this.hdLoading=false
          this.tsDTO=data;
        }
      })
    }    
  }
  getNewTimesheet(){
    this.timesheetDataState=DataStateEnum.LOADING;
    this.timesheetState.canAddNewTimesheet=false;
    this.timesheetService.getNewTimesheet(this.authService.employeeID).subscribe({
      next:data=>{
        this.timesheetDataState=DataStateEnum.LOADED        
        this.tsDTO=data;
        this.period=data.timesheetPeriod;
        this.periodStates=data.periodStates;
      }, error:err=>{
        console.log("Can not load timesheet");
      }
    })
  } 

  saveTimesheet() {
    this.saving=true
    this.timesheetService.saveTimesheet(this.period, this.tsDTO!).subscribe({
      next:data=>{ 
        this.tsDTO=data;
        this.period=data.timesheetPeriod;
        this.saving=false
      },error:err=>console.log(err)
    }) 
  }      

  deleteTimesheet(){
    
  }
  signTimesheet(){
    this.signing=true;
    this.timesheetService.signTimesheet(this.authService.employeeID,this.period).subscribe({
      next:data=>{
        this.tsDTO.timesheet.signed=data;
        this.signing=false;
      },error:err=>console.log("Not signed")
    })
  }   

}
