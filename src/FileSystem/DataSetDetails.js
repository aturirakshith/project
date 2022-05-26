import React from "react";
import { shallow } from "enzyme";
import Datasetdetail from "../Datasetdetail";
import { getUserInfo } from "../../../data/Services/UserService";
import * as Actions from "../../../redux/actions/ActionCreator";

let details = {
  id: "c09300bc-3e89-4d06-9edf-d9334b50787c",
  name: "testing timezone",
  description: "test",
  type: "FILE_DATASET",
  isDataUploadComplete: true,
  isActive: true,
  retentionPeriod: "P18D",
  creationTime: "2020-08-26T02:44:40.467022-07:00",
  parentsSources: [
    {
      parentSystem: {
        id: "19cf19a3-8f89-4918-865f-28487355f392",
        carId: 2,
        name: "Advanced Loan System",
        frequently_used: true,
        type: "SYSTEM",
        isActive: true,
        createdDate: "2020-07-23T17:09:45.883+0000",
        modifiedDate: "2020-07-23T17:09:45.883+0000",
      },
      parentSystemId: "19cf19a3-8f89-4918-865f-28487355f392",
    },
  ],
  approvals: [],
  validationRules: [],
  owner: {
    id: "11499e74-eaf0-43df-9720-b38b52291bbc",
    email: "kattamuri.vineetha@usbank.com",
    first: "Vineetha",
    last: "Kattamuri",
  },
  entityState: "UNPUBLISHED",
  requests: [],
  systemId: "00000000-0000-0000-0000-000000000001",
  dlp: {
    dlp_job_status: "started",
    dlp_stagingurl:
      "gs://dv-ss-dlp-workbench-staging-bucket/47ab0e1d-79b9-467a-b9e0-8ea647f88120%23%23%23Datasets_sample1.csv",
  },
};

const user = {
  given_name: "Kattamuri",
  family_name: "Vineetha",
  email: "kattamuri.vineetha@usbank.com",
};
jest.mock("../../../data/Services/UserService");
getUserInfo.mockReturnValue(user);

let wrapper;
const populateTabs = jest.fn();

