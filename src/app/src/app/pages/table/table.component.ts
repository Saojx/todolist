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
  rowIdx: number = 0
  colIdx: number = 0
  constructor() { }

  ngAfterViewInit(): void {
    this.focusInput(0, 0)
  }

  @HostListener('keyup', ['$event']) keyup(event: any) {
    if (event.key === 'Enter') {
      this.focusRight(this.rowIdx, this.colIdx);
    }
    // console.log('keyup', this.rowIdx, this.colIdx)
  }

  focusChange(rowIdx: number, colIdx: number) {
    this.rowIdx = rowIdx;
    this.colIdx = colIdx;
  }

  focusInput(rowIdx: number, colIdx: number) {
    let inputEls = this.inputs.toArray();
    let flatIdx = (rowIdx * this.columns.length) + colIdx;
    if (flatIdx < (this.columns.length * this.rows.length)) {
      inputEls[flatIdx].nativeElement.focus();
    } else {
      this.focusInput(0, 0)
    }
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
    this.rowIdx = rowIdx;
    this.colIdx = colIdx;
    this.focusInput(rowIdx, colIdx);
  }
}
