import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-data-form',
  templateUrl: './data-form.component.html',
  styleUrls: ['./data-form.component.scss'],
  host: { class: 'data-form' }
})
export class DataFormComponent implements OnInit, AfterViewInit {

  dataForm!: FormGroup;
  constructor(private _fb: FormBuilder, private _ds: DataService, private _ar: ActivatedRoute, @Inject('cropData') private cropData: any = null) {
    console.log("this.cropData", this.cropData)
  }
  ngOnInit(): void {
    console.log("this.cropData", this.cropData)

    this.dataForm = this._fb.group({
      wheat: [0, [Validators.required]],
      rice: [0, [Validators.required]],
      maize: [0, [Validators.required]],
      millets: [0, [Validators.required]],
      pulses: [0, [Validators.required]]
    })
  }

  ngAfterViewInit(): void {
    this._ar.params.subscribe({
      next: (a: Params) => {
        console.log(a)
      }
    })
  }

  dataFormProcess() {
    if (this.dataForm.status == "INVALID") return;
    let dataFormVal = this.dataForm.value;
    console.log("dataFormVal", dataFormVal);

    this._ds.setCropsData(this.cropData.state, this.cropData.city, dataFormVal)
  }
}
