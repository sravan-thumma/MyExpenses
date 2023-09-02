const domain = 'http://expenses.homenetwork-dev.free.nf/';
const ldomain= 'http://192.168.0.108:8080/';
export const API_URL_USERS = ldomain+'home/v1';
export const API_URL_TRANSACTIONS=ldomain+'home/v1/transactions'
export const API_HEADERS ={
      Cookie: '__test=ae5c50926771a64dab0ff5eb1ff9e451; expires=2023-08-21T17:16:34.847Z; path=/',
      Accept: 'application/json',
      'Content-Type': 'application/json'
    };

export const axiosConfig = {
      headers: {
        Cookie: '__test=ae5c50926771a64dab0ff5eb1ff9e451; expires=2023-08-21T17:16:34.847Z; path=/',
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
  };

const initialDate = new Date();
export function Post_Transaction(userid){
    return (
      { "userId": userid, "borrowedByMe": null, "borrowedFromMe": null, "creditCard": null, 
      "date": initialDate.toISOString().split('T')[0], "debitCard": null, "description": null,"repayDate": null, "status": null }
    );
  }