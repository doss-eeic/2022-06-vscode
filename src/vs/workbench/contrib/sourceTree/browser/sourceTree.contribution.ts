/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { localize } from 'vs/nls';
import { SyncDescriptor } from 'vs/platform/instantiation/common/descriptors';
import { Registry } from 'vs/platform/registry/common/platform';
import { ViewPaneContainer } from 'vs/workbench/browser/parts/views/viewPaneContainer';
import { Extensions as ViewExtensions, IViewContainersRegistry, ViewContainerLocation } from 'vs/workbench/common/views';
import { sourceTreeIcon } from 'vs/workbench/contrib/sourceTree/browser/sourceTreeIcons';
import { VIEWLET_ID } from 'vs/workbench/contrib/sourceTree/common/sourceTree';

const viewsRegistry = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry);

viewsRegistry.registerViewContainer({
	id: VIEWLET_ID,
	title: localize('source-tree', "Source Tree"),
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [VIEWLET_ID, { mergeViewWithContainerWhenSingleView: true }]),
	icon: sourceTreeIcon,
	order: 0,
}, ViewContainerLocation.Sidebar, { doNotRegisterOpenCommand: true })
