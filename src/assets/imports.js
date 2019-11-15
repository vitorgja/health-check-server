// "USE STRICT";
if (typeof module === 'object') {
    window.module = module;
    module = undefined;
}
const path = window.require('path');
const sqlite = window.require('sqlite-sync');

if (window.module) module = window.module;
