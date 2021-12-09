import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface User {
  name: string;
}

export interface ProductInterface {  
  sno: number;
  product: string;
  sgst: string;
  cgst: string;  
  price: number;
  quantity: number;
  total: number;
}

const ELEMENT_DATA: ProductInterface[] = [
  { sno: 1, product: 'CPU',     cgst:'12.5%',sgst: '12.5%',price: 15000, quantity: 1, total: 15000 },
  { sno: 2, product: 'Monitor', cgst: '8.5%', sgst: '8.5%', price: 10000, quantity: 1, total: 10000 },
  { sno: 3, product: 'Keyboard', cgst: '5.5%', sgst: '5.5%', price: 5000, quantity: 1, total: 5000 },
  { sno: 4, product: 'Headset', cgst: '3.5%', sgst: '3.5%', price: 1000, quantity: 1, total: 1000 },
  { sno: 5, product: 'Wifi', cgst: '2.5%', sgst: '2.5%', price: 500, quantity: 1, total: 500 }  
];

const temp_Element_Data: ProductInterface[] = [
  { sno: 1, product: 'CPU', cgst: '12.5%', sgst: '12.5%', price: 15000, quantity: 1, total: 15000 },
  { sno: 2, product: 'Monitor', cgst: '8.5%', sgst: '8.5%', price: 10000, quantity: 1, total: 10000 },
  { sno: 3, product: 'Keyboard', cgst: '5.5%', sgst: '5.5%', price: 5000, quantity: 1, total: 5000 },
  { sno: 4, product: 'Headset', cgst: '3.5%', sgst: '3.5%', price: 1000, quantity: 1, total: 1000 },
  { sno: 5, product: 'Wifi', cgst: '2.5%', sgst: '2.5%', price: 500, quantity: 1, total: 500 } 
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  title = 'calsoft';
  grandSubTotal: number = 0;
  displayedColumns: string[] = ['sno', 'product', 'cgst', 'sgst', 'price', 'quantity', 'total'];
  dataSourceSidepanel = ELEMENT_DATA
  dataSourcePopup = ELEMENT_DATA
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  options!: { name: any; }[];
  myControl = new FormControl();
  filteredOptions!: Observable<User[]>;
  dataSource: any;
  selection: any;
  constructor(private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.autoCompleteData();
  }

  ngAfterContentChecked() {
    this.RowTotal();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource<ProductInterface>(ELEMENT_DATA);
    this.selection= new SelectionModel<ProductInterface>();
    this.dataSource.paginator = this.paginator;
    this.changeDetector.detectChanges();
  }

  //row total calculation
  RowTotal() {
    let tempElementData = ELEMENT_DATA;
    for (let i = 0; i < tempElementData.length; i++) {
      ELEMENT_DATA[i].total = tempElementData[i].price * tempElementData[i].quantity;
    }
  }

  //grand total calculation
  GrandTotal(elemt: any) {
    this.grandSubTotal = this.grandSubTotal + elemt.price;
  }

  //row quantity total calculation
  RowQuantity(element: any) {
    element.prodtotal = element.prodquantity * element.prodprice;
    this.GrandTotal(element.prodtotal);
  }

  autoCompleteData() {
    let name = [];
    let filtertempElementData = ELEMENT_DATA;
    for (let i = 0; i < filtertempElementData.length; i++) {
      name.push({
        name: filtertempElementData[i].product
      });
    }
    this.options = name;
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => (typeof value === 'string' ? value : value.name)),
      map(name => (name ? this._filter(name) : this.options.slice())),
    );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onProductType(Product: any, element: any) {
    let uniqueProduct = temp_Element_Data.filter((obj: { product: any; }) => obj.product == Product.option.value.name);
    element.prodcgst = uniqueProduct[0].cgst;
    element.prodsgst = uniqueProduct[0].sgst;
    element.prodprice = uniqueProduct[0].price;
    element.prodquantity = uniqueProduct[0].quantity;
    element.prodtotal = uniqueProduct[0].total;
    this.autoCompleteData();
    this.GrandTotal(uniqueProduct[0]);
  }  

  //key events in mat table
  tableKeydown(event: KeyboardEvent) {
    if (!this.selection.isEmpty()) {
      let newSelection;
      const currentSelection = this.selection.selected[0];
      const currentIndex = this.dataSource.data.findIndex((row: any) => row === currentSelection);
      if (event.key === 'ArrowDown') {
        newSelection = this.dataSource.data[currentIndex + 1];
        console.log(newSelection)
      } else if (event.key === 'ArrowUp') {
        newSelection = this.dataSource.data[currentIndex - 1];
      }
      if (newSelection) {
        this.selection.toggle(newSelection);
      }
    }
  }
}