describe("<Datasetdetail /> Testing", () => {
  it("renders correctly", () => {
    wrapper = shallow(
      <Datasetdetail details={details} populateTabs={populateTabs} />
    );
    expect(wrapper).toMatchSnapshot();
  });

  it("Confirm Datatype button - disabled when dlp_job_Status is scan-bad-attestation", () => {
    const details = {
      id: "c09300bc-3e89-4d06-9edf-d9334b50787c",
      name: "testing timezone",
      dlp: {
        dlp_job_status: "scan-bad-attestation",
        dlp_stagingurl:
          "gs://dv-ss-dlp-workbench-staging-bucket/47ab0e1d-79b9-467a-b9e0-8ea647f88120%23%23%23Datasets_sample1.csv",
      },
      description: "test",
      type: "FILE_DATASET",
      isDataUploadComplete: false,
      isActive: true,
      retentionPeriod: "P18D",
      creationTime: "2020-08-26T02:44:40.467022-07:00",
      parentsSources: [
        {
          parentSystem: {
            id: "19cf19a3-8f89-4918-865f-28487355f392",
            carId: 2,
            name: "Advanced Loan System",
            frequently_used: true,
            type: "SYSTEM",
            isActive: true,
            createdDate: "2020-07-23T17:09:45.883+0000",
            modifiedDate: "2020-07-23T17:09:45.883+0000",
          },
          parentSystemId: "19cf19a3-8f89-4918-865f-28487355f392",
        },
      ],
      approvals: [],
      validationRules: [],
      owner: {
        id: "11499e74-eaf0-43df-9720-b38b52291bbc",
        email: "kattamuri.vineetha@usbank.com",
        first: "Vineetha",
        last: "Kattamuri",
      },
      entityState: "UNPUBLISHED",
      requests: [],
      systemId: "00000000-0000-0000-0000-000000000001",
    };
    wrapper = shallow(
      <Datasetdetail details={details} populateTabs={populateTabs} />
    );
    expect(wrapper.find("Button").at(0).props("disabled")).toBeTruthy();
  });

  it("Upload another file -feature exists when DLP scan fails", () => {
    const details = {
      id: "c09300bc-3e89-4d06-9edf-d9334b50787c",
      name: "testing timezone",
      dlp: {
        dlp_job_status: "scan-bad-attestation",
        dlp_stagingurl:
          "gs://dv-ss-dlp-workbench-staging-bucket/47ab0e1d-79b9-467a-b9e0-8ea647f88120%23%23%23Datasets_sample1.csv",
      },
      description: "test",
      type: "FILE_DATASET",
      isDataUploadComplete: false,
      isActive: true,
      retentionPeriod: "P18D",
      creationTime: "2020-08-26T02:44:40.467022-07:00",
      parentsSources: [
        {
          parentSystem: {
            id: "19cf19a3-8f89-4918-865f-28487355f392",
            carId: 2,
            name: "Advanced Loan System",
            frequently_used: true,
            type: "SYSTEM",
            isActive: true,
            createdDate: "2020-07-23T17:09:45.883+0000",
            modifiedDate: "2020-07-23T17:09:45.883+0000",
          },
          parentSystemId: "19cf19a3-8f89-4918-865f-28487355f392",
        },
      ],
      approvals: [],
      validationRules: [],
      owner: {
        id: "11499e74-eaf0-43df-9720-b38b52291bbc",
        email: "kattamuri.vineetha@usbank.com",
        first: "Vineetha",
        last: "Kattamuri",
      },
      entityState: "UNPUBLISHED",
      requests: [],
      systemId: "00000000-0000-0000-0000-000000000001",
    };
    wrapper = shallow(
      <Datasetdetail details={details} populateTabs={populateTabs} />
    );

    expect(wrapper.find("Button").at(0).props().title).toBe(
      "Upload another file"
    );
  });
  it("Upload another file -feature does not  exists when DLP scan fails and type is  STREAM_DATASET", () => {
    const details = {
      id: "1ffa5ded-3a36-4db3-ab1c-98ff86cdc914",
      name: "Servicing-AUTHPLTFRM-enrollment-events",
      dlp: {
        dlp_job_status: "scan-bad-attestation",
        dlp_stagingurl:
          "gs://dv-ss-dlp-workbench-staging-bucket/47ab0e1d-79b9-467a-b9e0-8ea647f88120%23%23%23Datasets_sample1.csv",
      },
      description: "test",
      type: "STREAM_DATASET",
      isDataUploadComplete: false,
      isActive: true,
      retentionPeriod: "P18D",
      creationTime: "2020-08-26T02:44:40.467022-07:00",
      parentsSources: [
        {
          parentSystem: {
            id: "19cf19a3-8f89-4918-865f-28487355f392",
            carId: 2,
            name: "Advanced Loan System",
            frequently_used: true,
            type: "SYSTEM",
            isActive: true,
            createdDate: "2020-07-23T17:09:45.883+0000",
            modifiedDate: "2020-07-23T17:09:45.883+0000",
          },
          parentSystemId: "19cf19a3-8f89-4918-865f-28487355f392",
        },
      ],
      approvals: [],
      validationRules: [],
      owner: {
        id: "67bfd8d3-cc76-4c27-ad25-44203ddb1570",
        email: "AuthZUser29@usbank.email",
        first: "AuthZUser29",
        last: "TestAccount",
        role: "USER",
      },
      entityState: "UNPUBLISHED",
      requests: [],
      systemId: "00000000-0000-0000-0000-000000000001",
    };
    wrapper = shallow(
      <Datasetdetail details={details} populateTabs={populateTabs} />
    );
    expect(wrapper.find("Button").at(0).exists()).toBe(false);
  });

  it("Confirm Datatype button- enabled when dlp_job_Status is scan-good", () => {
    const details = {
      id: "c09300bc-3e89-4d06-9edf-d9334b50787c",
      name: "testing timezone",
      dlp: {
        dlp_job_status: "scan-good",
        dlp_stagingurl:
          "gs://dv-ss-dlp-workbench-staging-bucket/47ab0e1d-79b9-467a-b9e0-8ea647f88120%23%23%23Datasets_sample1.csv",
      },
      description: "test",
      type: "FILE_DATASET",
      isDataUploadComplete: false,
      isActive: true,
      retentionPeriod: "P18D",
      creationTime: "2020-08-26T02:44:40.467022-07:00",
      parentsSources: [
        {
          parentSystem: {
            id: "19cf19a3-8f89-4918-865f-28487355f392",
            carId: 2,
            name: "Advanced Loan System",
            frequently_used: true,
            type: "SYSTEM",
            isActive: true,
            createdDate: "2020-07-23T17:09:45.883+0000",
            modifiedDate: "2020-07-23T17:09:45.883+0000",
          },
          parentSystemId: "19cf19a3-8f89-4918-865f-28487355f392",
        },
      ],
      approvals: [],
      validationRules: [],
      owner: {
        id: "11499e74-eaf0-43df-9720-b38b52291bbc",
        email: "kattamuri.vineetha@usbank.com",
        first: "Vineetha",
        last: "Kattamuri",
      },
      entityState: "UNPUBLISHED",
      requests: [],
      systemId: "00000000-0000-0000-0000-000000000001",
    };
    const uploadedfileType = "CSV";
    wrapper = shallow(
      <Datasetdetail
        details={details}
        populateTabs={populateTabs}
        uploadedfileType={uploadedfileType}
      />
    );

    expect(wrapper.find("Button").at(0).props().disabled).toBeFalsy();
  });

  it("information classification field exists", () => {
    wrapper = shallow(
      <Datasetdetail details={details} populateTabs={populateTabs} />
    );
    expect(
      wrapper
        .find('div[className="col-4"]')
        .find('label[className="font-weight-bold"]')
        .at(3)
        .text()
    ).toBe("Classification: ");
  });

  it("continue button id exists", () => {
    const uploadedfileType = "CSV";
    wrapper = shallow(
      <Datasetdetail
        details={details}
        populateTabs={populateTabs}
        uploadedfileType={uploadedfileType}
      />
    );
    expect(wrapper.find('[id="continue"]').exists()).toBeTruthy();
  });
});

