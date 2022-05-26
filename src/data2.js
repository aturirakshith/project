const data2 = [
  {
    size: "1101",
    name: "src/folder1/folder2/20220413-16-28-15/correctcsv.csv",
    dlp_status: "scan-good1",
    created_date: "2022 04 13 16:28:16",
    type: null,
    last_modified: "2022 04 13 16:28:12",
  },
  {
    size: "1102",
    name: "src/folder1/folder2/20220413-16-28-15/correctcsv2.csv",
    dlp_status: "scan-good2",
    created_date: "2022 04 13 16:28:17",
    type: null,
    last_modified: "2022 04 13 16:28:13",
  },
  {
    size: "1103",
    name: "src/folder1/folder2/20220413-16-28-15/correctcsv3.csv",
    dlp_status: "scan-good3",
    created_date: "2022 04 13 16:28:18",
    type: null,
    last_modified: "2022 04 13 16:28:14",
  },
  {
    size: "1104",
    name: "src/folder1/folder2/20220413-16-28-15/correctcsv4.csv",
    dlp_status: "scan-good4",
    created_date: "2022 04 13 16:28:19",
    type: null,
    last_modified: "2022 04 13 16:28:15",
  },
  {
    size: "1105",
    name: "src/folder1/folder3/20220413-16-28-15/correctcsv.csv",
    dlp_status: "scan-good5",
    created_date: "2022 04 13 16:28:15",
    type: null,
    last_modified: "2022 04 13 16:28:16",
  },
  {
    size: "1106",
    name: "src/folder1/folder3/20220413-16-28-15/correctcsv2.csv",
    dlp_status: "scan-good6",
    created_date: "2022 04 13 16:28:16",
    type: null,
    last_modified: "2022 04 13 16:28:17",
  },
  {
    size: "1107",
    name: "src/folder1/20220413-16-28-15/correctcsv.csv",
    dlp_status: "scan-good7",
    created_date: "2022 04 13 16:28:17",
    type: null,
    last_modified: "2022 04 13 16:28:18",
  },
  {
    size: "1107",
    name: "sfirrectcsv.csv",
    dlp_status: "scan-good7",
    created_date: "2022 04 13 16:28:17",
    type: null,
    last_modified: "2022 04 13 16:28:18",
  },
];

export const props = {
  datasetsList: data2,
  details: {
    isDataUploadComplete: true,
    hiveTableName: "authzuser11__team_test",
    showUpload: false,
  },
  uploadedfileType: "CSV",
  uploadOrDownloadProgress: [],
  statusClicked: () => {},
};
export default data2;
