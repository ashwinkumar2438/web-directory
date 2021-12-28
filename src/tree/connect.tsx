import { Component } from "react";
import getPointer from './pointer';

type ReactComponent =  ( typeof Component ) | ( ( ...args:any[] ) => JSX.Element )

const filePointer = getPointer() ;

const Connect = ( ChildComponent: ReactComponent ) => {


    return class Wrapper extends Component{
        unobserve: ( ...args:any[] ) => void ;

        constructor( props:any ){
            super( props )
            this.unobserve = () => void 0 ;
        }

        componentDidMount(){
           this.unobserve =  filePointer.subscribe( this.changeTrigger.bind( this ) )
        }

        componentWillUnmount(){
            this.unobserve();
        }
        

        changeTrigger(){
            this.forceUpdate();
        }

        render(){
            return <ChildComponent filePointer = { filePointer } />
        }
    }



}

export default Connect ;
