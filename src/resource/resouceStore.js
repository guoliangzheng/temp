import {toJS, observable, computed, transaction, asReference,autorun } from "mobx";
import _,{ merge, mergeWith, pick, omit } from "lodash";
import uuid from '../util/uuid'
import elementMap from "../canvas/elements";
import {ElementTypes} from "../constants"
import xml2js from'xml2js';
import  builder from 'xmlbuilder';
import HttpService from "../httpservice";
import { findDOMNode } from "react-dom";
import fetch from 'node-fetch';

export default class Store{

   tree = [
        {
            name:'轻骑兵',
            id:'1',
            children: [{
                name: '主页',
                id:'2',
                children: [{
                  name: '访问',
                  id:'3'
                }]
              }]
            
        }

        
    ];
    
    @observable selectResouce = '';


     setSelectResouce(id) {
        this.selectResouce = id;
     }
    

}