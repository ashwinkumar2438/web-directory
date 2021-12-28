export type Node< T = true > = T extends true ? {
    name: string,
    directory: T,
    parent: Node | null,
    children: Node[],
    size?: number
} : {
    name: string,
    extension: string,
    directory: T,  
    parent: Node | null,
    content?: string,
    size?:number
} ;

type Extras = {
    directory: true,
    children: Node[]
} | {
    directory: false,
    extension: string,
    content: string
}

type UpdateData = {
    name?:string,
    content?:string
}

const createNode = ( filename:string , parent: Node[ 'parent' ] ):Node<true>|Node<false> => { 
    
    if( !filename ) throw new Error( 'filename required.' );


    const [ name, extension ] = filename.split('.');

    const directory = !extension ;


    const extras: Extras = directory === true ? { directory, children : [] } : { directory, extension, content: '' } ; 

    return {
        name,
        parent,
        ...extras
    }
}

const addNode = ( parent:Node, nodeOrName : string | Node  ) => {
    if( !parent.directory )return ;

    let node:Node<true>;

    if( typeof nodeOrName === 'string'  ) node = <Node <true> >createNode( nodeOrName, parent );

    else node = nodeOrName ;

    console.log( node );

    if( parent.children.some( child => child.name === node.name ) ) throw new Error('filename already exists.');

    parent.children.push( node );
}

const updateNode = ( node:Node | Node<false> , data: UpdateData  ) => {
    if( data.name ) node.name = data.name ;
    if( !node.directory && data.content ) node.content = data.content ;
}

const deleteNode = ( node: Node ) => {
    if( !node.parent?.directory ) return ;

    node.parent.children = node.parent.children.filter( child => child !== node ) ?? [];

}


export {
    createNode,
    addNode,
    updateNode,
    deleteNode
}