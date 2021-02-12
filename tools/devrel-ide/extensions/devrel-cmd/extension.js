// The module 'vscode' contains the VS Code extensibility API
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	const disposableProxyGen = context.subscriptions.push(vscode.commands.registerCommand('extensions.apigee-proxy-generator', proxyGenerator));
	context.subscriptions.push(disposableProxyGen);
	const disposableDeployment = context.subscriptions.push(vscode.commands.registerCommand('extensions.apigee-add-deployment-config', addDeploymentConfig));
	context.subscriptions.push(disposableDeployment);

}

async function proxyGenerator() {
	const options = {
		name: {
			prompt: "Proxy name: ",
			placeHolder: "my-proxy",
		},
		version: {
			prompt: "Proxy version: ",
			value: "v0",
			valueSelection: [1,2],
		},
		virtualhost: {
			prompt: "Virtualhost: ",
			value: "secure",
		},
		targetUrl: {
			prompt: "Target URL: ",
			value: "httpbin.org",
		}
	}

	const proxyName = await vscode.window.showInputBox(options.name);
	const version = await vscode.window.showInputBox(options.version);
	const virtualhost = await vscode.window.showInputBox(options.virtualhost);
	const targetUrl = await vscode.window.showInputBox(options.targetUrl);

	const terminal = vscode.window.createTerminal(`Create ${proxyName} Proxy`);
	terminal.show(true);
	terminal.sendText(`cd references/proxy-template`);
	terminal.sendText(`export PROXY=${proxyName}`);
	terminal.sendText(`export VERSION=${version}`);
	terminal.sendText(`export VHOST=${virtualhost}`);
	terminal.sendText(`export TARGETURL=${targetUrl}`);

	terminal.sendText("generate-apigee-proxy");
}

async function addDeploymentConfig() {
	let devRelLog = vscode.window.createOutputChannel("DevRel");

	const files = await vscode.window.showOpenDialog({
		title: 'Select root folder',
		canSelectFiles: false,
		canSelectFolders: true,
		canSelectMany: false,
	});

	devRelLog.appendLine(files[0].path);
	const newPomPath = files[0].path + '/pom.xml';
	devRelLog.appendLine(newPomPath);


	await vscode.workspace.fs.copy(
		vscode.Uri.file('/home/vscode/devrel/references/kvm-admin-api/pom.xml'),
		vscode.Uri.file(newPomPath)
	);
}

// this method is called when your extension is deactivated
function deactivate() {}

// eslint-disable-next-line no-undef
module.exports = {
	activate,
	deactivate
}