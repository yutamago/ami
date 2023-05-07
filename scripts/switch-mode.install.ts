/**
 * Ausführen bevor wir Angular-CLI Zeug machen.
 */

import { readFileSync, writeFileSync } from 'fs';

// Pfad zur angular.json Datei
const pathToAngularJson = '../angular.json';

// Lese den Inhalt der angular.json-Datei
const angularJson = JSON.parse(readFileSync(pathToAngularJson, 'utf8'));

// Gehe durch jedes Projekt in der angular.json-Datei
for (const project of Object.keys(angularJson.projects)) {
  const projectConfig = angularJson.projects[project];

  // Gehe durch jede Konfiguration des Projekts
  for (const config of Object.keys(projectConfig.architect)) {
    const configObj = projectConfig.architect[config];

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
writeFileSync(pathToAngularJson, JSON.stringify(angularJson, null, 2));
