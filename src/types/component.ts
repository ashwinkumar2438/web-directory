import { Component } from 'react' ;
export type ReactComponent =  ( typeof Component ) | ( ( ...args:any[] ) => JSX.Element | null )