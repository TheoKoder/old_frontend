
export interface readerData {
    last_seen: string;
    prev_seen?: Date;
    Tag: string;
    Location: string;
    Antenna: string;
    Floor: string;
}


export class DataMgr {
  sortedData: readerData[];
  min: number;
  max: number;
  startOffSetDay: number = 2;
  endOffSetDay: number = 2;
  labels: string[] = [];

  constructor(data: readerData[]){
    let v = data.sort((a,b) => new Date(a.last_seen).getTime() - new Date(b.last_seen).getTime());
    let startOffSet = 1000 * 60 * 60 * 24 * this.startOffSetDay;
    let endOffSet = 1000 * 60 * 60 * 24 * this.endOffSetDay;
    for(let i=0; i < v.length; i++){
      if (i==0){
        var startDate = new Date(new Date(v[i].last_seen).getTime()-startOffSet)
        v[i].prev_seen = startDate;
      } else {
        v[i].prev_seen = new Date(v[i-1].last_seen)
      }
    }
    this.sortedData = v;
    this.print();
    this.min = Math.min(...this.sortedData.map((rd) => new Date(rd.last_seen).getTime()-startOffSet));
    this.max = Math.max(...this.sortedData.map((rd) => new Date(rd.last_seen).getTime()+endOffSet));


    // TODD: Fix labels so there is no duplicates, need to check when it occurs
    for(var i=0; i < this.sortedData.length; i++){
      console.log(this.sortedData[i].Location)
      this.labels.push(this.sortedData[i].Location)
    }
  }
  print(){
    for(let i=0; i < this.sortedData.length; i++){
      console.log("Processing item: " + i)
      console.log(this.sortedData[i].prev_seen)
      console.log(this.sortedData[i].prev_seen?.getTime())
      console.log(this.sortedData[i].last_seen)
      console.log(new Date (this.sortedData[i].last_seen).getTime())
    }
  }
  getDataSets(){
    let cnt : number = 0;
    const datasets = this.sortedData.map((rd) => {
      let start = rd.prev_seen?.getTime();
      let end = new Date(rd.last_seen).getTime();

      var data = Array(this.labels.length).fill(null);
      var idx: number = this.labels.indexOf(rd.Location);
      console.log("index " + idx)
      console.log(cnt)
      while (cnt != idx || idx == -1){
         idx = this.labels.indexOf(rd.Location,idx+1);
         console.log("index " + idx);
         console.log("cnt " + cnt);
      }
      if (idx != -1){
        data[idx] = [start,end];
      }
      cnt++;
      
      return {
        label: rd.Location,
        data: data,
        idx: idx
      }

    })
    return datasets
  }

}
