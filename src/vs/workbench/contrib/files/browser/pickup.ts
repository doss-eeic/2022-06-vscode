/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable local/code-import-patterns */
import * as fs from 'fs';

const isDefElement = (element: string): boolean => {
	return element === 'def' || element === 'class';
};

const isBeforeDefElement = (element: string): boolean => {
	return element === 'async' || element === '';
};

const isDefLine = (line: string): boolean => {
	const elements = line.split(/\s+/);
	for (const element of elements) {
		if (isBeforeDefElement(element)) {
			continue;
		} else if (isDefElement(element)) {
			return true;
		}
	}
	return false;
};

export const extractDef = (inputFilePath: string): string[] => {
	let fileContent = '';
	try {
		fileContent = fs.readFileSync(inputFilePath, 'utf8');
	} catch (err) {
		console.log(`Error while reading file: ${err}`);
	}
	const lines = fileContent.split('\n');
	const returnList = [] as string[];
	for (const line of lines) {
		if (isDefLine(line)) {
			returnList.push(line);
		}
	}
	return returnList;
};
