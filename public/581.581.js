"use strict";(self.webpackChunksvelte_app=self.webpackChunksvelte_app||[]).push([[581],{581:(i,t,n)=>{n.r(t),n.d(t,{LocalNotificationsWeb:()=>o});var e=n(895);class o extends e.Uw{constructor(){super(...arguments),this.pending=[],this.hasNotificationSupport=()=>{if(!("Notification"in window)||!Notification.requestPermission)return!1;if("granted"!==Notification.permission)try{new Notification("")}catch(i){if("TypeError"==i.name)return!1}return!0}}async createChannel(){throw this.unimplemented("Not implemented on web.")}async deleteChannel(){throw this.unimplemented("Not implemented on web.")}async listChannels(){throw this.unimplemented("Not implemented on web.")}async schedule(i){if(!this.hasNotificationSupport())throw this.unavailable("Notifications not supported in this browser.");for(const t of i.notifications)this.sendNotification(t);return{notifications:i.notifications.map((i=>({id:i.id})))}}async getPending(){return{notifications:this.pending}}async registerActionTypes(){throw this.unimplemented("Not implemented on web.")}async cancel(i){this.pending=this.pending.filter((t=>!i.notifications.find((i=>i.id===t.id))))}async areEnabled(){const{display:i}=await this.checkPermissions();return{value:"granted"===i}}async requestPermissions(){if(!this.hasNotificationSupport())throw this.unavailable("Notifications not supported in this browser.");return{display:this.transformNotificationPermission(await Notification.requestPermission())}}async checkPermissions(){if(!this.hasNotificationSupport())throw this.unavailable("Notifications not supported in this browser.");return{display:this.transformNotificationPermission(Notification.permission)}}transformNotificationPermission(i){switch(i){case"granted":return"granted";case"denied":return"denied";default:return"prompt"}}sendPending(){var i;const t=[],n=(new Date).getTime();for(const e of this.pending)(null===(i=e.schedule)||void 0===i?void 0:i.at)&&e.schedule.at.getTime()<=n&&(this.buildNotification(e),t.push(e));this.pending=this.pending.filter((i=>!t.find((t=>t===i))))}sendNotification(i){var t;if(null===(t=i.schedule)||void 0===t?void 0:t.at){const t=i.schedule.at.getTime()-(new Date).getTime();return this.pending.push(i),void setTimeout((()=>{this.sendPending()}),t)}this.buildNotification(i)}buildNotification(i){const t=new Notification(i.title,{body:i.body});return t.addEventListener("click",this.onClick.bind(this,i),!1),t.addEventListener("show",this.onShow.bind(this,i),!1),t}onClick(i){const t={actionId:"tap",notification:i};this.notifyListeners("localNotificationActionPerformed",t)}onShow(i){this.notifyListeners("localNotificationReceived",i)}}}}]);