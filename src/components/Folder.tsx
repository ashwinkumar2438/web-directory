import { useState, useCallback } from 'react';
//custom imports:
import Connect from '../tree/connect';
import { NormalPopup, FolderPopup} from './menu';
import useMenu from '../hooks/useMenu';
import useEnter from '../hooks/useEnter';

//style imports:
import '../scss/folder.scss';

//icons imports
import FileIcon from '../assets/file.svg';
import FolderIcon from '../assets/folder.svg';
//type imports
import type { SyntheticEvent } from 'react';
import type { Pointer } from '../tree/pointer';
import type { Node } from '../tree/node';


type Props = {
    filePointer: Pointer 
}

const FoldersView = ( { filePointer } : Props ):JSX.Element => {

    const [ normalMenu, toggleMenu ] = useState<boolean>( false );
    const [ folderMenu, toggleFolderMenu ] = useState<boolean>( false );
    const [ newFolder, toggleNewFolder ] = useState< true | null >( null );

    const openMenu = useCallback( ( e:SyntheticEvent) => { 
        e.preventDefault();
        toggleMenu( true )
        console.log( 'menu active', e );
    } , [] );

    const createNewFolder = useCallback( ( val ) => {
        filePointer.addNode( val );
        toggleNewFolder( null );
    }, [ filePointer ] )


    const setMenuRef = useMenu( openMenu );
    const setNewFolderRef = useEnter( createNewFolder ) ;

    const handleFolderClick = ( child: Node ) => {
        filePointer.setCurrentNode( child );
    }

    const handleFileClick = ( child: Node ) => {
        console.log( child );
    }

    const showNewFolder = () =>{
        toggleMenu( false );
        toggleNewFolder( true );
    }
    


    return (
        <div className="finder"  ref = { setMenuRef }>
            {
                filePointer.getCurrentNode().children.map( child => (
                   
                    child.directory ? (
                        <div className="folder" key={ child.name }  onDoubleClick={ () => { handleFolderClick( child ) }} >
                            <div className="icon">
                                <img src={ FolderIcon } alt="folder" />
                            </div>
                            <div className="name"> { child.name } </div>
                        </div>
                    ):(
                        <div className="file" key={ child.name } onClick={ () => { handleFileClick( child ) }}>
                            <div className="icon">
                                <img src={ FileIcon } alt="file" />
                            </div>
                            <div className="name"> { child.name } </div> 
                        </div>
                    )
                   
                ))
            }
            {
                newFolder && (
                    <div className="folder" >
                          <div className="icon">
                                <img src={ FolderIcon } alt="folder" />
                            </div>
                            <div className="name"> <input type="text" defaultValue={ 'Untitled Folder'} ref={ setNewFolderRef } /> </div>
                    </div>
                )
            }

            <NormalPopup 
                state ={ normalMenu } 
                toggleState = { () => toggleMenu( false ) }
                showHeader = { null }
                className = 'menu-popup'
                handleNewFolder = { showNewFolder }
                />
            <FolderPopup 
                state= { folderMenu }
                toggleState = { () => toggleFolderMenu( false ) }
                showHeader = { null }
                className = 'menu-popup'
            />
        </div>
    )
}


export default Connect( FoldersView );