import {
  showDialog,
  Dialog,
  ICommandPalette
} from '@jupyterlab/apputils';

import {
  JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
  IMainMenu
} from '@jupyterlab/mainmenu';

import {
  Widget
} from '@phosphor/widgets';

import '../style/index.css';

namespace CommandIDs {
  export const shutdown = 'hub:shutdown';
}


/**
 * Initialization data for the jupyterlab-ext-changeconf extension.
 */
const extension: JupyterLabPlugin<void> = {
  id: 'jupyterlab-ext-changeconf',
  autoStart: true,
  requires: [
    ICommandPalette,
    IMainMenu
  ],
  activate: (app: JupyterLab, palette: ICommandPalette, mainMenu: IMainMenu) => {
    console.log('JupyterLab extension jupyterlab-ext-changeconf is activated');

    app.commands.addCommand(CommandIDs.shutdown, {
      label: 'Shutdown Current Session',
      execute: () => {
        let widget: Widget = new Widget();
	widget.id = 'End Notebook Session';
	widget.node.innerHTML = "You are going to shut down all your notebooks and remove your saved configuration.<br/><br/>Do you wish to continue?";
        showDialog({
          title: 'End Notebook Session',
	  body: widget,
          focusNodeSelector: 'input',
	  buttons: [
	    Dialog.cancelButton({ label: 'No' }),
	    Dialog.warnButton({ label: 'Yes' })
	  ]
        }).then(result => {
          if (result.button.label === 'Yes') {  
            window.location.replace('/hub/home#changeconfig');
	  }
	});
      }
    });

    console.log(mainMenu);
    mainMenu.fileMenu.addGroup([{ command: CommandIDs.shutdown }], 20);
  }
};

export default extension;