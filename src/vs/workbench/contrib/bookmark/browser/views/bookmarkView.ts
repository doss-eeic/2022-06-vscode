/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as nls from 'vs/nls';
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IContextKeyService } from 'vs/platform/contextkey/common/contextkey';
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IOpenerService } from 'vs/platform/opener/common/opener';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IThemeService } from 'vs/platform/theme/common/themeService';
import { IViewPaneOptions, ViewPane } from 'vs/workbench/browser/parts/views/viewPane';
import { IViewDescriptorService } from 'vs/workbench/common/views';
import { IWorkbenchThemeService } from 'vs/workbench/services/themes/common/workbenchThemeService';

export class BookmarkView extends ViewPane {
	// private container: HTMLElement;
	constructor(
		options: IViewPaneOptions,
		@IContextMenuService contextMenuService: IContextMenuService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IInstantiationService instantiationService: IInstantiationService,
		@IKeybindingService keybindingService: IKeybindingService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IConfigurationService configurationService: IConfigurationService,
		@IThemeService themeService: IWorkbenchThemeService,
		@ITelemetryService telemetryService: ITelemetryService,
		@IOpenerService openerService: IOpenerService
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, telemetryService);

	}

	override get title(): string {
		return nls.localize('bookmarks', "Bookmarks");
	}
	override renderBody(container: HTMLElement): void {
		super.renderBody(container);
		const titleElement = container.querySelector('.title') as HTMLElement;
		titleElement.textContent = 'Bookmarks';
	}
}

// registerAction2(class extends Action2 {
// 	constructor() {
// 		super({
// 			id: 'workbench.bookmarks.action.newBookmark',
// 			title: localize('newBookmark', "New Bookmark"),
// 			icon: Codicon.plus,
// 			precondition: ExplorerResourceNotReadonlyContext,
// 			menu: {
// 				id: MenuId.ViewTitle,
// 				group: 'navigation',
// 				when: ContextKeyExpr.equals('bookmarks', VIEW_ID),
// 				order: 1
// 			}
// 		});
// 	}

// 	run(accessor: ServicesAccessor): void {
// 		// do nothing
// 	}
// });
