import * as fs from 'fs';
import * as path from 'path';

interface NamespaceInfo {
  name: string;
  filePath: string;
}

function findNamespacesInFile(filePath: string): NamespaceInfo[] {
  const namespaces: NamespaceInfo[] = [];

  const contents = fs.readFileSync(filePath, 'utf8');
  const namespaceRegex = /namespace\s+(\w+)\s*\{/g;
  let match = namespaceRegex.exec(contents);
  while (match !== null) {
    const namespaceName = match[1];
    namespaces.push({
      name: namespaceName,
      filePath,
    });
    match = namespaceRegex.exec(contents);
  }

  return namespaces;
}

function findNamespacesInDirectory(dirPath: string): NamespaceInfo[] {
  const namespaces: NamespaceInfo[] = [];

  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isFile() && fullPath.endsWith('.cpp')) {
      const fileNamespaces = findNamespacesInFile(fullPath);
      namespaces.push(...fileNamespaces);
    } else if (entry.isDirectory()) {
      const subdirNamespaces = findNamespacesInDirectory(fullPath);
      namespaces.push(...subdirNamespaces);
    }
  }

  return namespaces;
}

function findAllUniqueNamespaces(dirPath: string): [string, NamespaceInfo][] {
  const namespaceInfos = findNamespacesInDirectory(dirPath);
  const uniqueNamespaces = new Map<string, NamespaceInfo>();
  for (const namespaceInfo of namespaceInfos) {
    uniqueNamespaces.set(namespaceInfo.name, namespaceInfo);
  }
  return [...uniqueNamespaces];
}

const projectDirPath = process.argv[2];
if (!projectDirPath) {
  console.error('Please provide a project directory path.');
  process.exit(1);
}

const projectUniqueNamespaces = findAllUniqueNamespaces(projectDirPath);
for (const projectUniqueNamespace of projectUniqueNamespaces) {
  if(projectUniqueNamespace[1].filePath.startsWith(projectDirPath)) {
    projectUniqueNamespace[1].filePath = projectUniqueNamespace[1].filePath.substring(projectDirPath.length);
  }
}
console.log(projectUniqueNamespaces.map(x => x[1]));
