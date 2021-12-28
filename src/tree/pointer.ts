import {
    createNode,
    updateNode,
    deleteNode,
    addNode
} from './node';


//types
import type { Node } from './node';

type Callback = ( node: Node ) => void ;

export type Pointer = ReturnType<typeof getPointer>




const getPointer = ( rootname:string = 'documents', children: Node[] = [] ) => {

    const rootNode = <Node>createNode( rootname, null );

    for( let node of children ){
        addNode( rootNode, node );
    }

    let currentNode = rootNode , subscribers: Callback[]= [] ;

    const getCurrentNode = () => currentNode ;

    const setCurrentNode = ( node: Node ) => {
        if( currentNode === node ) return ;

        if( !node.directory ) return ;
        
        currentNode = node ;

        dispatchSubscribers( currentNode ) ;
    }

    const addChildNode = ( nodeOrName: string | Node ) => { 
        addNode( currentNode, nodeOrName ) ;
        dispatchSubscribers( currentNode ) ;
    }

    const updateChildNode = ( ...args: Parameters<typeof updateNode> ) => {
        updateNode( ...args ) ;
        dispatchSubscribers( currentNode ) ;
    }

    const deleteChildNode = ( ...args: Parameters<typeof deleteNode> ) => {
        deleteNode( ...args ) ;
        dispatchSubscribers( currentNode ) ;
    }

    const dispatchSubscribers = ( node: Node ) => {
        for( let cb of subscribers ){
            cb( node );
        }
    }

    const subscribe = ( callback: Callback ) => {
        if( !subscribers.find( cb => cb === callback ) ) subscribers.push( callback ) ;

        return () => {
            subscribers = subscribers.filter( cb => cb !== callback ) ;
        }
    }

    return {
        getCurrentNode,
        setCurrentNode,
        addNode: addChildNode,
        updateNode: updateChildNode,
        deleteNode: deleteChildNode,
        subscribe
    }


}

export default getPointer ;