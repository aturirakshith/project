import React from "react";
import { shallow, mount } from "enzyme";
import FileSystemTable from "./FileSystemTable";
import * as getResultObj from "./FolderObject";

let data2 = [
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
];

//  let objData=getResultObj(data2)
const mockStatusClicked = jest.fn(() => {});

let props = {
  datasetsList: data2,
  details: {
    isDataUploadComplete: true,
    hiveTableName: "authzuser11__team_test",
    showUpload: false,
  },
  uploadedfileType: "CSV",
  uploadOrDownloadProgress: [],
  statusClicked: mockStatusClicked,
};
const buttonConfig = {
  buttonName: "Done",
  className: "#0A853D",
  disabled: false,
  id: "df",
  stage: "done",
};
const resultObj = {
  rslt: {
    buttonConfig,
    contents: {
      component: {
        type: "csv",
        buttonConfig,
      },
    },
    fat: "100g",
    type: "folder",
  },
  file3: {
    buttonConfig,
    type: "csv",
  },
  data: {
    buttonConfig,
    contents: {
      folder1: {
        buttonConfig,
        type: "folder",
        contents: {
          newfile: {
            buttonConfig,
            type: "jpeg",
          },
        },
      },
    },
    type: "folder",
  },
};

//getResultObj.default = jest.fn(() => resultObj);
describe("<FileSystemTable /> Testing", () => {
  beforeEach(() => {
    getResultObj.default = jest.fn(() => resultObj);
    //console.log(getResultObj.default);
  });
  it(" 1st Folder Button click", () => {
    // getResultObj.default = jest.fn(() => resultObj);
    // console.log(getResultObj.default);
    const wrapper = shallow(<FileSystemTable {...props} />);
    expect(wrapper.find(".breadcrumb-folder-button").at(0).text()).toBe("rslt");
  });
  it("renders correctly", () => {
    const wrapper = shallow(<FileSystemTable {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it(" Home Button exists", () => {
    const wrapper = shallow(<FileSystemTable {...props} />);
    // wrapper.find(".breadcrumb-folder-button").simulate("click");

    expect(wrapper.find(".breadcrumb-home-button")).toHaveLength(1);
  });

  it(" Initial Home Button Disabled", () => {
    const wrapper = shallow(<FileSystemTable {...props} />);
    expect(wrapper.find("button").at(0).props("disabled")).toBeTruthy();
  });
  it(" Home Button click", () => {
    const wrapper = shallow(<FileSystemTable {...props} />);
    wrapper.find(".breadcrumb-home-button").simulate("click");
  });

  it(" Breadcrumb  Button check", () => {
    const wrapper = shallow(<FileSystemTable {...props} />);
    wrapper.find(".breadcrumb-folder-button").at(0).simulate("click");
    expect(wrapper.find(".breadcrumb-location-button").at(0).text()).toBe(
      "rslt"
    );
  });

  it(" Breadcrumb  Button click", () => {
    const wrapper = shallow(<FileSystemTable {...props} />);
    wrapper.find(".breadcrumb-folder-button").at(0).simulate("click");
    wrapper.find(".breadcrumb-location-button").simulate("click");
  });
  it(" Breadcrumb  Button disabled on its location", () => {
    const wrapper = shallow(<FileSystemTable {...props} />);
    wrapper.find(".breadcrumb-folder-button").at(0).simulate("click");
    expect(
      wrapper.find(".breadcrumb-location-button").at(0).props().disabled
    ).toBeTruthy();
  });

  it(" Status clicked", () => {
    //const statusClicked = () => {};
    const wrapper = shallow(<FileSystemTable {...props} />);
    wrapper.find(".status-filesystem").at(0).simulate("click");
    expect(mockStatusClicked).toHaveBeenCalled();
  });

  it("NO Data Passed", () => {
    const wrapper = shallow(
      <FileSystemTable {...{ ...props, datasetsList: null }} />
    );
  });
});
