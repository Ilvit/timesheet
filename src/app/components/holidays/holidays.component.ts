import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { DataStateEnum, Holiday } from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  title:string="Holidays-Panel";
  holidays!:Holiday[]
  hdToEdit!:Holiday;
  editFormGroup!:FormGroup;
  readonly DataStateEnum=DataStateEnum;
  holidayStateEnum!:DataStateEnum;
  holidaysStateEnum!:DataStateEnum;
  description!:string;

  constructor(private authService:AuthenticationService, private timesheetService:FtimesheetService,
    private fb:FormBuilder){}

  ngOnInit(): void {
    this.getHolidays();    
  }
  getHolidays(){
    this.holidaysStateEnum=DataStateEnum.LOADING;
    this.timesheetService.getHolidays().subscribe({
      next:data=>{
        this.holidaysStateEnum=DataStateEnum.LOADED
        this.holidays=data
      },error:err=>{
        this.holidaysStateEnum=DataStateEnum.ERROR
        console.log(err)
      }
    })
  }
  editHoliday(hd:Holiday){
    this.timesheetService.getHoliday(hd.id).subscribe({
      next:hdtoedit=>{
        this.holidayStateEnum=DataStateEnum.EDITING;
        this.hdToEdit=hd;
        this.editFormGroup=this.fb.group({
          id:this.fb.control(this.hdToEdit.id),
          date:this.fb.control(this.hdToEdit.date),
          description:this.fb.control(this.hdToEdit.description)
        })
      }
    })
  }

  addNewHoliday(){
    this.holidayStateEnum=DataStateEnum.ADDNEW;
    this.timesheetService.getNewHoliday().subscribe({
      next:hday=>{
        this.editFormGroup=this.fb.group({
          date:this.fb.control(hday.date),
          description:this.fb.control(hday.description)
        })  
      }
    })
  }
  describe(holiday:Holiday){
    this.holidayStateEnum=DataStateEnum.READ;
    this.description=holiday.date+": "+holiday.description;
  }
  saveHoliday(){
    this.holidaysStateEnum=DataStateEnum.NONE;
    this.timesheetService.saveHoliday(this.editFormGroup.value).subscribe({
      next:data=>{
        this.holidays=data;
      },error:err=>{
        this.holidaysStateEnum=DataStateEnum.ERROR
        console.log(err)
      }
    })
  }
  updateHoliday(){
    this.holidaysStateEnum=DataStateEnum.LOADING;
    this.timesheetService.updateHoliday(this.editFormGroup.value).subscribe({
      next:data=>{
        this.holidaysStateEnum=DataStateEnum.LOADED
        this.holidays=data
      },error:err=>{
        this.holidaysStateEnum=DataStateEnum.ERROR
        console.log(err)
      }
    })
  }
  deleteHoliday(holiday:Holiday){
    this.holidaysStateEnum=DataStateEnum.LOADING;
    this.timesheetService.deleteHoliday(holiday).subscribe({
      next:data=>{
        this.holidaysStateEnum=DataStateEnum.LOADED
        this.holidays=data
      },error:err=>{
        this.holidaysStateEnum=DataStateEnum.ERROR
        console.log(err)
      }
    })
  }
}
