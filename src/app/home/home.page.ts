import { PdfViewerService } from "./../services/pdf-viewer.service";
import { Component } from "@angular/core";
import { Platform } from '@ionic/angular';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer } from "@ionic-native/file-transfer/ngx";

import { DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  pdfLink
  url='https://firebasestorage.googleapis.com/v0/b/testapp-bb252.appspot.com/o/LessionPlan%2FPS02%2Fguide_561_en_732.pdf?alt=media&token=0339a0e4-f4fa-49a3-b6c0-3df12a95c8a7'
  browser: any;
  constructor(private pdf: PdfViewerService,
    private platform: Platform,
    private sanitizer:DomSanitizer,
    private document: DocumentViewer,
    private file: File,
    private transfer: FileTransfer) {
      this.pdfLink = this.sanitizer.bypassSecurityTrustResourceUrl('http://docs.google.com/gview?embedded=true&url='+this.url);
     }

  localPDF() {

    const options: DocumentViewerOptions = {
      title: "My PDF"
    }
    this.document.viewDocument('..\..\assets/myPdf.pdf', 'application/pdf', options)
  }

  downloadAndOpenPdf() {
    let path = null;

    if (this.platform.is('ios')) {
      path = this.file.documentsDirectory
    }
    else {
      path = this.file.dataDirectory
    }

    const transfer = this.transfer.create();
    transfer.download('https://firebasestorage.googleapis.com/v0/b/testapp-bb252.appspot.com/o/LessionPlan%2FPS01%2FObservations%2FDIY%20Music%20Observations.pdf?alt=media&token=a4be995e-f261-4932-bd92-bfab28652d26',
      path + 'myFile.pdf').then(entry => {
        let url = entry.toURL();
        this.document.viewDocument(url, 'application/pdf', {})
      })

  }


  
  download(url, title) {
    this.pdf.download(url, title);
  }


}
