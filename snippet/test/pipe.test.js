const pipe = require("../index.js").pipe;
const getAllIds = require("../index.js").getAllIds;

describe("pipe()", () => {
  const functionSpy1 = sinon.spy();
  const functionSpy2 = sinon.spy();
  const result = pipe(functionSpy1, functionSpy2);

  it("returns a function", () => {
    expect(typeof result).toBe("function");
  });

  it("calls all functions that are provided as arguments", () => {
    const calledResult = result();
    expect(functionSpy1.calledOnce).toBe(true);
    expect(functionSpy2.calledOnce).toBe(true);
  });
});

// Pipe function unit tests
describe("getAllIds()", function() {
  const EMOJION_ID = "emojion";

  var state = {
    dom: { mounts: [], containers: [] },
    emojis: {}
  };

  // stub out a dummy dom. Someday this could be moved to a helper file.
  document.body.innerHTML =
    "<div>" +
    '  <span id="emojion_dlkfjo2" />' +
    '  <button id="emojion_2902s" />' +
    "</div>";

  it("returns a mounts array with at least one mounting point", function() {
    getAllIds(state);
    expect(state.dom.mounts.length).toBeGreaterThan(0);
  });

  it("finds a dom element with an emojion id", function() {
    const alteredState = getAllIds(state);
    expect(alteredState.dom.mounts[0].id).toBe("emojion_dlkfjo2");
  });
});
