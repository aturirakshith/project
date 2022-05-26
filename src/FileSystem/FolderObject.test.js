import getResultObj from "./FolderObject";
const data = [
  {
    size: "1101",
    name: "src/folder1/folder2/20220413-16-28-15/correctcsv.csv",
    dlp_status: "scan-good",
    created_date: "2022 04 13 16:28:16",
    type: null,
    last_modified: "2022 04 13 16:28:12",
  },
  {
    size: "1102",
    name: "src/folder1/folder2/20220413-16-28-15/correctcsv2.csv",
    dlp_status: "upload-complete",
    created_date: "2022 04 13 16:28:17",
    type: null,
    last_modified: "2022 04 13 16:28:13",
  },
  {
    size: "1103",
    name: "src/folder1/folder2/20220413-16-28-15/correctcsv3.csv",
    dlp_status: "started",
    created_date: "2022 04 13 16:28:18",
    type: null,
    last_modified: "2022 04 13 16:28:14",
  },
  {
    size: "1104",
    name: "src/folder1/folder2/20220413-16-28-15/correctcsv4.csv",
    dlp_status: "review-in-progress",
    created_date: "2022 04 13 16:28:19",
    type: null,
    last_modified: "2022 04 13 16:28:15",
  },
  {
    size: "1105",
    name: "src/folder1/folder3/20220413-16-28-15/correctcsv.csv",
    dlp_status: "review-denied",
    created_date: "2022 04 13 16:28:15",
    type: null,
    last_modified: "2022 04 13 16:28:16",
  },
  {
    size: "1106",
    name: "src/folder1/folder3/20220413-16-28-15/correctcsv2.csv",
    dlp_status: "review-approved",
    created_date: "2022 04 13 16:28:16",
    type: null,
    last_modified: "2022 04 13 16:28:17",
  },
  {
    size: "1107",
    name: "src/folder1/20220413-16-28-15/correctcsv.csv",
    dlp_status: "file-purged",
    created_date: "2022 04 13 16:28:17",
    type: null,
    last_modified: "2022 04 13 16:28:18",
  },
  {
    size: "1907",
    name: "src/folder1/20220413-16-28-15/correct.csv",
    dlp_status: "scan-bad-attestation",
    created_date: "2022 04 13 16:28:17",
    type: null,
    last_modified: "2022 04 13 16:28:18",
  },
  {
    size: "1137",
    name: "src/folder1/20220413-16-28-15/ectcsv.csv",
    dlp_status: "auto-expired",
    created_date: "2022 04 13 16:28:17",
    type: null,
    last_modified: "2022 04 13 16:28:18",
  },
  {
    size: "1137",
    name: "src/folder1/20220413-16-28-15/ectcsv.csv",
    created_date: "2022 04 13 16:28:17",
    type: null,
    last_modified: "2022 04 13 16:28:18",
  },
];
const buttonConfig = {
  buttonName: "Done",
  className: "#0A853D",
  disabled: false,
  id: "df",
  stage: "done",
};

const details = {
  isDataUploadComplete: true,
  hiveTableName: "authzuser11__team_test",
  showUpload: false,
};
const DataUploadFalse = {
  isDataUploadComplete: false,
  hiveTableName: "authzuser11__team_test",
  showUpload: false,
};
const NoHiveTable = {
  isDataUploadComplete: true,
  hiveTableName: "",
  showUpload: false,
};
const NoHiveTableAndDataUplaodFalse = {
  isDataUploadComplete: false,
  hiveTableName: "",
  showUpload: true,
};
const NoHiveTableAndDataUplaodFalseUploadFalse = {
  isDataUploadComplete: false,
  hiveTableName: "",
  showUpload: false,
};
const undefinedDataComplete = {
  isDataUploadComplete: undefined,
  hiveTableName: "",
  showUpload: false,
};

describe("FolderObjectTest", () => {
  test("Details test", () => {
    getResultObj(data, details);
  });
  test("DataUploadFalse", () => {
    getResultObj(data, DataUploadFalse);
  });
  test("NoHiveTable", () => {
    getResultObj(data, NoHiveTable);
  });
  test("NoHiveTableAndDataUplaodFalse", () => {
    getResultObj(data, NoHiveTableAndDataUplaodFalse);
  });
  test("NoHiveTableAndDataUplaodFalse", () => {
    getResultObj(data, undefinedDataComplete);
  });
  test("NoHiveTableAndDataUplaodFalseUploadFalse", () => {
    getResultObj(data, NoHiveTableAndDataUplaodFalseUploadFalse);
  });
});
