import { Component, OnInit, ViewChild, ChangeDetectorRef, AfterContentChecked } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
declare const window: any;

export interface User {
  name: string;
}

export let SheetHeader = [
  { product: 'CPU', cgst: '12.5%', sgst: '12.5%', price: 15000, quantity: 1, total: 15000 },
  { product: 'Monitor', cgst: '8.5%', sgst: '8.5%', price: 10000, quantity: 1, total: 10000 },
  { product: 'Keyboard', cgst: '5.5%', sgst: '5.5%', price: 5000, quantity: 1, total: 5000 },
  { product: 'Headset', cgst: '3.5%', sgst: '3.5%', price: 1000, quantity: 1, total: 1000 },
  { product: 'Wifi', cgst: '2.5%', sgst: '2.5%', price: 500, quantity: 1, total: 500 }
];

export let SheetHeaderr = [
  { product: 'CPU', cgst: '12.5%', sgst: '12.5%', price: 15000, quantity: 1, total: 15000 },
  { product: 'Monitor', cgst: '8.5%', sgst: '8.5%', price: 10000, quantity: 1, total: 10000 },
  { product: 'Keyboard', cgst: '5.5%', sgst: '5.5%', price: 5000, quantity: 1, total: 5000 },
  { product: 'Headset', cgst: '3.5%', sgst: '3.5%', price: 1000, quantity: 1, total: 1000 },
  { product: 'Wifi', cgst: '2.5%', sgst: '2.5%', price: 500, quantity: 1, total: 500 }
];

@Component({
  selector: 'app-spreadsheet-v2',
  templateUrl: './spreadsheet-v2.component.html',
  styleUrls: ['./spreadsheet-v2.component.css']
})

export class SpreadsheetV2Component implements OnInit {
  myControl = new FormControl();
  constructor() { }
  grandSubTotal: number = 0;
  displayedColumns: string[] = [" ", 'product', 'cgst', 'sgst', 'price', 'quantity', 'total'];
  dataSource = new MatTableDataSource(SheetHeader);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  filteredOptions: any;
  options: any;
  selection: any;

  ngOnInit(): void {
    console.log('dataSource', this.dataSource);
    this.autoCompleteData();
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(SheetHeader);
    //this.selection = new SelectionModel(SheetHeader);
    this.dataSource.paginator = this.paginator;    
  }

  //grand total calculation
  GrandTotal(elemt: any) {
    this.grandSubTotal = this.grandSubTotal + elemt.price;
  }

  autoCompleteData() {
    let name = [];
    let filtertempElementData = SheetHeader;
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
    return this.options.filter((option: { name: string; }) => option.name.toLowerCase().includes(filterValue));
  }

  onProductType(Product: any, element: any) {
    let uniqueProduct = SheetHeaderr.filter((obj: { product: any; }) => obj.product == Product.option.value.name);
    element.prodcgst = uniqueProduct[0].cgst;
    element.prodsgst = uniqueProduct[0].sgst;
    element.prodprice = uniqueProduct[0].price;
    element.prodquantity = uniqueProduct[0].quantity;
    element.prodtotal = uniqueProduct[0].total;
    this.GrandTotal(uniqueProduct[0]);
    this.autoCompleteData();
  }

  addRow(rIndex: any) {
    const newArr = new Array(this.displayedColumns.length);
    let tempDataSource = new Array()
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if (rIndex === i) {
        tempDataSource.push(this.dataSource.data[i]);
        tempDataSource.push(newArr);
      } else {
        tempDataSource.push(this.dataSource.data[i]);
      }
    }
    this.dataSource.data = tempDataSource;
  }

  //row quantity total calculation
  RowQuantity(element: any) {
    element.prodtotal = element.prodquantity * element.prodprice;
  }

  onScriptLoad() {
    var config = {
      "root": "",
      "flow": "DEFAULT",
      "data": {
        "orderId": "", /* update order id */
        "token": "", /* update token value */
        "tokenType": "TXN_TOKEN",
        "amount": "" /* update amount */
      },
      "handler": {
        "notifyMerchant": function (eventName: any, data: any) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        }
      }
    };

    if (window.Paytm && window.Paytm.CheckoutJS) {
      window.Paytm.CheckoutJS.onLoad(function excecuteAfterCompleteLoad() {
        // initialze configuration using init method 
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
          // after successfully updating configuration, invoke JS Checkout
          window.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error: any) {
          console.log("error => ", error);
        });
      });
    }
  }
}


//deleteColumn(cindex: any) {
//  // keep the length of columns to loop the data with later
//  const columnsLength = this.displayedColumns.length;
//  // prevent deleting all headers.
//  if (this.displayedColumns.length === 1) {
//    console.log('Cannot delete all headers.');
//    return;
//  }
//  //delete specific header
//  this.displayedColumns.splice(cindex + 1, 1);
//  // adjust header's names.
//  for (let i = 0; i < this.displayedColumns.length - 1; i++) {
//    this.displayedColumns[i + 1] = String.fromCharCode(65 + i);
//  }
//  let newRow = [];
//  const newDataSource = [];
//  // loop dataSource and copy every value exept the one in deleted column
//  for (let i = 0; i < this.dataSource.data.length; i++) {
//    for (let j = 0; j < columnsLength; j++) {
//      if (j !== cindex) { //if doesn't equal the deleted header than copy
//        newRow.push(this.dataSource.data[i]);
//      }
//    }
//    newDataSource.push(newRow);
//    newRow = [];
//  }
//  //this.dataSource.data = newDataSource;
//}

//addColumn(cindex: any) {
//  // add header to displayedColumn
//  if (cindex !== 0) {
//    this.displayedColumns.splice(cindex, 0);
//  } else { //if first header then we need to make sure we don't delete the header with rows number
//    this.displayedColumns.splice(cindex + 1, 0);
//  }
//  // adjust header.
//  for (let i = 0; i < this.displayedColumns.length - 1; i++) {
//    this.displayedColumns[i + 1] = String.fromCharCode(65 + i);
//  }
//  // insert rows for new header
//  let tempColArray = new Array();
//  let dataSourceTemp = new Array();
//  for (let r = 0; r < this.dataSource.data.length; r++) {
//    for (let c = 0; c < this.displayedColumns.length - 1; c++) {
//      if (cindex === c) { // if equal new header index then add new cell too
//        tempColArray.push('        ');
//        //tempColArray.push(this.dataSource.data[r][c]);
//      } else {
//        //tempColArray.push(this.dataSource.data[r][c]);
//      }
//    }
//    dataSourceTemp.push(tempColArray);
//    tempColArray = new Array();
//  }
//  this.dataSource.data = dataSourceTemp;
//}

//deleteRow(rIndex: any) {
//  //prevent user from deleting all rows
//  if (this.dataSource.data.length === 1) {
//    console.log('Cannot delete all rows.');
//    return;
//  }
//  const tempDataSource = new Array()
//  // insert empty cells for new row
//  // look for the right row to edit
//  for (let i = 0; i < this.dataSource.data.length; i++) {
//    if (rIndex !== i) { // when not the index if deleted row then copy
//      tempDataSource.push(this.dataSource.data[i]);
//    }
//  }
//  this.dataSource.data = tempDataSource;
//}











