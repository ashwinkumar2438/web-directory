import { Component } from "react";
import getPointer from './pointer';
import type { ReactComponent } from '../types/component';


const filePointer = getPointer() ;

const Connect = ( ChildComponent: ReactComponent ) => {


    return class Wrapper extends Component< any >{
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
            return <ChildComponent filePointer = { filePointer } { ...this.props } />
        }
    }



}

export default Connect ;