//describe("<Datasetdetail /> Testing", () => {

// it("Query this dataset exists if user is the creator of the dataset", () => {

//     const data = {
//         MainReducer: {
//             details: {
//                 "id": "f5323b05-1567-4f57-b7a2-b5b8cd05de1a", "name": "TEST SET", "description": "TTEST", "isDataUploadComplete": false, "retentionPeriod": "P112D", "creationTime": "2020-04-20T01:53:16.517215-07:00", "parentsSources": [{ "parentSystemId": "8a8a2a2c-829e-41f0-9b61-06b985d52760", "parentSystemName": "CASSANDRA" }, { "parentSystemId": "bf4650ee-6b04-4a32-b9a0-2488057aa0ba", "parentSystemName": "SQLSERVER" }], "approvals": [], "validationRules": [],
//                 "owner": { "id": "11499e74-eaf0-43df-9720-b38b52291bbc", "email": "kattamuri.vineetha@usbank.com", "first": "Kattamuri", "last": "Vineetha" }, "entityState": "UNPUBLISHED", "requests": [], "systemId": "00000000-0000-0000-0000-000000000001"
//             }
//         },
// DatasetReducer: {
//     datasetFileDetails: []
// }
//     }
//     store = mockStore(data)
//     wrapper = mount(<Provider store={store}><Router><Datasetdetail /></Router></Provider>);
//     expect(wrapper.find("[title='Query this dataset']").exists()).toEqual(true);

