import Connect from '../tree/connect';
//style imports:
import '../scss/folderhead.scss';

//type imports:
import type { Pointer } from '../tree/pointer';

type Props = {
    filePointer: Pointer
}

const FolderHead = ( { filePointer } : Props ) => {

    const leftActive = !!filePointer.getCurrentNode().parent ;

    const leftClickHandler = () =>{
        const Parent = filePointer.getCurrentNode().parent ;
        if( !Parent ) return ;
        filePointer.setCurrentNode( Parent );
    }

    return ( 
    <div className="folder-head">
        <div className="navigations">
            { leftActive &&  <button className="left" onClick={ leftClickHandler }></button> }
            {/* <button className="right"></button> */}
        </div>
        <div className="title">Title</div>
    </div> 
    ) 
}

export default Connect( FolderHead ) ;