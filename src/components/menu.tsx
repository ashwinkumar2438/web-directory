
//custom imports:
import Popup from './shared/popup';

//style imports:
import '../scss/menu.scss';

//types:
import type { SyntheticEvent } from 'react';

type EventCallback = ( e:SyntheticEvent ) => void ;

type NormalMenuProps = {
    handleNewFolder : EventCallback
}
type FolderMenuProps ={
    handleOpenFolder: EventCallback
}

const NormalMenu = ( { handleNewFolder  } : NormalMenuProps ) => {
    return (
        <div className="menu">
           <button onClick={ handleNewFolder }>New Folder</button>
           <button>Get Info</button>
        </div>
    )
}

const FolderMenu = ( { handleOpenFolder  } : FolderMenuProps ) => {
    return (
        <div className="menu">
           <button onClick={ handleOpenFolder }>Open Folder</button>
           <button>Get Info</button>
        </div>
    )
} 

export const NormalPopup = Popup( NormalMenu );
export const FolderPopup = Popup( FolderMenu );