// })

// it("Query this dataset exists if user is not the creator of the dataset and has request access APPROVED", () => {
//     const data = {
//         MainReducer: {
//             details: {
//                 "id": "23867153-fcfc-4cd7-ae39-dae3a9422c74", "name": "test1", "description": "test description 1", "isDataUploadComplete": false, "retentionPeriod": "P10D", "parentsSources": [{ "parentDatasetId": "b83f9d71-a8e9-4ed0-b319-7e492a35cb5a", "parentDatasetName": "credit risk dataset" }, { "parentSystemId": "00000000-0000-0000-0000-000000000005", "parentSystemName": "Zodiac Signs System" }], "approvals": [{ "id": "42edcf35-2b84-45bb-9564-d0797564f675", "state": "CREATED", "user": { "id": "a23d3807-3dfe-4fe6-ab9e-403c6ba1d107", "email": "vineetha.kattamuri@usbank.com" } }], "validationRules": [],
//                 "owner": { "id": "cdee15ec-7dff-486a-b21c-7908024b4d46", "email": "ganeshramesh.bhat@usbank.com", "first": "Ganesh Ramesh", "last": "Bhat" }, "entityState": "PUBLISHED",
//                 "requests": [{ "id": "a9607316-4f42-4756-bf81-2b5889cd2f6a", "state": "APPROVED", "type": "ACCESS_REQUEST", "approvals": [{ "id": "c3baf33f-8bf6-4106-aa1e-5fcc16bfc052", "state": "CREATED", "user": { "id": "11499e74-eaf0-43df-9720-b38b52291bbc", "email": "kattamuri.vineetha@usbank.com", "first": "Kattamuri", "last": "Vineetha" }, "requestId": "a9607316-4f42-4756-bf81-2b5889cd2f6a" }], "requestor": { "id": "11499e74-eaf0-43df-9720-b38b52291bbc", "email": "kattamuri.vineetha@usbank.com", "first": "Kattamuri", "last": "Vineetha" } }], "systemId": "00000000-0000-0000-0000-000000000001"
//             }
//         },
// DatasetReducer: {
//     datasetFileDetails: []
// }
//     }
//     store = mockStore(data)
//     wrapper = mount(<Provider store={store}><Router><Datasetdetail /></Router></Provider>);
//     expect(wrapper.find("[title='Query this dataset']").exists()).toEqual(true);
// })

// it("Query this dataset doesn't exists if user is not the creator of the dataset and has request access IN_PROGRESS", () => {
//     const data = {
//         MainReducer: {
//             details: {
//                 "id": "23867153-fcfc-4cd7-ae39-dae3a9422c74", "name": "test1", "description": "test description 1", "isDataUploadComplete": false, "retentionPeriod": "P10D", "parentsSources": [{ "parentDatasetId": "b83f9d71-a8e9-4ed0-b319-7e492a35cb5a", "parentDatasetName": "credit risk dataset" }, { "parentSystemId": "00000000-0000-0000-0000-000000000005", "parentSystemName": "Zodiac Signs System" }], "approvals": [{ "id": "42edcf35-2b84-45bb-9564-d0797564f675", "state": "CREATED", "user": { "id": "a23d3807-3dfe-4fe6-ab9e-403c6ba1d107", "email": "vineetha.kattamuri@usbank.com" } }], "validationRules": [],
//                 "owner": { "id": "cdee15ec-7dff-486a-b21c-7908024b4d46", "email": "ganeshramesh.bhat@usbank.com", "first": "Ganesh Ramesh", "last": "Bhat" }, "entityState": "PUBLISHED",
//                 "requests": [{ "id": "a9607316-4f42-4756-bf81-2b5889cd2f6a", "state": "IN_PROGRESS", "type": "ACCESS_REQUEST", "approvals": [{ "id": "c3baf33f-8bf6-4106-aa1e-5fcc16bfc052", "state": "CREATED", "user": { "id": "11499e74-eaf0-43df-9720-b38b52291bbc", "email": "kattamuri.vineetha@usbank.com", "first": "Kattamuri", "last": "Vineetha" }, "requestId": "a9607316-4f42-4756-bf81-2b5889cd2f6a" }], "requestor": { "id": "11499e74-eaf0-43df-9720-b38b52291bbc", "email": "kattamuri.vineetha@usbank.com", "first": "Kattamuri", "last": "Vineetha" } }], "systemId": "00000000-0000-0000-0000-000000000001"
//             }
//         }
//     }
//     store = mockStore(data)
//     wrapper = mount(<Provider store={store}><Router><Datasetdetail /></Router></Provider>);
//     expect(wrapper.find("[title='Query this dataset']").exists()).toBe(false)
//})

