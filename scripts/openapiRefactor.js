import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import * as PromptSync from "prompt-sync";
// Define the path to the YAML file to parse
const inputFilePath = path.normalize(process.argv[2]);
const outputDir = path.normalize(process.argv[3] ?? './output/');
const name = process.argv[4] ?? 'main';
const prompt = PromptSync.default({ sigint: true, });
// Read the file contents
const fileContents = fs.readFileSync(inputFilePath, 'utf8');
// Parse the YAML data into a JavaScript object
const data = yaml.load(fileContents);
if (fs.existsSync(outputDir)) {
    console.log('OutputDir exists: ', outputDir);
    // const deleteConsent = prompt('Delete everything inside? Y/n', 'y').trim().toLowerCase();
    // abort
    // if(deleteConsent !== 'y') process.exit(-1);
    fs.rmSync(outputDir, { recursive: true, force: true });
    console.log('OutputDir removed');
}
fs.mkdirSync(outputDir, { recursive: true });
console.log('OutputDir created:', outputDir);
function apiPath2Ref(apiPath) {
    let ref = '';
    const parts = apiPath.split('/').filter(x => x.length > 0);
    for (const part of parts) {
        if (ref.length > 0)
            ref += '_';
        if (part === '{id}')
            ref += 'index';
        else {
            ref += part;
        }
    }
    return ref;
}
function extractPaths(paths) {
    const apiPaths = Object.keys(paths);
    for (const apiPath of apiPaths) {
        const content = data.paths[apiPath];
        const refName = apiPath2Ref(apiPath);
        const ref = './paths/' + refName + '.yml';
        const targetPath = path.resolve(outputDir, ref);
        const targetDir = path.dirname(targetPath);
        data.paths[apiPath] = {
            '$ref': ref
        };
        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }
        extractResourcesFromPath(content, refName, targetDir);
        fs.writeFileSync(targetPath, yaml.dump(content), { encoding: 'utf-8' });
    }
}
function extractResourcesFromPath(content, refName, targetDir) {
    const quantifier = refName.endsWith('_index') ? 'one' : 'many';
    const name = refName.endsWith('_index') ? refName.substring(0, refName.length - '_index'.length) : refName;
    const dirDepth = targetDir.split(/[/\\]/).length - outputDir.split(/[/\\]/).length;
    const resourceBasePath = Array.from(Array(dirDepth).keys()).map(() => '../').join('') + 'resources';
    const resourcePath = resourceBasePath + '/' + name + '/';
    const resourceErrorPath = resourceBasePath + '/error/';
    const methods = ['get', 'post', 'delete', 'put'];
    for (const method of methods) {
        if (method !== 'get')
            continue; // TODO
        const methodObj = content[method];
        if (methodObj) {
            methodObj.summary = !methodObj.summary || methodObj.summary.trim().length === 0 || methodObj.summary === 'Fetch Collection' ? ('Get ' + name + (quantifier === 'many' ? ' Collection' : '')) : methodObj.summary;
            methodObj.description = !methodObj.description || methodObj.description.trim().length === 0 ? (quantifier === 'many'
                ? 'Get a collection of ' + name + ' resources'
                : 'Get ' + name + ' resource') : methodObj.description;
            const targetPath = path.resolve(targetDir, resourcePath, quantifier + '.yml');
            const resourcePathAbsolute = path.resolve(targetDir, resourcePath);
            if (!fs.existsSync(resourcePathAbsolute)) {
                fs.mkdirSync(resourcePathAbsolute, { recursive: true });
            }
            const responses = Object.keys(methodObj.responses);
            for (const response of responses) {
                if (response === '200') {
                    if (!fs.existsSync(targetPath)) {
                        const resourceSchema = methodObj.responses['200'].content['application/vnd.api+json'].schema;
                        fs.writeFileSync(targetPath, yaml.dump(resourceSchema), { encoding: 'utf-8' });
                    }
                    methodObj.responses['200'].content['application/vnd.api+json'].schema = {
                        '$ref': resourcePath + quantifier + '.yml'
                    };
                }
                else {
                    const errorTargetDir = path.resolve(targetDir, resourceBasePath, 'error');
                    const errorTargetPath = path.resolve(errorTargetDir, response + '.yml');
                    if (!fs.existsSync(errorTargetDir)) {
                        fs.mkdirSync(errorTargetDir, { recursive: true });
                    }
                    if (!fs.existsSync(errorTargetPath)) {
                        const resourceSchema = methodObj.responses[response].content['application/vnd.api+json'].schema;
                        fs.writeFileSync(errorTargetPath, yaml.dump(resourceSchema), { encoding: 'utf-8' });
                    }
                    methodObj.responses[response].content['application/vnd.api+json'].schema = {
                        '$ref': resourceErrorPath + response + '.yml'
                    };
                }
            }
        }
    }
}
extractPaths(data.paths);
fs.writeFileSync(path.resolve(outputDir, name + '.yml'), yaml.dump(data), { encoding: 'utf-8' });
//# sourceMappingURL=openapiRefactor.js.map