import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilter'
})

export class TableFilterPipe implements PipeTransform {

  transform(items: any, searchValue: any): any {
    if (!items) { return []; }
    if (!searchValue) { return items; }
    return items.filter(item => {
      return item.titleName.toLowerCase().includes(searchValue.trim().toLocaleLowerCase()) ||
        item.source.toLowerCase().includes(searchValue.trim().toLocaleLowerCase()) ||
        item.altText.toLowerCase().includes(searchValue.trim().toLocaleLowerCase()) ||
        item.process.toLowerCase().includes(searchValue.trim().toLocaleLowerCase()) ||
        item.qa.toLowerCase().includes(searchValue.trim().toLocaleLowerCase()) ||
        item.remediatedFile.toLowerCase().includes(searchValue.trim().toLocaleLowerCase());
    });
  }

}
