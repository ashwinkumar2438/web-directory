import { useRef, useCallback } from "react";

type Callback = ( ...args:any[] ) => void

const useMenu = ( callback: Callback ) => {


    const element = useRef<HTMLElement>();
    const cb = useRef<Callback>( callback );


    const setRef = useCallback( ( node:HTMLElement | null ) => {
        if( !node ) return ;

        if( element.current ) element.current.removeEventListener( 'contextmenu', cb.current )

        element.current = node ;
        cb.current = callback ;

        node.addEventListener( 'contextmenu', callback );


    } , [ callback ]) 


    return setRef ;

}

export default useMenu;