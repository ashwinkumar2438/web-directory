import { useState } from 'react';

//type imports:
import type { SyntheticEvent } from 'react';
import type { ReactComponent } from '../../types/component' ;

//style imports:
import '../../scss/popup.scss';


type ToggleState = ( val: boolean ) => void ;

type Props = {
    state: boolean,
    toggleState: ToggleState,
    showHeader?: true | null,
    className?: string,
    [ K:string ] : any
}

const stopPropogation = ( e: SyntheticEvent ) => e.stopPropagation() ;

const DefaultHeader = () => null

const PopupHoc = ( RenderComponent: ReactComponent, HeaderComponent: ReactComponent = DefaultHeader ) => {
    const Popup = ( props: Props ) => {

        const { state, toggleState, showHeader = true, className = '', ...args } = props ;
    
    
        if( !state )return null ;
    
        return (        
                <div className={ className ? className : 'popup-block' } onClick = { stopPropogation }>
                   { showHeader && ( <div className="header">
                        <div className="activity-buttons">
                            <button className="close"></button>
                            <button className="minimise"></button>
                            <button className="expand"></button>
                        </div>
                        <HeaderComponent />
                    </div> ) }
                    <div className="main">
                        <RenderComponent { ...args } toggleState = { toggleState } />
                    </div>
                </div>    
        )
    
    }

    return Popup;
}


export default PopupHoc ;