'use strict';

var mSelectDevButton;
var mResult;

addLoadEvent(loadHomeController);

function loadHomeController() {
  
  mSelectDevButton = document.getElementById("select-device");
  mResult = document.getElementById("resultStr");
  mSelectDevButton.addEventListener('click', onSelectedDevice);

}

function onSelectedDevice(device) {

  chrome.usb.getUserSelectedDevices({
    'multiple': false
  }, function (selected_devices) {
    if (chrome.runtime.lastError != undefined) {
      console.warn('chrome.usb.getUserSelectedDevices error: ' +
        chrome.runtime.lastError.message);
      return;
    }

    for (var device of selected_devices) {
      if (device) {
        console.log("Device(s) vendorId: " + device.vendorId);
        console.log("Device(s) productId: " + device.productId);
        console.log("Device(s) device: " + device.device);
        console.log("Device(s) version: " + device.version);
        console.log("Device(s) productName: " + device.productName);
        console.log("Device(s) manufacturerName: " + device.manufacturerName);
        console.log("Device(s) serialNumber: " + device.serialNumber);
        chrome.usb.openDevice(device, onOpenCallback);
      }
    }
  });
}

function onOpenCallback(connection) {
  if (chrome.runtime.lastError) {
    console.log(chrome.runtime.lastError);
  }
  if (connection) {
    let msg = "Device VID=" + connection.vendorId + ", PID=" + connection.productId + " is opened.";
    console.log(msg);
    mResult.innerHTML = msg;
  } else {
    console.log("Device failed to open.");
  }
};

