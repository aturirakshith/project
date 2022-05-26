import { shallow } from "enzyme";
import Foo, { Bar, func } from "./Foo";

// import defaultExport, {bar, foo} from '../foo-bar-baz';

// jest.mock('../foo-bar-baz', () => {
//   const originalModule = jest.requireActual('../foo-bar-baz');

//   //Mock the default export and named export 'foo'
//   return {
//     __esModule: true,
//     ...originalModule,
//     default: jest.fn(() => 'mocked baz'),
//     foo: 'mocked foo',
//   };
// });

jest.mock("./Foo", () => {
  const originalModule = jest.requireActual("./Foo.js");
  console.log({
    __esModule: true,
    ...originalModule,
    func: jest.fn(() => 105),
  });

  return {
    __esModule: true,
    ...originalModule,
    func: jest.fn().mockReturnValue(105),
  };
});

test("testing mock", () => {
  //func.mock.instances[0];
  //console.log("result-------------", func.mock);
  func.mockReturnValue(105);
  expect(func()).toBe(105);
});

describe("Foo test", () => {
  func.mockReturnValue(105);
  it("first test", () => {
    //obj.func = jest.fn(() => 100);
    //jest.spyOn(obj, "func").mockImplementation;

    const wrapper = shallow(<Foo />);

    console.log(wrapper.debug());

    expect(
      wrapper.contains(
        <div className="div-foo">
          <h1>Iam 105</h1>
        </div>
      )
    ).toEqual(true);
  });
  it("Bar test", () => {
    const wrapper = shallow(<Bar />);
    func.mockReturnValue(105);
    expect(
      wrapper.contains(
        <div className="div-foo">
          <h1>Iam foo</h1>
        </div>
      )
    ).toEqual(true);
  });

  // test("also mock implementation", () => {
  //   const mock = jest.fn().mockImplementation(() => "bar");

  //   expect(mock("foo")).toBe("bar");
  //   expect(mock).toHaveBeenCalledWith("foo");
  // });

  // test("mock implementation one time", () => {
  //   const mock = jest.fn().mockImplementationOnce(() => "bar");

  //   expect(mock("foo")).toBe("bar");
  //   expect(mock).toHaveBeenCalledWith("foo");

  //   expect(mock("baz")).toBe(undefined);
  //   expect(mock).toHaveBeenCalledWith("baz");
  // });
});
