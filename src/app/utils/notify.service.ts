import { Injectable } from '@angular/core';
// import { ToastPackage, ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  // constructor(private _toastr: ToastrService) { }

  // showSuccess(message: string = "Successful") {
  //   this._toastr.success(message, "Success", {closeButton: true})
  // }
  // showError(message:string ) {
  //   var errorMessage = message? message : "Dear customer, we tried processing your request. However, there seems to be a connectivity issue. We advise you try again shortly.";
  //   this._toastr.error(errorMessage, "Info", {closeButton: true})
  // }

  // showInfo(message: string) {
  //   this._toastr.info(message, "Info", {closeButton: true})
  // }

  // clear(){
  //   this._toastr.clear()
  // }

  // showWarning(message: string) {
  //   this._toastr.warning(message, "Warning", {closeButton: true});
  // }
  // networkError(){
  //   this.showError("Network Error, Please check your network and try again");
  // }
  // sessionError(){
  //   this.showError("Your session has expired. please login again to proceed");
  // }

  // forbiddenError(){
  //   this.showError("Sorry you are not permitted to perfom this action");
  // }
  // showMessage(issuccessful: boolean = true, message: string = "Successful") {
  //   if (issuccessful) {
  //     this._toastr.success(message, "Success", {closeButton: true})
  //   } else {
  //     this.showWarning(message);
  //   }

  // }

  showSuccessWithAction(message: string,  confirmText: string, cancelText: string, backPath:string) {
    Swal.fire({
      title: "Success",
      html: message,
      imageUrl: "assets/images/success_notify.png",
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      buttonsStyling: false,
      customClass:{
        actions: "btn",
        confirmButton: "btn btn-lg btn-primary",
        cancelButton: "btn btn-lg btn-secondary"
      },
      width:"629px",

    }).then((result) => {
      if (result.isConfirmed) {
        location.reload();
      }else if (result.isDismissed) {
        location.href = backPath;
      }
    })
    // this._toastr.success(message, "Success")
  }

  async Goback(){
    history.back();
    return true;
  }

  showSuccessWithActionAlt(message: string) {
    Swal.fire({
      text: message, 
      imageUrl: "../../../assets/images/save-images.jpg",
      showCancelButton: false, 
      cancelButtonText: "Close",
      buttonsStyling: true,
      width:"429px", 
      timer: 15000
    }) 
    // this._toastr.success(message, "Success")
  }
}
