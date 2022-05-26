const getValueByKey = (obj, value) => {
  let foundObject = null;
  Object.keys(obj).forEach((key) => {
    if (key === value) {
      foundObject = obj[key];
    } else {
      if (obj[key]["contents"]) {
        foundObject = getValueByKey(obj[key]["contents"], value);
      }
    }
  });
  return foundObject;
};

const ScanStatus = {
  SCAN_GOOD: "scan-good",
  UPLOAD_COMPLETE: "upload-complete",
  STARTED: "started",
  REVIEW_IN_PROGRESS: "review-in-progress",
  REVIEW_DENIED: "review-denied",
  REVIEW_APPROVED: "review-approved",
  SCAN_BAD_ATTESTATION: "scan-bad-attestation",
  FILE_PURGED: "file-purged",
  AUTO_EXPIRED: "auto-expired",
};

const setButtonName = (details, dlp_status) => {
  let buttonConfig = {
    buttonName: "",
    className: "",
    id: "",
    disabled: false,
    stage: "",
  };

  const { isDataUploadComplete, hiveTableName, showUpload } = details;
  if (hiveTableName) {
    if (isDataUploadComplete === false) {
    } else if (isDataUploadComplete === true) {
      if (dlp_status === ScanStatus.SCAN_GOOD) {
        buttonConfig.buttonName = "Done";
        buttonConfig.stage = "done";
        buttonConfig.className = "#0A853D";
      }
    }
  } else {
    if (isDataUploadComplete === false) {
      if (dlp_status === undefined) {
        buttonConfig.buttonName = "Upload file";
        buttonConfig.stage = "uploadFile";
        buttonConfig.className = "#3668DA";
      } else if (dlp_status === ScanStatus.UPLOAD_COMPLETE) {
        buttonConfig.buttonName = "Scan to begin";
        buttonConfig.stage = "scanToBegin";
        buttonConfig.className = "#3668DA";
      } else if (dlp_status === ScanStatus.STARTED && showUpload === true) {
        buttonConfig.buttonName = "File upload taking longer time";
        buttonConfig.stage = "fileUploadTakingLongerTime";
        buttonConfig.className = "#c58d03";
      } else if (dlp_status === ScanStatus.STARTED) {
        buttonConfig.buttonName = "Scan started";
        buttonConfig.stage = "scanStarted";
        buttonConfig.className = "#3668DA";
      } else if (dlp_status === ScanStatus.REVIEW_IN_PROGRESS) {
        buttonConfig.buttonName = "Review in progress";
        buttonConfig.stage = "reviewInProgress";
        buttonConfig.className = "#3668DA";
      } else if (dlp_status === ScanStatus.REVIEW_DENIED) {
        buttonConfig.buttonName = "Review denied";
        buttonConfig.stage = "reviewDenied";
        buttonConfig.className = "#BE1324";
      } else if (dlp_status === ScanStatus.SCAN_BAD_ATTESTATION) {
        buttonConfig.buttonName = "Scan bad";
        buttonConfig.stage = "scanBad";
        buttonConfig.className = "#BE1324";
      } else if (dlp_status === ScanStatus.FILE_PURGED) {
        buttonConfig.buttonName = "File Purged";
        buttonConfig.stage = "filePurged";
        buttonConfig.className = "#BE1324";
      } else if (dlp_status === ScanStatus.AUTO_EXPIRED) {
        buttonConfig.buttonName = "Auto expired";
        buttonConfig.stage = "autoExpired";
        buttonConfig.className = "#BE1324";
      }
    } else if (isDataUploadComplete === true) {
      if (dlp_status === ScanStatus.SCAN_GOOD) {
        buttonConfig.buttonName = "Scan completed";
        buttonConfig.stage = "scanCompleted";
        buttonConfig.className = "#0A853D";
      } else if (dlp_status === ScanStatus.REVIEW_APPROVED) {
        buttonConfig.buttonName = "Review approved";
        buttonConfig.stage = "reviewApproved";
        buttonConfig.className = "#0A853D";
      }
    }
  }
  return buttonConfig;
};

const getResultObj = (
  data,
  details,
  uploadedfileType,
  uploadOrDownloadProgress
) => {
  if (!data) return null;
  let resultObj = {};
  data.forEach((item, index) => {
    const buttonObj = setButtonName(details, item.dlp_status);
    const folderArr = item.name.split("/");
    folderArr.forEach((folder, index) => {
      if (item.name.indexOf(".") > -1) {
        if (resultObj[folder]) {
        } else {
          if (index === folderArr.length - 1) {
            let foundObject = getValueByKey(resultObj, folderArr[index - 1]);
            if (foundObject) {
              const fileNameArr = folder.split(".");
              foundObject.contents[fileNameArr[0]] = {};
              foundObject.contents[fileNameArr[0]].type = fileNameArr[1]
                ? fileNameArr[1]
                : "folder";
              foundObject.contents[fileNameArr[0]].created_date =
                foundObject.created_date;
              foundObject.contents[fileNameArr[0]].size = foundObject.size;
              foundObject.contents[fileNameArr[0]].last_modified =
                foundObject.last_modified;
              foundObject.contents[fileNameArr[0]].buttonConfig =
                foundObject.buttonConfig;
            } else {
              const fileNameArr = folder.split(".");
              resultObj[fileNameArr[0]] = {};
              resultObj[fileNameArr[0]].type = fileNameArr[1]
                ? fileNameArr[1]
                : "folder";
              resultObj[fileNameArr[0]].created_date = item.created_date;
              resultObj[fileNameArr[0]].size = item.size;
              resultObj[fileNameArr[0]].last_modified = item.last_modified;
              resultObj[fileNameArr[0]].buttonConfig = buttonObj;
            }
          } else {
            if (index != 0) {
              let foundObject = getValueByKey(resultObj, folderArr[index - 1]);
              if (foundObject) {
                if (!foundObject.contents[folder]) {
                  foundObject.contents[folder] = {};
                  foundObject.contents[folder].type = "folder";
                  foundObject.contents[folder].contents = {};
                  foundObject.contents[folder].created_date = item.created_date;
                  foundObject.contents[folder].size = item.size;
                  foundObject.contents[folder].last_modified =
                    item.last_modified;
                  foundObject.contents[folder].buttonConfig = buttonObj;
                }
              } else {
                resultObj[folder] = {};
                resultObj[folder].type = "folder";
                resultObj[folder].contents = {};
                resultObj[folder].created_date = item.created_date;
                resultObj[folder].size = item.size;
                resultObj[folder].last_modified = item.last_modified;
                resultObj[folder].buttonConfig = buttonObj;
              }
            } else {
              resultObj[folder] = {};
              resultObj[folder].type = "folder";
              resultObj[folder].contents = {};
              resultObj[folder].created_date = item.created_date;
              resultObj[folder].size = item.size;
              resultObj[folder].last_modified = item.last_modified;
              resultObj[folder].buttonConfig = buttonObj;
            }
          }
        }
      }
      // } else {
      //     if (!resultObj[folder]) {
      //         resultObj[folder] = {};
      //         resultObj[folder].type = "folder";
      //         resultObj[folder].contents = {};
      //         resultObj[folder].created_date = item.created_date;
      //         resultObj[folder].size = item.size;
      //         resultObj[folder].last_modified = item.last_modified;
      //         resultObj[folder].dlp_status = item.dlp_status;
      //     }
      // }
    });
  });

  return resultObj;
};
export default getResultObj;
