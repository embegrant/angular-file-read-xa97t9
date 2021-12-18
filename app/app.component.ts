import { Component } from '@angular/core';
import { forEach } from '@angular/router/src/utils/collection';
import { Observable, Subject } from 'rxjs';
import { RainCache } from './rain-cache.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fileContent: string;
  lines: string[];
  words: string[];
  numFound: number = 0;
  myData: RainCache[] = [
    {
      id: 2442,
      site: 'NW_STL2_PX',
      sdate: '2021-12-10T00:00:00',
      amount: 0,
      state: 'N',
      formOrder: 3780,
    },
    {
      id: 245,
      site: 'CCCT-FAWNG',
      sdate: '2021-12-10T00:00:00',
      amount: 0.15,
      state: 'N',
      formOrder: 3810,
    },
    {
      id: 2409,
      site: 'GRS-FAWNG',
      sdate: '2021-12-10T00:00:00',
      amount: 0,
      state: 'N',
      formOrder: 3840,
    },
    {
      id: 2406,
      site: 'N_LEE_PX',
      sdate: '2021-12-10T00:00:00',
      amount: 0,
      state: 'N',
      formOrder: 3870,
    },
    {
      id: 2375,
      site: 'LEHI',
      sdate: '2021-12-10T00:00:00',
      amount: 0.01,
      state: 'N',
      formOrder: 3900,
    },
    {
      id: 2391,
      site: 'MANN-COO',
      sdate: '2021-12-10T00:00:00',
      amount: 0,
      state: 'N',
      formOrder: 5410,
    },
    {
      id: 2392,
      site: 'MARCO',
      sdate: '2021-12-10T00:00:00',
      amount: 0,
      state: 'N',
      formOrder: 4300,
    },
    {
      id: 2393,
      site: 'MCO-NWS',
      sdate: '2021-12-10T00:00:00',
      amount: 0,
      state: 'N',
      formOrder: 5350,
    },
    {
      id: 2394,
      site: 'MFH40_PX',
      sdate: '2021-12-10T00:00:00',
      amount: 0.03,
      state: 'N',
      formOrder: 1240,
    },
    {
      id: 2609,
      site: 'WTEP_PL-LEE',
      sdate: '2021-12-10T00:00:00',
      amount: 0,
      state: 'N',
      formOrder: 3890,
    },
    {
      id: 2610,
      site: 'YELLOWF-LEE',
      sdate: '2021-12-10T00:00:00',
      amount: 0.01,
      state: 'N',
      formOrder: 3860,
    },
  ];

  public onChange(fileList: FileList): void {
    let file = fileList[0];
    let self = this;

    this.readFile(file).subscribe((output) => {
      console.log(output);
    });

    this.readFile(file).subscribe((result) => {
      this.fileContent = result;
      this.lines = self.fileContent.split(/\r?\n/);
      console.log('Lines');
      console.log(this.lines);

      for (let line of this.lines) {
        this.words = line.trimEnd().split(/\ +/);

        if (this.words[0] != '') {
          //console.log('Words:');
          //console.log(this.words);
          this.updateArray(this.words[0], this.words[1], Number(this.words[2]));
        }
      }
    });
  }

  readFile(file: File): Observable<string> {
    const sub = new Subject<string>();
    var reader = new FileReader();

    reader.onload = () => {
      const content: string = reader.result as string;
      sub.next(content);
      sub.complete();
    };

    reader.readAsText(file);
    return sub.asObservable();
  }

  public updateArray(site: string, rdate: string, amt: number) {
    //console.log(this.myData);

    let recNum = this.myData.findIndex((x) => x.site == site);
    if (recNum >= 0) {
      this.numFound += 1;
      console.log(
        `${this.numFound}: Found record for ${site} with index = ${recNum}`
      );
      this.myData[recNum].amount = amt;
      this.myData[recNum].sdate = new Date(
        Number(rdate.substring(0, 4)),
        Number(rdate.substring(4, 6)),
        Number(rdate.substring(6))
      ).toLocaleDateString();
      console.log(
        `Date = ${rdate.substring(0, 4)}/
        ${rdate.substring(4, 6)}/${rdate.substring(6)}`
      );
    } else {
      console.log(`No record found for ${site}`);
    }
  }
}
