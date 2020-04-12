import { Injectable } from '@angular/core';
import { Viewlist } from '../model/view.model';
import { VIEW_ITEMS } from '../data/viewlist-data';

@Injectable()
export class viewlistService {
  private pItems = VIEW_ITEMS;

  getProductsFromData(): Viewlist[] {
    return this.pItems;
  }
}
