function setUpBlock() {
  Blockly.Blocks['banana1'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("香蕉[1]");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
  Blockly.Blocks['banana2'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("香蕉[2]");
      this.setOutput(true, null);
      this.setColour(230);
   this.setTooltip("");
   this.setHelpUrl("");
    }
  };
Blockly.Blocks['lion'] = {
  init: function() {
    this.appendValueInput("state")
        .setCheck(null)
        .appendField("獅子");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
     }
   };
Blockly.Blocks['goat'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("山羊");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
      }
    };
Blockly.Blocks['monkey'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("猴子");
    this.setOutput(true, null);
    this.setColour(230);
    this.setTooltip("");
    this.setHelpUrl("");
      }
    };
 Blockly.Blocks['sleep'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("睡覺狀態");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['wait'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("等待");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['step'] = {
  init: function() {
    this.appendValueInput("object")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("走");
    this.appendValueInput("step_number")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("步");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};
Blockly.Blocks['is_green'] = {
  init: function() {
    this.appendValueInput("greenField")
        .setCheck(null);
    this.appendDummyInput()
        .appendField("是綠色的?");
    this.setOutput(true, null);
    this.setColour(230);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};



  Blockly.JavaScript['goat'] = (block) => 'goat';
  Blockly.JavaScript['monkey'] = (block) => 'monkey';
  Blockly.JavaScript['banana1'] = (block) => 'banana1';
  Blockly.JavaScript['banana2'] = (block) => 'banana2';
  Blockly.JavaScript['wait'] = (block) => 'console.log("等待中");';
  Blockly.JavaScript['sleep'] = (block) => 'lion_sleep';
  Blockly.JavaScript['is_green'] = (block) => {
    function sendFunction(state) {
      const diveValue = `diveState[${state}]["is_green"]["value"]`;
      const readDiveData = `eval('diveLinker.Get(diveState[${state}]["is_green"]["diveID"])');`;
      const compareValue = `(parseInt(diveState[${state}]['is_green']['value']) === 1);`;
      return `(function () {${diveValue} = ${readDiveData} return ${compareValue}})()`;
    }
    try {
      const state = Blockly.JavaScript.statementToCode(block, 'greenField', Blockly.JavaScript.ORDER_ATOMIC).trim().replace(/^'/,"").replace(/'$/,"")
      return sendFunction("'" + state + "'")
    }
    catch (e) {
      const state = Blockly.JavaScript.valueToCode(block, 'greenField', Blockly.JavaScript.ORDER_ATOMIC);
      return sendFunction(state)
    }
  };
  Blockly.JavaScript['lion'] = (block) => {
    function sendFunction(state) {
      const diveData = eval(`diveState[${state}]`);
      const diveID = diveData['sleep']['diveID'];
      eval(`diveState[${state}]['sleep']['value'] = eval('diveLinker.Get(${diveID})');`);
      return `(diveState[${state}]['sleep']['value'] === 1)`;
    }
    try {
      const state = Blockly.JavaScript.statementToCode(block, 'state', Blockly.JavaScript.ORDER_ATOMIC).trim().replace(/^'/,"").replace(/'$/,"")
      return sendFunction("'" + state + "'")
    }
    catch (e) {
      const state = Blockly.JavaScript.valueToCode(block, 'state', Blockly.JavaScript.ORDER_ATOMIC);
      return sendFunction(state)
    }
  };
  Blockly.JavaScript['step'] = (block) => {
    try {
      const object = Blockly.JavaScript.statementToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC).trim()
      const num = Blockly.JavaScript.valueToCode(block, 'step_number', Blockly.JavaScript.ORDER_ATOMIC);
      const sendCode = `diveLinker.Send(parseInt(diveState['${object}']['move']['diveID']),${num});`;
      return `generalPromise.then(()=>{${sendCode}})`;
    }
    catch (e) {
      const object = Blockly.JavaScript.valueToCode(block, 'object', Blockly.JavaScript.ORDER_ATOMIC).trim()
      const num = Blockly.JavaScript.valueToCode(block, 'step_number', Blockly.JavaScript.ORDER_ATOMIC);
      const sendCode = `diveLinker.Send(parseInt(diveState['${object}']['move']['diveID']),${num});`;
      return `generalPromise.then(()=>{${sendCode}})`;
    }
  };
}

const diveState = {
  'lion_sleep': {
    sleep: {
      diveID: '1539592634354',
      value: ''
    }
  },
  'goat': {
    move: {
      diveID: '1511104738945',
      value: ''
    }
  },
  'monkey': {
    move: {
      diveID: '1511104362549',
      value: ''
    }
  },
  'banana1': {
    is_green: {
      diveID: '1539786384490  ',
      value: ''
    }
  },
  'banana2': {
    is_green: {
      diveID: '1539594937115',
      value: ''
    }
  },
};

const xml = `<xml xmlns="http://www.w3.org/1999/xhtml" id="toolbox" style="display: none;">
<category name="語意">
<block type="banana1"></block>
<block type="banana2"></block>
<block type="lion"></block>
<block type="goat"></block>
<block type="monkey"></block>
<block type="wait"></block>
<block type="sleep"></block>
<block type="is_green"></block>
<block type="step"></block>
</category>
<category name="邏輯">
  <block type="controls_if"></block>
  <block type="logic_compare">
    <field name="OP">EQ</field>
  </block>
  <block type="logic_operation">
    <field name="OP">AND</field>
  </block>
  <block type="logic_boolean">
    <field name="BOOL">TRUE</field>
  </block>
</category>
<category name="迴圈">
  <block type="controls_whileUntil">
    <field name="MODE">WHILE</field>
  </block>
  <block type="controls_repeat_ext">
    <value name="TIMES">
      <shadow type="math_number">
        <field name="NUM">10</field>
      </shadow>
    </value>
    <statement name="DO">
      <block type="controls_flow_statements">
        <field name="FLOW">BREAK</field>
      </block>
    </statement>
  </block>
  <block type="controls_forEach">
    <field name="VAR" id="Lq(*:4#{IgmuKrnt*/yw" variabletype="">i</field>
  </block>
  <block type="controls_repeat_ext">
    <value name="TIMES">
      <shadow type="math_number">
        <field name="NUM">10</field>
      </shadow>o0
    </value>
  </block>
</category>
<category name="數學">
  <block type="math_number">
    <field name="NUM">0</field>
  </block>
  <block type="math_arithmetic">
    <field name="OP">ADD</field>
    <value name="A">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
    <value name="B">
      <shadow type="math_number">
        <field name="NUM">1</field>
      </shadow>
    </value>
  </block>
</category>
<category name="文字">
    <block type="text_charAt">
      <mutation at="true"></mutation>
      <field name="WHERE">FROM_START</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="t2r9UiF+hb}NLt%[*SJC" variabletype="">text</field>
        </block>
      </value>
    </block>
    <block type="text">
      <field name="TEXT"></field>
    </block>
    <block type="text_append">
      <field name="VAR" id="^~1LG$HUI|D-WScPOx[x" variabletype="">item</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT"></field>
        </shadow>
      </value>
    </block>
    <block type="text_length">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_isEmpty">
      <value name="VALUE">
        <shadow type="text">
          <field name="TEXT"></field>
        </shadow>
      </value>
    </block>
    <block type="text_indexOf">
      <field name="END">FIRST</field>
      <value name="VALUE">
        <block type="variables_get">
          <field name="VAR" id="t2r9UiF+hb}NLt%[*SJC" variabletype="">text</field>
        </block>
      </value>
      <value name="FIND">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_join">
      <mutation items="2"></mutation>
    </block>
    <block type="text_getSubstring">
      <mutation at1="true" at2="true"></mutation>
      <field name="WHERE1">FROM_START</field>
      <field name="WHERE2">FROM_START</field>
      <value name="STRING">
        <block type="variables_get">
          <field name="VAR" id="t2r9UiF+hb}NLt%[*SJC" variabletype="">text</field>
        </block>
      </value>
    </block>
    <block type="text_changeCase">
      <field name="CASE">UPPERCASE</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_trim">
      <field name="MODE">BOTH</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_print">
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
    <block type="text_prompt_ext">
      <mutation type="TEXT"></mutation>
      <field name="TYPE">TEXT</field>
      <value name="TEXT">
        <shadow type="text">
          <field name="TEXT">abc</field>
        </shadow>
      </value>
    </block>
  </category>
<category name="列表">
  <block type="lists_create_with">
    <mutation items="0"></mutation>
  </block>
  <block type="lists_create_with">
    <mutation items="3"></mutation>
  </block>
  <block type="lists_length"></block>
  <block type="lists_isEmpty"></block>
</category>
<category name="函數" custom="PROCEDURE"></category>
<category name="變數" custom="VARIABLE"></category>
</xml>`;

 const xmlText2 = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables><variable type="" id="Lq(*:4#{IgmuKrnt*/yw">i</variable></variables><block type="controls_forEach" id="[F(*N8?q@1-uA)Fb.(4H" x="15" y="75"><field name="VAR" id="Lq(*:4#{IgmuKrnt*/yw" variabletype="">i</field><value name="LIST"><block type="lists_create_with" id="QQR2GnT*~@U$VJ54~L3s"><mutation items="2"></mutation><value name="ADD0"><block type="banana1" id="(@J)H4|;p6kjL)XQA]:y"></block></value><value name="ADD1"><block type="banana2" id="VO%Bu9E1D{*E?PX6e+mI"></block></value></block></value><statement name="DO"><block type="controls_whileUntil" id="VSz1{`DnJp`?fYP70:s("><field name="MODE">UNTIL</field><value name="BOOL"><block type="lion" id="r.ci$5#{]{Fhk7n]7$2a"><value name="state"><block type="sleep" id="(zG{8Ue,MBI:n5`nv/-s"></block></value></block></value><statement name="DO"><block type="wait" id="c?y5LmyvqVtLOQU9G1k["><value name="object"><block type="goat" id="k::5;3G,x{t--6{a%ye,"></block></value><next><block type="wait" id="zfCA:%3j2JWmXUkE3PVC"><value name="object"><block type="monkey" id="-$A+a`EsSexvF:$pYf+0"></block></value></block></next></block></statement><next><block type="controls_if" id="-yX)NU8EJ8/xh}mX3c|6"><mutation else="1"></mutation><value name="IF0"><block type="is_green" id="@eJ4|xr,cvHk.orJeEOA"><value name="greenField"><block type="variables_get" id="5cq`^.}HMSEtHz1/px%e"><field name="VAR" id="Lq(*:4#{IgmuKrnt*/yw" variabletype="">i</field></block></value></block></value><statement name="DO0"><block type="step" id="d)RKF.:yn;3f7~xJ=;L["><value name="object"><block type="goat" id="CJTwAz@fXL7?Ot`G-c;B"></block></value><value name="step_number"><block type="math_number" id="XHM3RdQOAp)tqAC:DKDp"><field name="NUM">21</field></block></value></block></statement><statement name="ELSE"><block type="step" id="JLJqTAD}5d,?.X-tvE4f"><value name="object"><block type="monkey" id="fw8D!u=Y2zFsoa.is8h="></block></value><value name="step_number"><block type="math_number" id="JUeaYUfJ?uA_Gx6BOq1n"><field name="NUM">21</field></block></value></block></statement></block></next></block></statement></block></xml>';
//  const xmlText2 = '<xml xmlns="http://www.w3.org/1999/xhtml"><variables></variables><block type="step" id="JLJqTAD}5d,?.X-tvE4f" x="105" y="225"><value name="object"><block type="monkey" id="fw8D!u=Y2zFsoa.is8h="></block></value><value name="step_number"><block type="math_number" id="JUeaYUfJ?uA_Gx6BOq1n"><field name="NUM">21</field></block></value></block></xml>';
