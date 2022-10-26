/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
/* eslint-disable local/code-import-patterns */
import * as fs from 'fs';

enum DeclareType {
	function,
	class,
}

class DeclItem {
	private readonly _parent: DeclItem | undefined;
	private readonly _children: (DeclItem)[] = [];
	private readonly _type: DeclareType;
	private readonly _spaces: number;
	private readonly _text: string;
	public readonly depth: number = 0;
	constructor(
		readonly parent: DeclItem | undefined,
		readonly type: DeclareType,
		readonly spaces: number,
		readonly text: string,
	) {
		this._parent = parent;
		this._type = type;
		this._spaces = spaces;
		this._text = text;
		this._parent?._children.push(this);
		this.depth = this._parent === undefined ? 0 : this._parent.depth + 1;
	}
	get spaceCount() {
		return this._spaces;
	}

	get parentItem() {
		return this._parent;
	}

	get itemType() {
		return this._type;
	}

	get title() {
		return this._text;
	}

	get children() {
		return this._children;
	}
}

const countSpacesAtBeginning = (line: string): number => {
	return line.search(/\S|$/);
};

const checkLineType = (line: string): DeclareType | undefined => {

	const checkElementType = (element: string): DeclareType | undefined => {
		if (element === 'def') {
			return DeclareType.function;
		} else if (element === 'class') {
			return DeclareType.class;
		} else {
			return undefined;
		}
	};

	const isBeforeDefElement = (element: string): boolean => {
		return element === 'async' || element === '';
	};

	const elements = line.split(/\s+/);
	for (const element of elements) {
		if (isBeforeDefElement(element)) {
			continue;
		} else if (checkElementType(element) !== undefined) {
			// functionまたはclassの定義文
			return checkElementType(element);
		}
	}
	return undefined;
};

const pushAllChildren = (parent: DeclItem, list: string[]) => {
	list.push(parent.title);
	for (const child of parent.children) {
		pushAllChildren(child, list);
	}
};

export const extractDef = (inputFilePath: string) => {
	const roots = [] as DeclItem[];
	let currentRoot: DeclItem | undefined = undefined;
	let fileContent = '';
	try {
		fileContent = fs.readFileSync(inputFilePath, 'utf8');
	} catch (err) {
	}
	const lines = fileContent.split('\n');
	for (const line of lines) {
		const lineType = checkLineType(line);
		if (lineType !== undefined) {
			// functionまたはclassの定義文
			const spaces = countSpacesAtBeginning(line);
			if (spaces === 0 || currentRoot === undefined) {
				const newItem = new DeclItem(undefined, lineType, 0, line);
				roots.push(newItem);
				currentRoot = newItem;
			} else {
				let parent: DeclItem | undefined = currentRoot;
				while (parent !== undefined && parent.spaceCount >= spaces) {
					parent = parent.parentItem;
				}
				const newItem: DeclItem = new DeclItem(parent, lineType, spaces, line);
				if (parent === undefined) {
					roots.push(newItem);
				}
				currentRoot = newItem;
			}
		}
	}
	const classList = [] as string[];
	const functionList = [] as string[];
	for (const root of roots) {
		if (root.itemType === DeclareType.class) {
			pushAllChildren(root, classList);
		} else {
			pushAllChildren(root, functionList);
		}
	}
	return {
		classList,
		functionList,
	};
};