// it("Owner is able to see & click on share dataset icon", () => {
//     const matchData = {
//         params: {
//             id: "f5323b05-1567-4f57-b7a2-b5b8cd05de1a"
//         }
//     }
//     const data = {
//         MainReducer: {
//             details: {
//                 "id": "f5323b05-1567-4f57-b7a2-b5b8cd05de1a", "name": "TEST SET", "description": "TTEST", "isDataUploadComplete": false, "retentionPeriod": "P112D", "creationTime": "2020-04-20T01:53:16.517215-07:00", "parentsSources": [{ "parentSystemId": "8a8a2a2c-829e-41f0-9b61-06b985d52760", "parentSystemName": "CASSANDRA" }, { "parentSystemId": "bf4650ee-6b04-4a32-b9a0-2488057aa0ba", "parentSystemName": "SQLSERVER" }], "approvals": [], "validationRules": [],
//                 "owner": { "id": "11499e74-eaf0-43df-9720-b38b52291bbc", "email": "kattamuri.vineetha@usbank.com", "first": "Kattamuri", "last": "Vineetha" }, "entityState": "UNPUBLISHED", "requests": [], "systemId": "00000000-0000-0000-0000-000000000001"
//             }
//         },
// DatasetReducer: {
//     datasetFileDetails: []
// }
//     }
//     store = mockStore(data)
//     wrapper = mount(<Provider store={store}><Router><Datasetdetail match={matchData} /></Router></Provider>);
//     wrapper.find('div[className="row"]').find('div[className="col-12 float-right"]').simulate("click")
//     wrapper.update()
// })
//})

// it("Confirm Upload button exists", () => {
//     const data = {
//         MainReducer: {
//             details: {
//                 "id": "313766c0-c7a5-40d4-93a7-e3afc2b19994", "name": "dataset83",
//                 "description": "dataset83", "type": "FILE_DATASET", "uri": "https://www.googleapis.com/storage/v1/b/workbench-bucket-3747b005-035f-4390-99b5-1396e2120df0", "isDataUploadComplete": true, "isActive": true,
//                 "retentionPeriod": "P5M", "creationTime": "2020-08-10T22:13:57.597154-07:00", "parentsSources": [{
//                     "parentSystem": {
//                         "id": "2f4fec05-fb90-4f34-b90d-fae7262b1968", "carId": 51, "name": "Shell Aviation Card System", "frequently_used": true,
//                         "type": "SYSTEM", "isActive": true, "createdDate": "2020-07-23T17:09:58.678+0000", "modifiedDate": "2020-07-23T17:09:58.678+0000"
//                     }, "parentSystemId": "2f4fec05-fb90-4f34-b90d-fae7262b1968"
//                 }], "approvals": [],
//                 "validationRules": [], "owner": {
//                     "id": "cdee15ec-7dff-486a-b21c-7908024b4d46", "given_name": "Kattamuri", "family_name": "Vineetha",
//                     "email": "kattamuri.vineetha@usbank.com"
//                 }, "entityState": "UNPUBLISHABLE_NO_SCHEMA", "requests": [], "systemId": "00000000-0000-0000-0000-000000000001"
//             }
//         },
//         DatasetReducer: {
//             datasetFileDetails: []
//         }
//     }
//     store = mockStore(data)
//     wrapper = mount(<Provider store={store}><Router><Datasetdetail /></Router></Provider>);
//     expect(wrapper.find("[title='Confirm Upload']").exists()).toBe(true)
// })

