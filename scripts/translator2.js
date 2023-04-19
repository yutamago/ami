import * as fs from 'fs';
import * as path from 'path';
// Define the namespace you want to search for
const namespace = process.argv[2];
// Define the directory to search in
const directoryToSearch = process.argv[3];
// Define the file extensions to search for
const fileExtensions = ['.h' /*, '.cpp', '.hpp'*/];
// Define the regex pattern to match function signatures
const functionArgsRegex = /((?<modifier>[\w_]+)\s+)?(?<type>[\w:<>_&]+)\s+(?<name>[\w:<>_]+)/g;
const functionSignatureRegex = /\b(?<type>[\w:]+)\s+(?<name>[\w:]+)\s*\((?<args>[^)]*)\)\s*(const)?;/g;
const namespaceHeaderRegex = /namespace (?<name>[\w:][^{ ]*)\s*\{/g;
console.log('namespace to search', namespace);
console.log('directory to search', directoryToSearch);
// Define a function to recursively search a directory for files with specified extensions
function findFilesRecursively(dir, extensions) {
    let files = [];
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            files = files.concat(findFilesRecursively(fullPath, extensions));
        }
        else {
            if (extensions.includes(path.extname(fullPath))) {
                files.push(fullPath);
            }
        }
    });
    return files;
}
function extractFunctionArgs(argsContent) {
    const functionArgs = [];
    let argsSplit = argsContent.split(',');
    for (let arg of argsSplit) {
        let matches = arg.replace(/^\s*const/g, '').matchAll(functionArgsRegex);
        for (let match of matches) {
            // const modifier = match.groups.modifier;
            const type = match.groups.type.replace(/^(std::wstring|std::string|std::string_view)$/, 'string').replace(/^(std::vector<int>)$/, 'number[]').replace(/^(std::vector<std::wstring>)$/, 'string[]').replace(/::/g, '.').replace(/^(bool|BOOL)$/, 'boolean').replace(/^(int|time_t|float|HWND|UINT|INT_PTR)$/, 'number');
            const name = match.groups.name;
            functionArgs.push(`${name}: ${type}`);
        }
    }
    return functionArgs;
}
function extractFunctionSignatures(namespaceContent) {
    let matches = namespaceContent.matchAll(functionSignatureRegex);
    const functionSignatures = [];
    for (let match of matches) {
        const type = match.groups.type.replace(/^(std::wstring|std::string|std::string_view)$/, 'string').replace(/^(std::vector<int>)$/, 'number[]').replace(/^(std::vector<std::wstring>)$/, 'string[]').replace(/::/g, '.').replace(/^(bool|BOOL)$/, 'boolean').replace(/^(int|time_t|float|HWND|UINT|INT_PTR)$/, 'number');
        const name = match.groups.name.replace(/\s/g, '');
        const args = extractFunctionArgs(match.groups.args);
        if (type === 'public:' || type === 'private:')
            continue;
        functionSignatures.push(`${name}(${args.join(', ')}): ${type}`);
    }
    return functionSignatures;
}
// Define a function to extract function signatures from a file
function extractNamespaces(filePath) {
    const contents = fs.readFileSync(filePath, 'utf-8');
    let matches = contents.matchAll(namespaceHeaderRegex);
    const namespaces = [];
    for (let match of matches) {
        const name = match.groups.name;
        let start = match.index + match[0].length;
        let end = start;
        let scopeNum = 1;
        while (scopeNum > 0) {
            const contentChar = contents[end++];
            if (contentChar === '}')
                scopeNum--;
            else if (contentChar === '{')
                scopeNum++;
        }
        const content = contents.substring(start, end);
        namespaces.push({ name: name, /*content: content, */ functions: extractFunctionSignatures(content) });
    }
    return namespaces;
}
// Find all files with specified extensions in the directory and its subdirectories
const files = findFilesRecursively(directoryToSearch, fileExtensions);
// Extract function signatures from files that contain the specified namespace
const namespaces = new Map();
files.forEach(filePath => {
    const namespacesLocal = extractNamespaces(filePath);
    namespacesLocal.forEach(namespace => {
        if (namespaces.has(namespace.name)) {
            namespaces.get(namespace.name).functions.push(...namespace.functions);
        }
        else {
            namespaces.set(namespace.name, namespace);
        }
        namespaces.get(namespace.name).functions = [...new Set(namespaces.get(namespace.name).functions).keys()].sort();
    });
});
// Print the function signatures
namespaces.forEach(namespace => {
    let output = '';
    const namespaceParts = namespace.name.split('::');
    for (let i = 0; i < namespaceParts.length; i++) {
        const indent = Array.from(Array(i).keys()).map(() => '\t').join('');
        const namespacePart = namespaceParts[i];
        output += `${indent}export namespace ${namespacePart} {\r\n`;
    }
    const indentFunctions = Array.from(Array(namespaceParts.length).keys()).map(() => '\t').join('');
    for (const function1 of namespace.functions) {
        output += `${indentFunctions}export function ${function1};\r\n`;
    }
    for (let i = namespaceParts.length - 1; i >= 0; i--) {
        const indent = Array.from(Array(i).keys()).map(() => '\t').join('');
        output += `${indent}}\r\n`;
    }
    console.log(output);
});
//# sourceMappingURL=translator2.js.map