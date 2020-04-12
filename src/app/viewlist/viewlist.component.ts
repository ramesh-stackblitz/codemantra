import { Component, OnInit, OnChanges } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { viewlistService } from './viewlist.service';
import { Viewlist } from '../model/view.model';
import { ActivatedRoute } from '@angular/router';
import { VIEW_ITEMS } from '../data/viewlist-data';

@Component({
  selector: 'app-viewlist',
  templateUrl: './viewlist.component.html',
  styleUrls: ['./viewlist.component.scss']
})
export class ViewlistComponent implements OnInit {

  viewlist: Viewlist[];
  addNewFileUpload: any = {}; 
  filterOption: string;
  searchValue: string;
  uploadFileName: string;
  uploadFlag: boolean = false;
  showUpload: boolean = false;
  filterItems: any = [];
  viewlistLocal: any = [];
  gridViewshow: boolean = false;
  gridListViewShow: boolean = false;
  fileExtension: string;
  flagPdf: boolean = false;
  flagDocx: boolean = false;
  flagXlsx: boolean = false;

  constructor(private viewlistService: viewlistService, private activatedRoute: ActivatedRoute) {
    this.getViewList();
  }

  ngOnInit() {
    this.gridListViewShow = true;
    const localValues = JSON.parse(localStorage.getItem(this.viewlistLocal));
    if (localValues != null && localValues.length > 0) {
      this.viewlist = JSON.parse(localStorage.getItem(this.viewlistLocal));
      this.filterItems = JSON.parse(localStorage.getItem(this.viewlistLocal));
    }
    this.filterOption = 'all';
    this.searchValue = '';
  }

  getViewList() {
    this.viewlist = this.viewlistService.getProductsFromData();
    this.filterItems = this.viewlist;
  }

  removeGridList(index: any) {
    this.filterItems.splice(index, 1);
    localStorage.setItem(this.viewlistLocal, JSON.stringify(this.filterItems));
  }

  public files: NgxFileDropEntry[] = [];

  isFileAllowed(fileName: string) {
    fileName = fileName.toLowerCase();
    let isFileAllowed = false;
    const allowedFiles = ['.doc', '.docx', '.xlsx', '.xls', '.pdf'];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);

    if (undefined !== extension && null !== extension) {
        for (const ext of allowedFiles) {
            if (ext === extension[0]) {
                isFileAllowed = true;
            }
        }
    }
    return isFileAllowed;
  }
 
  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    let insertFlag = false;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile && this.isFileAllowed(droppedFile.fileEntry.name)) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        let fileType;
        fileEntry.file((file: File) => {
           this.showUpload = true;
           this.uploadFileName = droppedFile.relativePath;
           fileType = this.uploadFileName.toLowerCase();           
           this.fileExtension = fileType.substr((fileType.lastIndexOf('.') + 1));
          if (this.fileExtension === 'doc' || this.fileExtension === 'docx') {
            this.flagDocx = true;
            this.flagXlsx = false;
            this.flagPdf = false;
          } else if (this.fileExtension === 'xls' || this.fileExtension === 'xlsx') {
            this.flagXlsx = true;
            this.flagPdf = false;
            this.flagDocx = false;
          } else if (this.fileExtension === 'pdf') {
            this.flagPdf = true;
            this.flagDocx = false;
            this.flagDocx = false;
          }
           insertFlag = true;
           this.uploadFlag = true;
        });
      } else {
        alert("Please attach the format whether '.doc', '.docx', '.xlsx', '.xls', '.pdf'");
      }
    }
    setTimeout( () => this.showUpload = false, 3000);

    if (insertFlag) {
      this.addNewFileUpload = {
        id: this.viewlist.length + 1,
        titleName: this.uploadFileName,
        flagPdf: this.flagPdf,
        flagDocx: this.flagDocx,
        flagXlsx: this.flagXlsx,
        source: 'Source',
        sourceFlag: false,
        sourceInprogress: false,
        sourceDate: '2020-04-10',
        altText: 'Alt Text',
        altTextFlag: false,
        altTextInprogress: true,
        altTextDate: '2020-04-03',
        process: 'Process',
        processFlag: true,
        processInprogress: false,
        processDate: '2020-03-12',
        qa: 'QA',
        qaFlag: false,
        qaInprogress: false,
        qaDate: '2020-04-10',
        remediatedFile: 'Remediated File',
        remediatedFileFlag: false,
        remediatedFileInprogress: false,
        remediatedFileDate: '2020-04-12'
       }
       this.viewlist.push(this.addNewFileUpload);
       this.filterItems = this.viewlist;
    }
  }
  public fileOver(event){
    console.log(event);
  }
  public fileLeave(event){
    console.log(event);
  }
  closeProgress() {
    this.showUpload = false;
  }
  onGridLoad(val) {
    if (val == 'listview') {
      this.gridListViewShow = true;
      this.gridViewshow = false;
    } else {
      this.gridListViewShow = false;
      this.gridViewshow = true;
    }
  }
}
