import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable , Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopographyService implements OnInit {
  public am = new Subject<any>();
constructor(private http: HttpClient) {
  this.data_insurer = [
    {
      "name": "Insurer 1",
      "value": 21
    },
    {
      "name": "Insurer 2",
      "value": 35
    },
    {
      "name": "Insurer 3",
      "value": 7
    },
    {
      "name": "Insurer 4",
      "value": 18
    },
    {
      "name": "Insurer 5",
      "value": 29
    },
    {
      "name": "Insurer 6",
      "value": 25
    },
    {
      "name": "Insurer 7",
      "value": 13
    },
    {
      "name": "Insurer 8",
      "value": 34
    },
    {
      "name": "Insurer 9",
      "value": 17
    },
    {
      "name": "Insurer 10",
      "value": 65
    },
    {
      "name": "Insurer 11",
      "value": 21
    },
    {
      "name": "Insurer 12",
      "value": 35
    },
    {
      "name": "Insurer 13",
      "value": 7
    },
    {
      "name": "Insurer 14",
      "value": 18
    },
    {
      "name": "Insurer 15",
      "value": 29
    },
    {
      "name": "Insurer 16",
      "value": 25
    },
    {
      "name": "Insurer 17",
      "value": 13
    },
    {
      "name": "Insurer 18",
      "value": 34
    },
    {
      "name": "Insurer 19",
      "value": 17
    },
    {
      "name": "Insurer 20",
      "value": 65
    },
  ]
  this.data_policy_complaint = [
    {
      "name": "Health",
      "series": [
        {
          "name": "Claim",
          "value": 352
        },
        {
          "name": "Coverage",
          "value": 1
        },
        {
          "name": "Others",
          "value": 1
        },
        {
          "name": "Policy Related",
          "value": 1
        },
        {
          "name": "Policy Servicing",
          "value": 2
        },
        {
          "name": "Premium",
          "value": 3
        },
        {
          "name": "Refund",
          "value": 2
        },
        {
          "name": "Survival Claims",
          "value": 3
        },
      ]
    },
    {
      "name": "Life",
      "series": [
        {
          "name": "Death Claims",
          "value": 5
        },
        {
          "name": "Others",
          "value": 36
        },
        {
          "name": "Policy Servicing",
          "value": 41
        },
        {
          "name": "Proposal Processing",
          "value": 1
        },
        {
          "name": "Survival Claims",
          "value": 18
        },
        {
          "name": "Unfair Business Practices",
          "value": 53
        }
      ]
    },
    {
      "name": "Motor",
      "series": [
        {
          "name": "Claim",
          "value": 3
        },
        {
          "name": "Others",
          "value": 2
        },
        {
          "name": "Policy Related",
          "value": 3
        }
      ]
    },
    {
      "name": "Others",
      "series": [
        {
          "name": "Claim",
          "value": 35
        },
        {
          "name": "Coverage",
          "value": 1
        },
        {
          "name": "Death Claims",
          "value": 5
        },
        {
          "name": "Others",
          "value": 12
        },
        {
          "name": "Policy Related",
          "value": 1
        },
        {
          "name": "Policy Servicing",
          "value": 3
        },
        {
          "name": "Refund",
          "value": 1
        },
        {
          "name": "Survival Claims",
          "value": 9
        },
        {
          "name": "ULIP Related",
          "value": 2
        },
        {
          "name": "Unfair Business Practices",
          "value": 3
        }
      ]
    }
  ];
  this.data_lob = [
    {
      "name": "Health",
      "value": 411
    },
    {
      "name": "Life",
      "value": 154
    },
    {
      "name": "Motor",
      "value": 11
    },
      {
      "name": "Others",
      "value": 72
    }
  ];
  this.data_geo = [
    { name: 'Andaman & Nicobar Islands', value: 4 },
    { name: 'Andhra Pradesh', value: 29 },
    { name: 'Assam', value: 4 },
    { name: 'Bihar', value: 7 },
    { name: 'Chattisgarh', value: 8 },
    { name: 'Delhi', value: 57 },
    { name: 'Gujarat', value: 85 },
    { name: 'Haryana', value: 25 },
    { name: 'Himachal Pradesh', value: 1 },
    { name: 'Jammu & Kashmir', value: 1 },
    { name: 'Jharkand', value: 11 },
    { name: 'Karnataka', value: 27 },
    { name: 'Kerala', value: 19 },
    { name: 'Madhya Pradesh', value: 23 },
    { name: 'Maharastra', value: 19 },
    { name: 'Orissa', value: 9 },
    { name: 'Punjab', value: 8 },
    { name: 'Rajasthan', value: 23 },
    { name: 'Tamil Nadu', value: 48 },
  ];
  this.data_rejects =  [
    {
      "name": "Health",
      "value": 125
    },
    {
      "name": "Life",
      "value": 78
    },
    {
      "name": "Motor",
      "value": 5
    },
      {
      "name": "Others",
      "value": 35
    }
  ];
  this.data_claims =  [
    {
      "name": "Health",
      "value": 789
    },
    {
      "name": "Life",
      "value": 215
    },
    {
      "name": "Motor",
      "value": 43
    },
      {
      "name": "Others",
      "value": 289
    }
  ];
  this.data_complaint_int =  [

{
  "name": "TPA7",
  "value": 789
},
{
  "name": "WA13",
  "value": 789
},
{
  "name": "WA3",
  "value": 789
},
    {
      "name": "B2",
      "value": 789
    },
    {
      "name": "TPA15",
      "value": 215
    },
    {
      "name": "TPA17",
      "value": 43
    },
      {
      "name": "TPA21",
      "value": 289
    }
  ];
}
data_insurer:any = [];
data_policy_complaint:any = [];
data_lob:any = [];
data_geo:any = [];
data_rejects:any[] = [];
data_claims:any = [];
data_complaint_int:any = [];
  ngOnInit(): void {}
  getChartData=()=>{
    let rr = {
      insurer : this.data_insurer,
      policy_complaint : this.data_policy_complaint,
      lob : this.data_lob,
      geo : this.data_geo,
      rejects : this.data_rejects,
      claims : this.data_claims
    }
    return rr;
  }
  genRandInsurer=()=>{
    let a:any = [];
    this.data_insurer.map((d:any, i:number) => {
      let r = d;
      r.value = Math.round(Math.random()*100);
      a.push(r);
    });
    return a;
  }
  genRandPolicyComplaint=()=>{
    let a:any = [];
    this.data_policy_complaint.map((d:any, i:number)=>{
      let r = d;
      //r.value = Math.round(Math.random()*100);
      //a.push(d);
     // let b:any = [];
      r.series.map((w:any)=>{
        w.value = Math.round(Math.random()*100);
       // b.push(w);
      });

      a.push(r);
    });
    return a;
  }
  genRandComplaintInt=()=>{

  }
  genRandRejects=()=>{
   let a:any = [];
    this.data_rejects.map((d:any, i:number)=>{
      let r = d;
      r.value = Math.round(Math.random()*100);
      a.push(r);
    });
    return a;
  }
  genRandClaims=()=>{
    let a:any = [];
    this.data_claims.map((d:any, i:number)=>{
      let r = d;
      r.value = Math.round(Math.random()*100);
      a.push(r);
    });
    return a;
  }
  genRandLob=()=>{
    let a:any = [];
    this.data_lob.map((d:any, i:number)=>{
      let r = d;
      r.value = Math.round(Math.random()*100);
      a.push(r);
    });
    return a;
  }
  genRandGeo=()=>{
    let a:any = [];
    this.data_geo.map((d:any, i:number)=>{
      let r = d;
      r.value = Math.round(Math.random()*100);
      a.push(r);
    });
    return a;
  }
  
  getTopographyData(mapData:any): Observable<any> {
    const topoDataURL = mapData;
    return this.http.get(topoDataURL);
  }
}