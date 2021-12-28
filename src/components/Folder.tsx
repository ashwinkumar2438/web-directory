import Connect from '../tree/connect';

//icons imports
import FileIcon from '../assets/file.svg';
import FolderIcon from '../assets/folder.svg';
//type imports
import type { Pointer } from '../tree/pointer';
import type { Node } from '../tree/node';


type Props = {
    filePointer: Pointer 
}

const FoldersView = ( { filePointer } : Props ):JSX.Element => {

    const handleFolderClick = ( child: Node ) => {
        filePointer.setCurrentNode( child );
    }

    const handleFileClick = ( child: Node ) => {
        console.log( child );
    }

    const handleButton = () =>{     
        filePointer.addNode('my apps')
    }


    return (
        <div className="finder">
            <button onClick={ handleButton }>add</button>
            {
                filePointer.getCurrentNode().children.map( child => (
                   
                    child.directory ? (
                        <div className="folder" key={ child.name }  onClick={ () => { handleFolderClick( child ) }} >
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
        </div>
    )
}


export default Connect( FoldersView );