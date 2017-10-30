import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {FileTransfer, FileUploadOptions} from "@ionic-native/file-transfer";

@Injectable()
export class ImagesProvider {
  apiUrl = 'http://ec2-18-194-33-53.eu-central-1.compute.amazonaws.com:3000/';

  // apiUrl = 'http://192.168.1.157:3000/';

  constructor(public http: Http, private transfer: FileTransfer) {
  }

  getImages() {
    return this.http.get(this.apiUrl + 'images').map(res => res.json());
  }

  deleteImage(img) {
    return this.http.delete(this.apiUrl + 'images/' + img._id);
  }

  uploadImage(img, desc) {
    console.log('img', img);
    let url = this.apiUrl + 'images';

    let options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      headers: {
        Connection: 'close'
      },
      mimeType: 'multipart/form-data',
      params: {'desc': desc}
    };

    const fileTransfer = this.transfer.create();

    return fileTransfer.upload(img, encodeURI(url), options);
  }

}
