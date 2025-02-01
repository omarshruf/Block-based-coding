import * as Blockly from "blockly";
import * as BlocklyJavaScript from "blockly/javascript";

document.addEventListener("DOMContentLoaded", () => {
    const conditions = [
        "leftisobstacle", "leftisclear", "leftisbeacon", "leftiswhite", "leftisblack",
        "frontisobstacle", "frontisclear", "frontisbeacon", "frontiswhite", "frontisblack",
        "rightisobstacle", "rightisclear", "rightisbeacon", "rightiswhite", "rightisblack"
    ];

    conditions.forEach(condition => {
        Blockly.Blocks[condition] = {
            init: function () {
                this.appendDummyInput().appendField(condition);
                this.setOutput(true, "Boolean");
                this.setColour(180);
            },
        };
        BlocklyJavaScript.javascriptGenerator.forBlock[condition] = function () {
            return [condition + "()", BlocklyJavaScript.javascriptGenerator.ORDER_ATOMIC];
        };
    });

    const originalWorkspaceToCode = BlocklyJavaScript.javascriptGenerator.workspaceToCode;
    BlocklyJavaScript.javascriptGenerator.workspaceToCode = function (workspace) {
        let code = originalWorkspaceToCode.call(this, workspace);
        conditions.forEach(condition => {
            const regex = new RegExp(condition + "\\(\\)\\s*;", "g");
            code = code.replace(regex, condition + "()");
        });
        return code;
    };
    
    Blockly.Blocks['end'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("end")
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
        }
    };

    Blockly.Blocks['move_forward'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Move Forward")
                .appendField(new Blockly.FieldNumber(0, 1), "VALUE"); 
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
        }
    };

    Blockly.Blocks['move_backward'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Move Backward")
                .appendField(new Blockly.FieldNumber(0, 1), "VALUE"); 
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
        }
    };

    Blockly.Blocks['turn_left'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Turn Left")
                .appendField(new Blockly.FieldNumber(0, 1), "VALUE"); 
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
        }
    };

    Blockly.Blocks['turn_right'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Turn Right")
                .appendField(new Blockly.FieldNumber(0, 1), "VALUE"); 
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
        }
    };

    Blockly.Blocks['paint_white'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Paint White");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
        }
    };

    Blockly.Blocks['paint_black'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Paint Black");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
        }
    };

    Blockly.Blocks['pick_up'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Pick Up");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
        }
    };

    Blockly.Blocks['put_down'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Put Down");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
        }
    };

    Blockly.Blocks['eat_up'] = {
        init: function() {
            this.appendDummyInput()
                .appendField("Eat Up");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(120);
        }
    };

    
    BlocklyJavaScript.javascriptGenerator.forBlock['end'] = function(block) {
        return `end\n`;
    };

    BlocklyJavaScript.javascriptGenerator.forBlock['move_forward'] = function(block) {
        const value = block.getFieldValue("VALUE") || 0; 
        return `forward(${value})\n`;
    };

    BlocklyJavaScript.javascriptGenerator.forBlock['move_backward'] = function(block) {
        const value = block.getFieldValue("VALUE") || 0; 
        return `backward(${value})\n`;
    };

    BlocklyJavaScript.javascriptGenerator.forBlock['turn_left'] = function(block) {
        const value = block.getFieldValue("VALUE") || 0; 
        return `left(${value})\n`;
    };

    BlocklyJavaScript.javascriptGenerator.forBlock['turn_right'] = function(block) {
        const value = block.getFieldValue("VALUE") || 0; 
        return `right(${value})\n`;
    };

    BlocklyJavaScript.javascriptGenerator.forBlock['paint_white'] = function() {
        return 'paintWhite()\n';
    };

    BlocklyJavaScript.javascriptGenerator.forBlock['paint_black'] = function() {
        return 'paintBlack()\n';
    };

    BlocklyJavaScript.javascriptGenerator.forBlock['pick_up'] = function() {
        return 'pickUp()\n';
    };

    BlocklyJavaScript.javascriptGenerator.forBlock['put_down'] = function() {
        return 'putDown()\n';
    };

    BlocklyJavaScript.javascriptGenerator.forBlock['eat_up'] = function() {
        return 'eatUp()\n';
    };

    const toolbox = `
        <xml id="toolbox" style="display: none">
            <category name="Movement" colour="120">
                <block type="move_forward"></block>
                <block type="move_backward"></block>
                <block type="turn_left"></block>
                <block type="turn_right"></block>
            </category>
            <category name="Orders" colour="120">
                <block type="paint_white"></block>
                <block type="paint_black"></block>
                <block type="pick_up"></block>
                <block type="put_down"></block>
                <block type="eat_up"></block>
            </category>
            <category name="Logic" colour="210">
                <block type="controls_if"></block>
                <block type="controls_repeat_ext"></block>
                <block type="logic_compare"></block>
                <block type="logic_operation"></block>
                <block type="logic_boolean"></block>
                <block type="end"></block>
                <block type="math_number">
                    <field name="NUM">10</field>
                </block>
                <block type="controls_whileUntil"></block>
            </category>
            <category name="Conditions" colour="180">
                <block type="leftisobstacle"></block>
                <block type="leftisclear"></block>
                <block type="leftisbeacon"></block>
                <block type="leftiswhite"></block>
                <block type="leftisblack"></block>
                <block type="frontisobstacle"></block>
                <block type="frontisclear"></block>
                <block type="frontisbeacon"></block>
                <block type="frontiswhite"></block>
                <block type="frontisblack"></block>
                <block type="rightisobstacle"></block>
                <block type="rightisclear"></block>
                <block type="rightisbeacon"></block>
                <block type="rightiswhite"></block>
                <block type="rightisblack"></block>
            </category>
            <category name="Variables" colour="330" custom="VARIABLE"></category>
            <category name="Functions" colour="290" custom="PROCEDURE"></category>
        </xml>
    `;

    
    const toolboxContainer = document.createElement("div");
    toolboxContainer.innerHTML = toolbox;
    document.body.appendChild(toolboxContainer);

    
    const workspace = Blockly.inject("blocklyDiv", {
        toolbox: document.getElementById("toolbox"),
    });
    
    document.getElementById("generateCode").addEventListener("click", () => {
        const code = BlocklyJavaScript.javascriptGenerator.workspaceToCode(workspace);
        document.getElementById("generatedCode").innerText = code;
    });

    Blockly.Blocks['declare_variable'] = {
        init: function () {
            this.appendDummyInput()
                .appendField("Declare variable")
                .appendField(new Blockly.FieldVariable("item"), "VAR");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(330);
        }
    };
    
    BlocklyJavaScript.javascriptGenerator.forBlock['declare_variable'] = function (block) {
        const variableName = BlocklyJavaScript.javascriptGenerator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
        return `var ${variableName}\n`;
    };
    
    Blockly.Blocks['set_variable'] = {
        init: function () {
            this.appendValueInput("VALUE")
                .setCheck(null)
                .appendField("Set")
                .appendField(new Blockly.FieldVariable("item"), "VAR")
                .appendField("to");
            this.setPreviousStatement(true, null);
            this.setNextStatement(true, null);
            this.setColour(330);
        }
    };
    
    BlocklyJavaScript.javascriptGenerator.forBlock['set_variable'] = function (block) {
        const variableName = BlocklyJavaScript.javascriptGenerator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
        const value = BlocklyJavaScript.javascriptGenerator.valueToCode(block, 'VALUE', BlocklyJavaScript.javascriptGenerator.ORDER_ATOMIC) || '0';
        return `${variableName} = ${value}\n`;
    };

    
    Blockly.Blocks['get_variable'] = {
        init: function () {
            this.appendDummyInput()
                .appendField(new Blockly.FieldVariable("item"), "VAR");
            this.setOutput(true, null);
            this.setColour(330);
        }
    };
    
    BlocklyJavaScript.javascriptGenerator.forBlock['get_variable'] = function (block) {
        const variableName = BlocklyJavaScript.javascriptGenerator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
        return [variableName, BlocklyJavaScript.javascriptGenerator.ORDER_ATOMIC];
    };    

    BlocklyJavaScript.javascriptGenerator.forBlock['controls_whileUntil'] = function(block) {
        const condition = BlocklyJavaScript.javascriptGenerator.valueToCode(block, 'BOOL', BlocklyJavaScript.javascriptGenerator.ORDER_NONE) || 'false';
        const statements = BlocklyJavaScript.javascriptGenerator.statementToCode(block, 'DO');
    
        return `repeat () {\n${statements}}\n`;
    };
    
    
    BlocklyJavaScript.javascriptGenerator.forBlock['controls_repeat_ext'] = function(block) {
        const repeatCount = BlocklyJavaScript.javascriptGenerator.valueToCode(block, 'TIMES', BlocklyJavaScript.javascriptGenerator.ORDER_NONE) || '0';
        const statements = BlocklyJavaScript.javascriptGenerator.statementToCode(block, 'DO');
    
        return `repeat (${repeatCount}) {\n${statements}}\n`;
    };
    
    BlocklyJavaScript.javascriptGenerator.forBlock['procedures_defnoreturn'] = function(block) {
        const functionName = block.getFieldValue('NAME'); 
        const statements = BlocklyJavaScript.javascriptGenerator.statementToCode(block, 'STACK');
    
        return `procedure ${functionName} () {\n${statements}}\n`;
    };

    BlocklyJavaScript.javascriptGenerator.forBlock['procedures_defreturn'] = function(block) {
        const functionName = block.getFieldValue('NAME'); 
        const statements = BlocklyJavaScript.javascriptGenerator.statementToCode(block, 'STACK');
        const returnValue = BlocklyJavaScript.javascriptGenerator.valueToCode(block, 'RETURN', BlocklyJavaScript.javascriptGenerator.ORDER_NONE) || '';
    
        return `procedure ${functionName} () {\n${statements}${returnValue ? 'return ' + returnValue + ';\n' : ''}}\n`;
    };  
    
    document.getElementById("exportData").addEventListener("click", () => {
        const xml = Blockly.Xml.workspaceToDom(workspace);
        const xmlText = Blockly.Xml.domToPrettyText(xml);
        const blob = new Blob([xmlText], { type: "text/xml" });
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = "blocks.xml";
        a.click();
    });

    document.getElementById("importData").addEventListener("click", () => {
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "text/xml";
        input.addEventListener("change", (event) => {
            const file = event.target.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = function (e) {
                const xmlText = e.target.result;
                const xml = Blockly.utils.xml.textToDom(xmlText);
                Blockly.Xml.clearWorkspaceAndLoadFromXml(xml, workspace);
            };
            reader.readAsText(file);
        });
        input.click();
    }); 
});
