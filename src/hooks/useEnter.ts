import { useRef, useCallback, KeyboardEvent } from 'react';

type Callback = ( ...args:unknown[] ) =>void ;

const useEnter = ( cb: Callback ) =>{


    const nodeRef = useRef<HTMLInputElement>();
    const cbRef = useRef< typeof onKeyDown>();

    const onKeyDown = useCallback( ( e ) =>{

        if( e.code !== 'Enter' ) return ;

        cb( ( <HTMLInputElement>e.target ).value );


    }, [ cb ])


    const setRef = useCallback( ( node: HTMLInputElement | null ) =>{

        if( !node )return ;

        if( nodeRef.current && cbRef.current ) nodeRef.current.removeEventListener( 'keydown', cbRef.current );

        nodeRef.current = node ;
        cbRef.current = onKeyDown;

        nodeRef.current.addEventListener( 'keydown', cbRef.current ) ;


    }, [ cb ])


    return setRef ;

}

export default useEnter ;