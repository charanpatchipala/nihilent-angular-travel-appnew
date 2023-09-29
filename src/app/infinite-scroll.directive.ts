import {
  Directive,
  Output,
  EventEmitter,
  OnInit,
  Input,
  HostListener,
} from '@angular/core';
import { place } from './app.component';
import { TravelDataService } from './travel-data.service';
import { finalize } from 'rxjs/operators';
@Directive({
  selector: '[appInfiniteScroll]',
})
export class InfiniteScrollDirective {
  // @Output() items: EventEmitter<place[]> = new EventEmitter();
  // @Output() loading: EventEmitter<boolean> = new EventEmitter();
  @Output() items = new EventEmitter<place[]>();
  @Output() loading = new EventEmitter<boolean>();
  // @Input() apiEndpoint: string;
  @Input() pageSize!: number;
  private _searchTerm!: string;
  private currentPage: number = 1;
  private isLoading: boolean = false;
  private hasMoreItems: boolean = true; // New flag to track if more items are available
  private _order: string = 'asc';
  private _sortType: string = 'default';

  @Input()
  set sortType(type: string) {
    if (this._sortType !== type) {
      this._sortType = type;
      this.resetAndLoad();
    }
  }

  get sortType(): string {
    return this._sortType;
  }

  // @Input()
  // set searchTerm(term: string) {
  //   if (this._searchTerm !== term) {
  //     this._searchTerm = term;
  //     this.currentPage = 1;
  //     this.hasMoreItems = true; // Reset the flag when search term changes
  //     this.items.emit([]);
  //     this.loadMoreData();
  //   }
  // }

  @Input()
  set searchTerm(term: string) {
    if (this._searchTerm !== term) {
      this._searchTerm = term;
      this.resetAndLoad();
    }
  }

  @Input()
  set order(value: string) {
    if (this._order !== value) {
      this._order = value;
      this.resetAndLoad();
    }
  }

  get order(): string {
    return this._order;
  }
  // get searchTerm(): string {
  //   return this._searchTerm;
  // }

  constructor(private placeService: TravelDataService) {}

  ngOnInit(): void {
    // this.loadInitialData();
    // this.listenForScroll();
    this.resetAndLoad();
  }

  // private loadInitialData(): void {
  //   this.loadMoreData();
  // }

  // private listenForScroll(): void {
  //   window.addEventListener('scroll', () => {
  //     const pos =
  //       (document.documentElement.scrollTop || document.body.scrollTop) +
  //       document.documentElement.offsetHeight;
  //     const max = document.documentElement.scrollHeight;

  //     if (pos >= max - 100 && !this.isLoading && this.hasMoreItems) {
  //       this.loadMoreData();
  //     }
  //   });
  // }
  @HostListener('window:scroll')
  onScroll(): void {
    const isBottom =
      document.documentElement.scrollTop +
        document.documentElement.offsetHeight >=
      document.documentElement.scrollHeight - 100;
    if (isBottom && !this.isLoading && this.hasMoreItems) {
      this.loadMoreData();
    }
  }

  private resetAndLoad(): void {
    this.currentPage = 1;
    this.hasMoreItems = true;
    this.items.emit([]);
    this.loadMoreData();
  }

  private loadMoreData(): void {
    if (!this.hasMoreItems) return; // Don't load more data if flag is false

    this.isLoading = true;
    // this.loading.emit(this.isLoading);
    this.loading.emit(true);
    this.placeService
      // .getpageListPagination(this.currentPage, this.pageSize, this.searchTerm)
      .getpageListPagination(
        this.currentPage,
        this.pageSize,
        this._searchTerm,
        this._sortType,
        this._order
      )
      .pipe(
        finalize(() => {
          this.isLoading = false;
          this.loading.emit(false);
        })
      )
      .subscribe((data) => {
        // if (data.length < this.pageSize) {
        //   this.hasMoreItems = false; // Set flag to false if fewer items are returned
        // }
        this.hasMoreItems = data.length >= this.pageSize;
        this.items.emit(data);
        this.currentPage++;
        // this.isLoading = false;
        // this.loading.emit(this.isLoading);
      });
  }
}
