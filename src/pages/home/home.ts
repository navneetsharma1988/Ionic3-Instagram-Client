import {Component} from '@angular/core';
import {ActionSheetController, IonicPage, ModalController, NavController} from 'ionic-angular';
import {ImagesProvider} from "../../providers/images/images";
import {Camera} from "@ionic-native/camera";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  images = [];

  constructor(public navCtrl: NavController, private actionSheetCtrl: ActionSheetController,
              private imagesProvider: ImagesProvider, private modalCtrl: ModalController,
              private camera: Camera) {
    this.reloadImages();
  }

  openImage(img) {
    let modal = this.modalCtrl.create('PreviewModalPage', {img: img});
    modal.present();
  }

  reloadImages() {
    this.imagesProvider.getImages().subscribe(data => {
      this.images = data;
    });
  }

  deleteImage(img) {
    this.imagesProvider.deleteImage(img).subscribe(data => {
      this.reloadImages();
    });
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select image source',
      buttons: [
        {
          text: 'Load from Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  takePicture(sourceType) {
    let options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    this.camera.getPicture(options).then(imagePath => {
      let modal = this.modalCtrl.create('UploadModalPage', {data: imagePath});
      modal.present();
      modal.onDidDismiss(data => {
        if (data && data.reload) {
          this.reloadImages();
        }
      });
    }, err => {
      console.log('Error ' + err);
    });
  }

}
