const domain = 'http://expenses.homenetwork-dev.free.nf/api.php/';
const ldomain= 'http://192.168.0.108:8080/';
const ssldomain='https://homenetwork-dev.onrender.com/api.php/';
export const API_URL_USERS = ssldomain+'home/v1';
export const API_URL_TRANSACTIONS=ssldomain+'home/v1/transactions';
export const API_HEADERS ={
      Accept: 'application/json',
      'Content-Type': 'application/json',
      'Authorization' :'Basic U3JhdmFuOiFAIyRJYW0kcmF2YW4='
    };

export const axiosConfig = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'Authorization' :'Basic U3JhdmFuOiFAIyRJYW0kcmF2YW4='
      },
  };

const initialDate = new Date();
export function Post_Transaction(userid){
    return (
      { "userId": userid, "borrowedByMe": null, "borrowedFromMe": null, "creditCard": null, 
      "date": initialDate.toISOString().split('T')[0], "debitCard": null, "description": null,"repayDate": null, "status": null }
    );
}
export function Post_User(){
  return (
    {"email":null,"password":null,"role":"User","username":null}
  );
}
  //Request: {"DONE": 4, "HEADERS_RECEIVED": 2, "LOADING": 3, "OPENED": 1, "UNSENT": 0, "_aborted": false, "_cachedResponse": undefined, "_hasError": true, "_headers": {"accept": "application/json", "cookie": "__test=ae5c50926771a64dab0ff5eb1ff9e451; expires=2023-08-21T17:16:34.847Z; path=/"}, "_incrementalEvents": false, "_lowerCaseResponseHeaders": {}, "_method": "GET", "_perfKey": "network_XMLHttpRequest_https://homenetwork-dev.free.nf/api.php/home/v1/userlogin/Sravan&Tsravan@007", "_performanceLogger": {"_closed": false, "_extras": {}, "_isLoggingForWebPerformance": false, "_pointExtras": {}, "_points": {"initializeCore_end": 72201842.883184, "initializeCore_start": 72201628.621569}, "_timespans": {"network_XMLHttpRequest_http://192.168.0.108:8081/logs": [Object], "network_XMLHttpRequest_https://homenetwork-dev.free.nf/api.php/home/v1/userlogin/Sravan&Tsravan@007": [Object]}}, "_requestId": null, "_response": "java.security.cert.CertPathValidatorException: Trust anchor for certification path not found.", "_responseType": "", "_sent": true, "_subscriptions": [], "_timedOut": false, "_trackingName": "unknown", "_url": "https://homenetwork-dev.free.nf/api.php/home/v1/userlogin/Sravan&Tsravan@007", "readyState": 4, "responseHeaders": undefined, "status": 0, "timeout": 0, "upload": {}, "withCredentials": true}