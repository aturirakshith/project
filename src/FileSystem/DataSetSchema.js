import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { BrowserRouter as Router } from "react-router-dom";
import DatasetSchema from "../DatasetSchema";
import * as config from "../../../utils/AppConfig";

const streamDatasetResponse = [
  {
    transactionData: [
      {
        iovation_Data: [
          {
            id: "2d0182ef-0e8f-4ed3-b358-bb2eedde34df",
            validationRules: [],
            name: "iovation_ruleset_typ",
            isPCI: false,
            elementType: "STREAM_DATASET_ATTRIBUTE",
            isActive: true,
            elementDataType: "Text",
            elementLength: 50,
            dataClassificationType: "PCI",
            creationTime: "2021-05-13T07:38:15.877-07:00-07",
          },
        ],
      },
    ],
  },
  {
    CustomerData: [
      {
        id: "fc06d2d1-397c-44e8-8b3c-f51538a804fd",
        validationRules: [],
        name: "interactionID",
        isPCI: false,
        elementType: "STREAM_DATASET_ATTRIBUTE",
        isActive: true,
        elementDataType: "Text",
        elementLength: 50,
        dataClassificationType: "PCI",
        creationTime: "2021-05-05T12:22:37.691-07:00-07",
      },
    ],
  },
  {
    id: "ad7cb877-4e28-448d-b663-3a82f69dc93e",
    validationRules: [],
    name: "device_id",
    isPCI: false,
    elementType: "STREAM_DATASET_ATTRIBUTE",
    isActive: true,
    elementDataType: "Text",
    elementLength: 50,
    dataClassificationType: "PCI",
    creationTime: "2021-05-13T07:38:15.759-07:00-07",
  },
];
const mockStore = configureStore([thunk]);
let store;
let wrapper;
let initialState = {
  MainReducer: {
    schemaAttributes: [
      {
        elementType: "DATASET_ATTRIBUTE",
        id: "0965f468-9c65-4a03-9dcd-c1f9407c1b47",
        isPCI: false,
        name: "fax1",
        position: 1,
        type: "STRING",
        classification: "ABCD",
        preAppliedSecurity: "test",
      },
    ],
  },
  DatasetReducer: {
    schemaLoader: false,
  },
};

