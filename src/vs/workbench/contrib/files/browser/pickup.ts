/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable local/code-import-patterns */
import * as fs from 'fs';
import * as readline from 'readline';

export const extractDef = (inputFilePath: string): string[] => {
	const stream = fs.createReadStream(inputFilePath);
	const reader = readline.createInterface({ input: stream });
	const returnList = [] as string[];
	reader.on('line', (data: string) => {
		returnList.push(data);
	});
	return returnList;
};
