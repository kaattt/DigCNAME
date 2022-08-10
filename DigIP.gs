/**
 * Peform a DNS resolution, using GoogleDNS.
 *
 * @param {"google.com"} domain    A well-formed domain name to resolve.
 * @param {"A"} type      IP Address - IPv4/IPv6
 * @return {String}            Response
 * @customfunction
 */
function DigIP(type, domain) {
  var apiEndpoint = 'https://dns.google.com/resolve'; // Google Pubic DNS API Url
//  var type = 'CNAME'; // Type of record to fetch, A, AAAA, MX, CNAME, TXT, ANY
//  var name = domain; // The domain name to lookup
  var requestUrl = apiEndpoint + '?name=' + domain + '&type='+ type; // Build request URL
  var response = UrlFetchApp.fetch(requestUrl);
  var statusCode = response.getResponseCode();
  var responseJson = response.getContentText();
//  console.log('test1' + statusCode);
//  console.log('test2' + responseJson);

  if (statusCode !== 200) {
    throw new Error(statusCode);
  }

  var errors = [
    { "name": "NoError", "description": "No Error"}, // 0
    { "name": "FormErr", "description": "Format Error"}, // 1
    { "name": "ServFail", "description": "Server Failure"}, // 2
    { "name": "NXDomain", "description": "Non-Existent Domain"}, // 3
    { "name": "NotImp", "description": "Not Implemented"}, // 4
    { "name": "Refused", "description": "Query Refused"}, // 5
    { "name": "YXDomain", "description": "Name Exists when it should not"}, // 6
    { "name": "YXRRSet", "description": "RR Set Exists when it should not"}, // 7
    { "name": "NXRRSet", "description": "RR Set that should exist does not"}, // 8
    { "name": "NotAuth", "description": "Not Authorized"} // 9
  ];


  var response = JSON.parse(responseJson);  

  if (response.Status !== 0) {
    return errors[response.Status].name;
  }

  var outputString = response.Answer[response.Answer.length - 1].data;
   
  return outputString;
}

console.log(DigIP( 'A','www.akamai.com'));
console.log(DigIP( 'AAAA','www.akamai.com'));
//console.log(DigIP('A', 'test.tes.ts'));