describe("<DatasetSchema/> Testing", () => {
  it("renders correctly", () => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <DatasetSchema />
        </Router>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
  it("renders correctly if datasourceFlow is true and without parameters", () => {
    initialState.MainReducer.schemaAttributes = [{}];
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <DatasetSchema datasourceFlow={true} />
        </Router>
      </Provider>
    );
    expect(store.getActions()).toEqual([
      { feature: "schemaLoader", payload: true, type: "SET_SMALL_LOADER" },
      { payload: [], type: "SET_SCHEMA_ATTRIBUTES" },
    ]);
  });
  it("Classification column to be displayed if type is FILE_DATASET", () => {
    (initialState.MainReducer.schemaAttributes = [
      {
        elementType: "DATASET_ATTRIBUTE",
        id: "0965f468-9c65-4a03-9dcd-c1f9407c5h47",
        isPCI: false,
        name: "fax1",
        position: 1,
        type: "STRING",
        classification: "ABCD",
        preAppliedSecurity: "test",
        metasheetClassification: "test",
      },
      {
        elementType: "DATASET_ATTRIBUTE",
        id: "0965f468-9c65-4a03-9dcd-c1f9407o5h47",
        isPCI: true,
        name: "fax1",
        position: 1,
        type: "STRING",
        classification: "ABCD",
      },
    ]),
      (store = mockStore(initialState));
    config.REACT_SHOW_DATASETS_SCHEMA_PRE_APPLIED_SECURITY = true;
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <DatasetSchema details={{ type: "FILE_DATASET" }} />
        </Router>
      </Provider>
    );
    expect(
      wrapper
        .find('table[aria-label="custom pagination table"]')
        .find("thead")
        .find("tr")
        .find("th")
        .at(4)
        .text()
        .trim()
    ).toBe("Pre Applied Security");
    expect(
      wrapper
        .find('table[aria-label="custom pagination table"]')
        .find("thead")
        .find("tr")
        .find("th")
        .at(5)
        .text()
        .trim()
    ).toBe("Metasheet Classification");
  });
  it("Validated Classification column to be displayed if type is FILE_METASHEET_DATASET", () => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <DatasetSchema
            details={{ type: "FILE_METASHEET_DATASET" }}
            datasourceFlow={true}
          />
        </Router>
      </Provider>
    );
    expect(
      wrapper
        .find('table[aria-label="custom pagination table"]')
        .find("thead")
        .find("tr")
        .find("th")
        .at(3)
        .text()
        .trim()
    ).toBe("Validated Classification");
  });
  it("Classification column to be displayed if type is FILE_DATASET", () => {
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <DatasetSchema details={{ type: "FILE_DATASET" }} />
        </Router>
      </Provider>
    );
    expect(
      wrapper
        .find('table[aria-label="custom pagination table"]')
        .find("thead")
        .find("tr")
        .find("th")
        .at(3)
        .text()
        .trim()
    ).toBe("Classification");
  });
  it("SChema Attributes should be displayed if Schema attributes are present", () => {
    if (config.REACT_SHOW_DATASETS_SCHEMA_PRE_APPLIED_SECURITY) {
      store = mockStore(initialState);
      wrapper = mount(
        <Provider store={store}>
          <Router>
            <DatasetSchema details={{ details: { type: "" } }} />
          </Router>
        </Provider>
      );
      expect(
        wrapper
          .find('table[aria-label="custom pagination table"]')
          .find("thead")
          .find("tr")
          .find("th")
          .at(4)
          .text()
          .trim()
      ).toBe("Pre Applied Security");
      expect(
        wrapper
          .find('table[aria-label="custom pagination table"]')
          .find("tbody")
          .find("tr")
          .at(0)
          .find("td")
          .at(4)
          .text()
      ).toBe("test");
    }
  });
});

describe("with type 'STREAM_DATASET' ", () => {
  it("and type of data is object and without id", () => {
    initialState.MainReducer.schemaAttributes = { test: "" };
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <DatasetSchema
            datasourceFlow={true}
            details={{ type: "STREAM_DATASET" }}
          />
        </Router>
      </Provider>
    );
  });
  it("and type of data is object and with id", () => {
    initialState.MainReducer.schemaAttributes = {
      test: "",
      id: "123",
      isPCI: true,
    };
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <DatasetSchema
            datasourceFlow={true}
            details={{ type: "STREAM_DATASET" }}
          />
        </Router>
      </Provider>
    );
    expect(
      wrapper
        .find('table[aria-label="custom pagination table"]')
        .find("thead")
        .find("tr")
        .find("th")
        .at(3)
        .text()
        .trim()
    ).toBe("Group Name");
  });
  it("and type of data is object and without id", () => {
    initialState.MainReducer.schemaAttributes = streamDatasetResponse;
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <DatasetSchema
            datasourceFlow={true}
            details={{ type: "STREAM_DATASET" }}
          />
        </Router>
      </Provider>
    );
    expect(
      wrapper
        .find('table[aria-label="custom pagination table"]')
        .find("thead")
        .find("tr")
        .find("th")
        .at(4)
        .text()
        .trim()
    ).toBe("Parent Group Name");
  });
});

describe("null scenarios", () => {
  it("without data", () => {
    initialState.MainReducer.schemaAttributes = [];
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <DatasetSchema />
        </Router>
      </Provider>
    );
    const table = wrapper.find("table");
    expect(table).toHaveLength(0);
  });
  it("Schema Attributes should not be displayed if loader is true", () => {
    initialState.DatasetReducer.schemaLoader = true;
    store = mockStore(initialState);
    wrapper = mount(
      <Provider store={store}>
        <Router>
          <DatasetSchema />
        </Router>
      </Provider>
    );
    const table = wrapper.find("table");
    expect(table).toHaveLength(0);
  });
});
