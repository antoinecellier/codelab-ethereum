import { Injectable, NgZone, ChangeDetectorRef} from '@angular/core';
import MonTierce from "../../../../../contracts/MonTierce.sol";
import {Observable} from 'rxjs/Observable';

@Injectable()
export class MonTierceService {

  constructor(ngZone: NgZone) {
    window.web3 = new Web3(web3.currentProvider);
    MonTierce.setProvider(window.web3.currentProvider);
    var contratTierce = MonTierce.deployed();
    this._contratTierce = contratTierce;
    this._ngZone = ngZone;
  }

  getBalance(address) {
    return new Observable(obs => {
      this._ngZone.run(() => {
        web3.eth.getBalance(address, (error, result) => {
          if(!error){
            obs.next(result.toNumber());
          } else {
            obs.next(error);
          }
        });
      });
    });
  }

  getDefaultAddress(){
    return web3.eth.defaultAccount;
  }

  getContractAddress(){
    return this._contratTierce.address;
  }

  getCourses(){
    return [
      {id:1, name:"course 1"},
      {id:2, name:"course 2"},
      {id:3, name:"course 3"},
      {id:4, name:"course 4"},
      {id:5, name:"course 5"},
      {id:6, name:"course 6"},
      {id:7, name:"course 7"},
      {id:8, name:"course 8"},
      {id:9, name:"course 9"}

    ];
  }

  getChevauxExistants(){
    return [
      {id:1, name:"petit tonnerre"}, {id:2, name:"jolly jumper"},
      {id:3, name:"rantanplan"},{id:4, name:"the cheval"},
      {id:5, name:"chevaldireàmamère"}, {id:6, name:"canne à son"},
      {id:7, name:"K2000"}, {id:8, name:"mack"},
      {id:9, name:"ben hur"}, {id:10, name:"luke"},
      {id:11, name:"dark vador"}, {id:12, name:"j'ai plus d'idée"},
      {id:12, name:"un cheval"}, {id:14, name:"un autre cheval"},
      {id:15, name:"et encore un"}, {id:15, name:"allez le dernier"},
     ];
  }

  parier(idCourse, tierce, mise){
    console.log(mise);
    return this._contratTierce.parier(idCourse, tierce, {value: mise, gas: 2000000, from: window.web3.eth.defaultAccount});
  }

  initialiserCourse(chevauxEnCourse){
    return new Observable(obs => {
      this._ngZone.run(() => {
        this._contratTierce.initialiserCourse(chevauxEnCourse,  {from: window.web3.eth.defaultAccount}).then((err, data)=>{
          return this._contratTierce.courseIDGenerator.call();
        })
        .then(function(lastCourseId){
          let courseId = Number(lastCourseId-1);
          obs.next(courseId);
        }).catch((err)=>{
          obs.next("error");
        });
      });
    });
  }

  interdireLesParis(idCourse){
    return new Observable(obs => {
      this._ngZone.run(() => {
        this._contratTierce.interdireParis(idCourse,  {from: window.web3.eth.defaultAccount})
        .then(()=>{
          obs.next();
        })
        .catch((err)=>{
          console.log(err);
          obs.next(err);
        });
      });
    });
  }

  terminerLaCourse(idCourse, tierceGagnant){
    return  this._ngZone.run(() => {
        return this._contratTierce.terminerCourse(idCourse, tierceGagnant, {from: window.web3.eth.defaultAccount});
      });;
  }
}
