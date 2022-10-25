/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { Extensions, IViewContainersRegistry, IViewDescriptor, IViewsRegistry, ViewContainerLocation } from 'vs/workbench/common/views';
import { Registry } from 'vs/platform/registry/common/platform';
import { VIEWLET_ID, VIEW_ID } from 'vs/workbench/contrib/bookmark/common/bookmark';
import * as nls from 'vs/nls';
import { SyncDescriptor } from 'vs/platform/instantiation/common/descriptors';
import { ViewPaneContainer } from 'vs/workbench/browser/parts/views/viewPaneContainer';
import { bookmarkIcon } from 'vs/workbench/contrib/bookmark/browser/bookmarkIcons';
import { BookmarkView } from 'vs/workbench/contrib/bookmark/browser/views/bookmarkView';

const viewContainerRegistry = Registry.as<IViewContainersRegistry>(Extensions.ViewContainersRegistry);
const viewsRegistry = Registry.as<IViewsRegistry>(Extensions.ViewsRegistry);
const viewContainer = viewContainerRegistry.registerViewContainer({
	id: VIEWLET_ID,
	title: nls.localize('bookmark', "Bookmark"),
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer),
	icon: bookmarkIcon,
	hideIfEmpty: true,
	order: 1,
}, ViewContainerLocation.Sidebar, { doNotRegisterOpenCommand: true });

const viewDescriptor: IViewDescriptor = {
	id: VIEW_ID,
	containerIcon: bookmarkIcon,
	name: nls.localize('bookmarks', "Bookmarks"),
	ctorDescriptor: new SyncDescriptor(BookmarkView),
	order: 1,
	canToggleVisibility: false,
	focusCommand: {
		id: 'workbench.bookmarks.focus'
	}
};

viewsRegistry.registerViews([viewDescriptor], viewContainer);
