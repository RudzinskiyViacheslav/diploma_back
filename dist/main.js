(()=>{"use strict";var o={860:o=>{o.exports=require("express")},900:o=>{o.exports=require("pg")}},s={};function r(t){var e=s[t];if(void 0!==e)return e.exports;var a=s[t]={exports:{}};return o[t](a,a.exports,r),a.exports}(()=>{const o=r(860)(),s=new(0,r(900).Pool)({user:"monarch",host:"localhost",database:"diploma",password:"helpbycrbq",port:5432});let t=new class{constructor(o){this.pool=o}mainsc=(o,s)=>{this.pool.query("SELECT * FROM pakrmk",((o,r)=>{if(o)throw o;s.status(200).json(r.rows)}))};register=(o,s)=>{this.pool.query("SELECT * FROM pakrmk",((o,r)=>{if(o)throw o;s.status(200).json(r.rows)}))};capfk=(o,s)=>{this.pool.query("SELECT * FROM pakrmk",((o,r)=>{if(o)throw o;s.status(200).json(r.rows)}))};prod_cards=(o,s)=>{this.pool.query("SELECT * FROM pakrmk",((o,r)=>{if(o)throw o;s.status(200).json(r.rows)}))};card=(o,s)=>{this.pool.query("SELECT * FROM pakrmk",((o,r)=>{if(o)throw o;s.status(200).json(r.rows)}))};info=(o,s)=>{this.pool.query("SELECT * FROM pakrmk",((o,r)=>{if(o)throw o;s.status(200).json(r.rows)}))}}(s);o.get("/",((o,s)=>{console.log(o),s.send(`Ohh shit, it really works! ${o}`)})),o.get("/main",t.mainsc),o.listen(3e3,(()=>{console.log("Example app listening on port 3000")}))})()})();