/**
 * Peform a CNAME resolution, using GoogleDNS.
 *
 * @param {"google.com"} domain    A well-formed domain name to resolve.
 * @return {String}            Response
 * @customfunction
 */
function DigCNAME(domain) {
  var apiEndpoint = 'https://dns.google.com/resolve'; // Google Pubic DNS API Url
  var type = 'CNAME'; // Type of record to fetch, A, AAAA, MX, CNAME, TXT, ANY
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

  var response = JSON.parse(responseJson);  
  var outputData = [];
   
  for (var i in response.Answer) {
    outputData.push(response.Answer[i].data);
  }
   
  var outputString = outputData.join(',');
   
  return outputString;
}
