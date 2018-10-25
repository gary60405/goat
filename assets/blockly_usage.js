let workspace = null;

function init() {
    setUpBlock();
    workspace = Blockly.inject('blocklyDiv', {
      toolbox: Blockly.Xml.textToDom(xml),
      trashcan: true,
      grid: {
        spacing: 30,
        length: 3,
        colour: '#39261f',
        snap: true
      },
      zoom: {
        controls: true,
        wheel: true,
        startScale: 1.0,
        maxScale: 1.2,
        minScale: 0.8,
        scaleSpeed: 1.2
      },
  });
  Blockly.Xml.appendDomToWorkspace(Blockly.Xml.textToDom(xmlText2), workspace);
}

function getCode() {
  console.log(Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(workspace)));
  return Blockly.JavaScript.workspaceToCode(workspace);
}




