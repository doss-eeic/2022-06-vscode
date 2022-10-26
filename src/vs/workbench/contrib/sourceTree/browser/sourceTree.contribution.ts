/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { localize } from 'vs/nls';
import { SyncDescriptor } from 'vs/platform/instantiation/common/descriptors';
import { Registry } from 'vs/platform/registry/common/platform';
import { ViewPaneContainer } from 'vs/workbench/browser/parts/views/viewPaneContainer';
import { Extensions as ViewExtensions, IViewContainersRegistry, IViewDescriptor, IViewsRegistry, ViewContainerLocation } from 'vs/workbench/common/views';
import { sourceTreeIcon } from 'vs/workbench/contrib/sourceTree/browser/sourceTreeIcons';
import { SourceTreeView } from 'vs/workbench/contrib/sourceTree/browser/sourceTreeView';
// import { WelcomeView } from 'vs/workbench/contrib/sourceTree/browser/welcomeView';
import { VIEWLET_ID, VIEW_ID } from 'vs/workbench/contrib/sourceTree/common/sourceTree';

const viewContainerRegistry = Registry.as<IViewContainersRegistry>(ViewExtensions.ViewContainersRegistry);
// const viewsRegistry = Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry);

const viewContainer = viewContainerRegistry.registerViewContainer({
	id: VIEWLET_ID,
	title: localize('source-tree', "Source Tree"),
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [VIEWLET_ID, { mergeViewWithContainerWhenSingleView: true }]),
	icon: sourceTreeIcon,
	order: 0,
}, ViewContainerLocation.Sidebar, { doNotRegisterOpenCommand: true });

const viewDescriptor: IViewDescriptor = {
	id: VIEW_ID,
	containerIcon: sourceTreeIcon,
	name: localize('source-tree', "Source Tree"),
	ctorDescriptor: new SyncDescriptor(SourceTreeView),
	order: 1,
	canToggleVisibility: false,
};

// Register sourceTree default location to sidebar
Registry.as<IViewsRegistry>(ViewExtensions.ViewsRegistry).registerViews([viewDescriptor], viewContainer);
// viewsRegistry.registerViews([{ id: WelcomeView.ID, name: WelcomeView.LABEL, containerIcon: icons.runViewIcon, ctorDescriptor: new SyncDescriptor(WelcomeView), order: 1, weight: 40, canToggleVisibility: true, when: .isEqualTo('simple') }], viewContainer);
