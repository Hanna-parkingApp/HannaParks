import { showMessage } from "react-native-flash-message";
export const add_minutes = (dt, minutes) => {
    return new Date(dt.getTime() + minutes * 60000);
}
export const diff_minutes = (dt2, dt1)  =>
 {
  let diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= 60;
  return Math.abs(Math.round(diff));
 }

 export const showError = (message) => {
    showMessage({
        message,
        type: 'danger',
        icon: 'danger'
    })
}

export const showSuccess = (message) => {
    showMessage({
        message,
        type: 'success',
        icon: 'success'
    })
}