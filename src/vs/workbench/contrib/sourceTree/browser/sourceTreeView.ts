/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IConfigurationService } from 'vs/platform/configuration/common/configuration';
import { IContextKeyService } from 'vs/platform/contextkey/common/contextkey';
import { IContextMenuService } from 'vs/platform/contextview/browser/contextView';
import { IInstantiationService } from 'vs/platform/instantiation/common/instantiation';
import { IKeybindingService } from 'vs/platform/keybinding/common/keybinding';
import { IOpenerService } from 'vs/platform/opener/common/opener';
import { ITelemetryService } from 'vs/platform/telemetry/common/telemetry';
import { IThemeService } from 'vs/platform/theme/common/themeService';
import { IViewPaneOptions, ViewPane } from 'vs/workbench/browser/parts/views/viewPane';
import { EditorResourceAccessor, SideBySideEditor } from 'vs/workbench/common/editor';
import { IViewDescriptorService } from 'vs/workbench/common/views';
import { IExplorerService } from 'vs/workbench/contrib/files/browser/files';
import { IEditorService } from 'vs/workbench/services/editor/common/editorService';
import { URI } from 'vs/base/common/uri';
import { ILabelService } from 'vs/platform/label/common/label';
// import { EditorInput } from 'vs/workbench/common/editor/editorInput'

export class SourceTreeView extends ViewPane {
	private activeFile: URI | undefined;
	// private activeEditor: EditorInput;
	constructor(
		options: IViewPaneOptions,
		@IKeybindingService keybindingService: IKeybindingService,
		@IContextMenuService contextMenuService: IContextMenuService,
		@IConfigurationService configurationService: IConfigurationService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IInstantiationService instantiationService: IInstantiationService,
		@IOpenerService openerService: IOpenerService,
		@IThemeService themeService: IThemeService,
		@ITelemetryService telemetryService: ITelemetryService,
		@IEditorService private readonly editorService: IEditorService,
		@IExplorerService private readonly explorerService: IExplorerService,
		@ILabelService private readonly labelService: ILabelService,
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, telemetryService);

	}

	get name(): string {
		if (this.activeFile === undefined) {
			return 'Source Tree';
		}
		return this.labelService.getUriLabel(this.activeFile!);
	}

	override get title(): string {
		return this.name;
	}

	override set title(_: string) {
		// noop
	}

	override renderHeader(container: HTMLElement): void {
		super.renderHeader(container);

		const titleElement = container.querySelector('.title') as HTMLElement;
		const setHeader = () => {
			titleElement.textContent = this.name;
			titleElement.title = this.name;
		};
		this._register(this.editorService.onDidActiveEditorChange(setHeader));
		setHeader();

	}

	override renderBody(container: HTMLElement): void {
		super.renderBody(container);
		// When the active file changes, update the view
		this._register(this.editorService.onDidActiveEditorChange(() => {
			this.selectActiveFile();
		}));
	}

	private selectActiveFile(): void {
		const activeFile = EditorResourceAccessor.getCanonicalUri(this.editorService.activeEditor, { supportSideBySide: SideBySideEditor.PRIMARY });
		if (activeFile) {
			this.explorerService.select(activeFile, true);
		}
	}
}
