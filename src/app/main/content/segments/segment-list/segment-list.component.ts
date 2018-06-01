import { DataSource } from '@angular/cdk/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, MatSort } from '@angular/material';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { merge } from 'rxjs';
import { fuseAnimations } from '../../../../../@fuse/animations';
import { FuseUtils } from '../../../../../@fuse/utils';
import { GlobalService } from '../../../../global/services/global.service';
import { Segment } from '../segment';
import { SegmentViewComponent } from '../segment-view/segment-view.component';
import { SegmentsService } from '../segments.service';

@Component({
  selector: 'app-segment-list',
  templateUrl: './segment-list.component.html',
  styleUrls: ['./segment-list.component.scss'],
  animations: fuseAnimations
})
export class SegmentListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  public displayedColumns = ['name', 'id', 'user', 'updateDate', 'actions'];
  public dataSource: FilesDataSource | null;

  private dialogRef: MatDialogRef<SegmentViewComponent>;

  constructor (private segmentsService: SegmentsService,
               private dialog: MatDialog,
               private globalService: GlobalService) { }

  ngOnInit () {
    this.dataSource = new FilesDataSource(this.segmentsService, this.paginator, this.sort);

    this.globalService.searchText
      .subscribe((text: string) => {
        this.dataSource.filter = text;
      });
  }

  public viewSegment (segment: Segment): void {
    this.dialogRef = this.dialog
      .open(SegmentViewComponent, {
        panelClass: 'segment-view-dialog',
        data: {
          segment
        }
      });

    this.dialogRef
      .afterClosed()
      .subscribe((segment: Segment) => {
        if (!segment) {
          return;
        }

        console.log(segment);
      });
  }

  public cloneSegment (segment: Segment) {
    console.log(segment);
  }
}

export class FilesDataSource extends DataSource<any> {
  private _filterChange: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _filteredDataChange: BehaviorSubject<string> = new BehaviorSubject<string>('');

  get filteredData (): any {
    return this._filteredDataChange.value;
  }

  set filteredData (value: any) {
    this._filteredDataChange.next(value);
  }

  get filter (): string {
    return this._filterChange.value;
  }

  set filter (filter: string) {
    this._filterChange.next(filter);
  }

  constructor (private segmentsService: SegmentsService,
               private paginator: MatPaginator,
               private sort: MatSort) {
    super();
    this.filteredData = this.segmentsService.segments;
  }

  connect (): Observable<Segment[]> {
    const displayDataChanges = [
      this.segmentsService.onSegmentsChanged,
      this.paginator.page,
      this._filterChange,
      this.sort.sortChange
    ];

    return merge(...displayDataChanges).pipe(map(() => {
        let data = this.segmentsService.segments.slice();
        data = this.filterData(data);
        this.filteredData = [...data];
        data = this.sortData(data);

        // Grab the page's slice of data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        return data.splice(startIndex, this.paginator.pageSize);
      }
    ));
  }

  filterData (data: Segment[]): Segment[] {
    if (!this.filter) {
      return data;
    }
    return FuseUtils.filterArrayByString(data, this.filter);
  }

  sortData (data: Segment[]): Segment[] {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this.sort.active) {
        case 'name':
          [propertyA, propertyB] = [a.name, b.name];
          break;
        case 'updateDate':
          [propertyA, propertyB] = [a.updateDate, b.updateDate];
          break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this.sort.direction === 'asc' ? 1 : -1);
    });
  }

  disconnect () {
  }
}
