"use strict";
exports.__esModule = true;
var fs_1 = require("fs");
// Pfad zur angular.json Datei
var pathToAngularJson = 'angular.json';
// Lese den Inhalt der angular.json-Datei
var angularJson = JSON.parse((0, fs_1.readFileSync)(pathToAngularJson, 'utf8'));
// Gehe durch jedes Projekt in der angular.json-Datei
for (var _i = 0, _a = Object.keys(angularJson.projects); _i < _a.length; _i++) {
    var project = _a[_i];
    var projectConfig = angularJson.projects[project];
    // Gehe durch jede Konfiguration des Projekts
    for (var _b = 0, _c = Object.keys(projectConfig.architect); _b < _c.length; _b++) {
        var config = _c[_b];
        var configObj = projectConfig.architect[config];
        // Ersetze "@angular-builders/custom-webpack:dev-server" durch "@angular-devkit/build-angular:dev-server"
        if (configObj.builder === '@angular-builders/custom-webpack:dev-server') {
            configObj.builder = '@angular-devkit/build-angular:dev-server';
        }
        // Ersetze "@angular-builders/custom-webpack:browser" durch "@angular-devkit/build-angular:browser"
        if (configObj.builder === '@angular-builders/custom-webpack:browser') {
            configObj.builder = '@angular-devkit/build-angular:browser';
        }
    }
}
// Speichere die geänderte angular.json-Datei
(0, fs_1.writeFileSync)(pathToAngularJson, JSON.stringify(angularJson, null, 2));
