/**
 * @license
 * Custom RoboMind Generator
 */

import {Order} from 'blockly/javascript';

// Create an object to store RoboMind generators
export const forBlock = Object.create(null);

// Generator for the 'add_text' block (example)
forBlock['add_text'] = function (block, generator) {
  const text = generator.valueToCode(block, 'TEXT', Order.NONE) || "''";
  return `say ${text}\n`; // Converts to RoboMind "say" command
};

// Example: Moving RoboMind forward
forBlock['move_forward'] = function (block, generator) {
  const steps = generator.valueToCode(block, 'STEPS', Order.NONE) || '1';
  return `forward ${steps}\n`;
};

// Example: Turning RoboMind left
forBlock['turn_left'] = function (block, generator) {
  return `left\n`;
};

// Example: Turning RoboMind right
forBlock['turn_right'] = function (block, generator) {
  return `right\n`;
};

// Example: Repeat loop
forBlock['controls_repeat_ext'] = function (block, generator) {
  const times = generator.valueToCode(block, 'TIMES', Order.NONE) || '1';
  const statements = generator.statementToCode(block, 'DO');
  return `repeat ${times} {\n${statements}}\n`;
};
