import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, catchError, map, of, startWith } from 'rxjs';
import { AppDataState, DataStateEnum, Holiday, HolidayDataState, HolidayStateEnum } from 'src/app/models/timesheet.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FtimesheetService } from 'src/app/services/ftimesheet.service';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.css']
})
export class HolidaysComponent implements OnInit {

  title:string="Holidays-Panel";
  holidays?:Observable<HolidayDataState<Holiday[]>>|null;
  hdToEdit!:Holiday;
  editFormGroup!:FormGroup;
  readonly DataStateEnum=DataStateEnum;
  readonly HolidayStateEnum=HolidayStateEnum;
  holidayStateEnum!:HolidayStateEnum;
  description!:string;

  constructor(private authService:AuthenticationService, private timesheetService:FtimesheetService,
    private fb:FormBuilder){}

  ngOnInit(): void {
    this.getHolidays();    
  }
  getHolidays(){
    this.holidayStateEnum=HolidayStateEnum.NONE;
    this.holidays=this.timesheetService.getHolidays().pipe(
      map(data=>({dataState:DataStateEnum.LOADED,hdays:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  editHoliday(hd:Holiday){
    this.timesheetService.getHoliday(hd.id).subscribe({
      next:hdtoedit=>{
        this.holidayStateEnum=HolidayStateEnum.EDIT;
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
    this.timesheetService.getNewHoliday().subscribe({
      next:hday=>{
        this.holidayStateEnum=HolidayStateEnum.ADDNEW;
        this.editFormGroup=this.fb.group({
          date:this.fb.control(hday.date),
          description:this.fb.control(hday.description)
        })  
      }
    })
  }
  describe(holiday:Holiday){
    this.holidayStateEnum=HolidayStateEnum.READ;
    this.description=holiday.date+": "+holiday.description;
  }
  saveHoliday(){
    this.holidayStateEnum=HolidayStateEnum.NONE;
    this.holidays=this.timesheetService.saveHoliday(this.editFormGroup.value).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,hdays:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  updateHoliday(){
    this.holidayStateEnum=HolidayStateEnum.NONE;
    this.holidays=this.timesheetService.updateHoliday(this.editFormGroup.value).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,hdays:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
  deleteHoliday(holiday:Holiday){
    this.holidayStateEnum=HolidayStateEnum.NONE;
    this.holidays=this.timesheetService.deleteHoliday(holiday).pipe(
      map(data=>({dataState:DataStateEnum.LOADED,hdays:data})),
      startWith({dataState:DataStateEnum.LOADING}),
      catchError(err=>of({dataState:DataStateEnum.ERROR, errorMessage:err.message}))
    );
  }
}