// it("Confirm Upload button is disabled.-File processing FAILED.", () => {
//     const data = {
//         MainReducer: {
//             details: {
//                 "id": "313766c0-c7a5-40d4-93a7-e3afc2b19994", "name": "dataset83",
//                 "description": "dataset83", "type": "FILE_DATASET", "uri": "https://www.googleapis.com/storage/v1/b/workbench-bucket-3747b005-035f-4390-99b5-1396e2120df0", "isDataUploadComplete": true, "isActive": true,
//                 "retentionPeriod": "P5M", "creationTime": "2020-08-10T22:13:57.597154-07:00", "parentsSources": [{
//                     "parentSystem": {
//                         "id": "2f4fec05-fb90-4f34-b90d-fae7262b1968", "carId": 51, "name": "Shell Aviation Card System", "frequently_used": true,
//                         "type": "SYSTEM", "isActive": true, "createdDate": "2020-07-23T17:09:58.678+0000", "modifiedDate": "2020-07-23T17:09:58.678+0000"
//                     }, "parentSystemId": "2f4fec05-fb90-4f34-b90d-fae7262b1968"
//                 }], "approvals": [],
//                 "validationRules": [], "owner": {
//                     "id": "cdee15ec-7dff-486a-b21c-7908024b4d46", "given_name": "Kattamuri", "family_name": "Vineetha",
//                     "email": "kattamuri.vineetha@usbank.com"
//                 }, "entityState": "UNPUBLISHABLE_NO_SCHEMA", "requests": [], "systemId": "00000000-0000-0000-0000-000000000001"
//             },
//             fileSubmissionStatus: Config.REACT_APP_SHOW_DLP_SCAN_FEATURES ? false : true
//         },
//         DatasetReducer: {
//             datasetFileDetails: []
//         }
//     }
//     store = mockStore(data)
//     wrapper = mount(<Provider store={store}><Router><Datasetdetail /></Router></Provider>);
//     expect(wrapper.find("[title='Confirm Upload']").prop('disabled')).toBe(!Config.REACT_APP_SHOW_DLP_SCAN_FEATURES ? false : true)
// })

// it("Confirm Upload button is NOT disabled-File processing PASSED.", () => {
//     const data = {
//         MainReducer: {
//             details: {
//                 "id": "313766c0-c7a5-40d4-93a7-e3afc2b19994", "name": "dataset83",
//                 "description": "dataset83", "type": "FILE_DATASET", "uri": "https://www.googleapis.com/storage/v1/b/workbench-bucket-3747b005-035f-4390-99b5-1396e2120df0", "isDataUploadComplete": true, "isActive": true,
//                 "retentionPeriod": "P5M", "creationTime": "2020-08-10T22:13:57.597154-07:00", "parentsSources": [{
//                     "parentSystem": {
//                         "id": "2f4fec05-fb90-4f34-b90d-fae7262b1968", "carId": 51, "name": "Shell Aviation Card System", "frequently_used": true,
//                         "type": "SYSTEM", "isActive": true, "createdDate": "2020-07-23T17:09:58.678+0000", "modifiedDate": "2020-07-23T17:09:58.678+0000"
//                     }, "parentSystemId": "2f4fec05-fb90-4f34-b90d-fae7262b1968"
//                 }], "approvals": [],
//                 "validationRules": [], "owner": {
//                     "id": "cdee15ec-7dff-486a-b21c-7908024b4d46", "given_name": "Kattamuri", "family_name": "Vineetha",
//                     "email": "kattamuri.vineetha@usbank.com"
//                 }, "entityState": "UNPUBLISHABLE_NO_SCHEMA", "requests": [], "systemId": "00000000-0000-0000-0000-000000000001"
//             },
//             fileSubmissionStatus: true
//         },
//         DatasetReducer: {
//             datasetFileDetails: []
//         }
//     }
//     store = mockStore(data)
//     wrapper = mount(<Provider store={store}><Router><Datasetdetail /></Router></Provider>);
//     expect(wrapper.find("[title='Confirm Upload']").prop('disabled')).toBe(false)
// })

