#!/usr/bin/env node

/**
 * @File: index.js
 * @author: 夏花
 * @time: 2024-02-24
 */

import { execSync } from 'child_process';
import fs from 'fs';

/**
 * 同步执行指定命令，并可自定义子进程的 stdio 配置，默认继承父进程的 stdio。
 * @param {string} command - 要执行的命令字符串。
 * @param {string=} stdio - 子进程的 stdio 配置，默认为 'inherit'。
 */
const runCommand = (command, stdio = 'inherit') => {
    execSync(command, { stdio });
};

// 初始化 npm 项目并修改 package.json 类型为模块
runCommand('npm init -y');
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf-8'));
packageJson.type = 'module';
fs.writeFileSync(
    './package.json',
    JSON.stringify(packageJson, null, 2),
    'utf-8'
);

// 安装依赖，使用当前 Node 版本对应的 @types/node，并安装 prettier
const npmInstallCmd = `npm i @types/node@${process.version.trim()} prettier --save-dev`;
runCommand(npmInstallCmd);

console.info('初始化成功');
