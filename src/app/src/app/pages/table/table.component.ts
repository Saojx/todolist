import { Component, HostListener, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @ViewChildren('inputs') inputs: any = [];
  columns: Array<any> = Array(5).fill('')
  rows: Array<any> = Array(5).fill('')
  constructor() { }

  ngAfterViewInit(): void {
    this.focusInput(0, 0)
  }

  @HostListener('keyup', ['$event']) keyup(event: any) {
  }

  focusInput(rowIdx: number, colIdx: number) {
    let inputEls = this.inputs.toArray();
    let flatIdx = (rowIdx * this.columns.length) + colIdx;
    inputEls[flatIdx].nativeElement.focus();
  }


  focusDown(rowIdx: number, colIdx: number) {
    rowIdx = Math.min(rowIdx + 1, this.rows.length - 1);
    this.focusInput(rowIdx, colIdx);
  }

  focusUp(rowIdx: number, colIdx: number) {
    rowIdx = Math.max(0, rowIdx - 1);
    this.focusInput(rowIdx, colIdx);
  }

  focusLeft(rowIdx: number, colIdx: number) {
    colIdx = colIdx - 1
    this.focusInput(rowIdx, colIdx);
  }

  focusRight(rowIdx: number, colIdx: number) {
    colIdx = colIdx + 1
    this.focusInput(rowIdx, colIdx);
  }
}
