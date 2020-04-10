const fs = require('fs');
const { request } = require('graphql-request');

const endpoint = 'https://platform-api.now.sh/graphql';

const query = `
 query KnownDrugs($ensgId: String!) {
   target(ensgId: $ensgId) {
     symbol
     details {
       drugs {
         rows {
           disease {
             id
             name
           }
           target {
             id
             symbol
           }
           drug {
             id
             name
             type
             activity
           }
           clinicalTrial {
             phase
             status
             sourceUrl
             sourceName
           }
           mechanismOfAction {
             name
             sourceName
             sourceUrl
           }
         }
       }
     }
   }
 }
`;

const variables = {
  ensgId: 'ENSG00000091831'
};

request(endpoint, query, variables).then(res => {
  const data = res.target.details.drugs.rows;
  fs.writeFile(
    `${res.target.symbol}-known-drugs-v2.json`,
    JSON.stringify(data),
    err => {
      if (err) throw err;
      console.log('The file has been saved!');
    });
});