// it("Confirm Upload button does NOT exists", () => {
//     const data = {
//         MainReducer: {
//             details: {
//                 "id": "313766c0-c7a5-40d4-93a7-e3afc2b19994", "name": "dataset83",
//                 "description": "dataset83", "type": "FILE_DATASET", "uri": "https://www.googleapis.com/storage/v1/b/workbench-bucket-3747b005-035f-4390-99b5-1396e2120df0",
//                 "isDataUploadComplete": true, hiveTableName: "c050650_test", "isActive": true, "retentionPeriod": "P5M",
//                 "creationTime": "2020-08-10T22:13:57.597154-07:00", "parentsSources": [{
//                     "parentSystem": {
//                         "id": "2f4fec05-fb90-4f34-b90d-fae7262b1968", "carId": 51, "name": "Shell Aviation Card System", "frequently_used": true,
//                         "type": "SYSTEM", "isActive": true, "createdDate": "2020-07-23T17:09:58.678+0000", "modifiedDate": "2020-07-23T17:09:58.678+0000"
//                     }, "parentSystemId": "2f4fec05-fb90-4f34-b90d-fae7262b1968"
//                 }], "approvals": [],
//                 "validationRules": [], "owner": {
//                     "id": "cdee15ec-7dff-486a-b21c-7908024b4d46", "given_name": "Kattamuri", "family_name": "Vineetha",
//                     "email": "kattamuri.vineetha@usbank.com"
//                 }, "entityState": "UNPUBLISHABLE_NO_SCHEMA", "requests": [], "systemId": "00000000-0000-0000-0000-000000000001"
//             }
//         },
//         DatasetReducer: {
//             datasetFileDetails: []
//         }
//     }
//     store = mockStore(data)
//     wrapper = mount(<Provider store={store}><Router><Datasetdetail /></Router></Provider>);
//     expect(wrapper.find("[title='Confirm Upload']").exists()).toBe(false)
// })

