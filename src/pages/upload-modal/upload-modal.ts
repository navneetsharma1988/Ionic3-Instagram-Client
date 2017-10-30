import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController} from 'ionic-angular';
import {ImagesProvider} from "../../providers/images/images";

@IonicPage()
@Component({
  selector: 'page-upload-modal',
  templateUrl: 'upload-modal.html',
})
export class UploadModalPage {
  imageData: any;
  desc: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private viewCtrl: ViewController, private imagesProvider: ImagesProvider) {
    this.imageData = this.navParams.get('data');
  }

  saveImage() {
    this.imagesProvider.uploadImage(this.imageData, this.desc).then(res => {
      console.log('success', res);
      this.viewCtrl.dismiss({reload: true});
    }, err => {
      console.log('error', err);
      this.viewCtrl.dismiss();
    })
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