describe("<Datasetdetail /> with hivetable and not owner", () => {
  let details = {
    id: "f945d4eb-993a-46ff-a3e6-9c91f0063c92",
    name: "dataset087",
    description: "dataset087",
    classification: "INTERNAL",
    type: "FILE_DATASET",
    uri: "https://www.googleapis.com/storage/v1/b/workbench-bucket-687af4f5-c47d-4889-9388-510c6f7b95e3",
    isDataUploadComplete: true,
    isActive: true,
    creationTime: "2020-09-25T01:34:31.064158-07:00",
    hiveTableName: "authzuser12_dataset_15",
    parentsSources: [
      {
        parentSystem: {
          id: "19cf19a3-8f89-4918-865f-28487355f392",
          carId: 2,
          name: "Advanced Loan System",
          frequently_used: true,
          type: "SYSTEM",
          isActive: true,
          createdDate: "2020-07-23T17:09:45.883+0000",
          modifiedDate: "2020-07-23T17:09:45.883+0000",
        },
        parentSystemId: "19cf19a3-8f89-4918-865f-28487355f392",
      },
      {
        parentSystem: {
          id: "64507ae9-29fd-4480-93fc-5776ccf6e8af",
          carId: 0,
          name: "NEW",
          frequently_used: false,
          type: "USER_DEFINED_SYSTEM",
          isActive: true,
          displayName: "new",
          state: "CREATED",
          createdDate: "2020-08-14T05:25:40.499+0000",
          modifiedDate: "2020-08-14T05:25:40.499+0000",
        },
        parentSystemId: "64507ae9-29fd-4480-93fc-5776ccf6e8af",
      },
      {
        parentSystem: {
          id: "0cc48f7d-de27-4f81-a1a7-7dd9411701ac",
          carId: 0,
          name: "TESTING6THTIME",
          frequently_used: false,
          type: "USER_DEFINED_SYSTEM",
          isActive: true,
          displayName: "Testing6thtime",
          state: "CREATED",
          createdDate: "2020-09-25T08:34:31.090+0000",
          modifiedDate: "2020-09-25T08:34:31.090+0000",
        },
        parentSystemId: "0cc48f7d-de27-4f81-a1a7-7dd9411701ac",
      },
    ],
    approvals: [],
    validationRules: [],
    owner: {
      id: "74696997-df87-44f2-a036-25dcf9f187dc",
      email: "AuthZUser11@usbank.email",
      first: "AuthZUser11",
      last: "TestAccount",
    },
    entityState: "UNPUBLISHABLE_NO_SCHEMA",
    resourceId: 702000,
    systemId: "00000000-0000-0000-0000-000000000001",
    dlp: {
      dlp_job_status: "started",
      dlp_stagingurl:
        "gs://dv-ss-dlp-workbench-staging-bucket/47ab0e1d-79b9-467a-b9e0-8ea647f88120%23%23%23Datasets_sample1.csv",
    },
  };

  it("Access status displayed if user is NOT the owner of dataset or user doesn't have access to datset when use comes from data source", () => {
    wrapper = shallow(
      <Datasetdetail
        details={details}
        populateTabs={populateTabs}
        requestHistoryLoader={false}
      />
    );
    expect(wrapper.find("Connect(RequestAccessComponent)").exists()).toEqual(
      true
    );
    expect(wrapper.find('b[className="pl-3"]').text().trim()).toEqual(
      "Access:"
    );
  });

  it("status button will not be displayed if hive table is created", () => {
    details.owner = {
      id: "6a91115d-f653-4a3f-a054-76cd221c5949",
      email: "kattamuri.vineetha@usbank.com",
      first: "Vineetha",
      last: "Kattamuri",
      role: "ADMIN",
    };
    wrapper = shallow(
      <Datasetdetail details={details} populateTabs={populateTabs} />
    );
    expect(wrapper.find('Button[title="Confirm Upload"]').exists()).toBeFalsy();
  });

  it("information uri field exists if owner ", () => {
    wrapper = shallow(
      <Datasetdetail details={details} populateTabs={populateTabs} />
    );
    expect(
      wrapper
        .find('div[className="col-4"]')
        .find('label[className="font-weight-bold"]')
        .at(6)
        .text()
    ).toBe("URI:");
  });

  it("testing copied to clipboard message when user click on copy icon", () => {
    expect(
      wrapper.find("WithStyles(ForwardRef(Tooltip))").prop("title").props
        .children
    ).toBe("Copied to Clipboard");
  });

  it("download csv icon doesn't exist", () => {
    wrapper = shallow(
      <Datasetdetail details={details} populateTabs={populateTabs} />
    );
    expect(wrapper.find("CloudDownloadIcon").exists()).toBeFalsy();
  });

  it("testing with dlp job status- review denied", () => {
    details.dlp.dlp_job_status = "review-denied";
    wrapper = shallow(
      <Datasetdetail details={details} populateTabs={populateTabs} />
    );
    expect(wrapper.find('[title="Upload another file"]').exists()).toBeFalsy();
  });

  it("calls requestStatus api when type is FILE_DATASET", () => {
    Actions.requestStatus = jest.fn();
    wrapper = shallow(
      <Datasetdetail details={details} populateTabs={populateTabs} />
    );
    expect(Actions.requestStatus.mock.calls.length).toBe(0);
  });
});
