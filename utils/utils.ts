const Imap = require('imap'); 
const { simpleParser } = require('mailparser'); 

export const fetchEmailBody = (imapConfig: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const imap = new Imap(imapConfig); 

    imap.once('ready', function () {
      imap.openBox('INBOX', true, function (err, box) {
        if (err) {
          reject(err);
          return;
        }

        const f = imap.seq.fetch(box.messages.total + ':*', { bodies: '' });

        f.on('message', function (msg, seqno) {
          msg.on('body', function (stream) {
            simpleParser(stream, (err, parsed) => {
              if (err) {
                reject(err);
              } else {
                resolve(parsed.text || ''); 
              }
            });
          });
        });

        f.once('end', function () {
          imap.end(); 
        });
      });
    });

    imap.once('error', function (err) {
      reject(err);
    });

    imap.once('end', function () {
      console.log('IMAP connection closed');
    });

    imap.connect(); 
  });
};

export const fetchEmailBodyBySubject = (imapConfig: any, subject: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const imap = new Imap(imapConfig);

    imap.once('ready', function () {
      imap.openBox('INBOX', true, function (err, box) {
        if (err) {
          reject(err);
          return;
        }

        imap.search([['TEXT', subject]], function (err, results) {
          if (err) {
            reject(err);
            return;
          }

          if (results.length === 0) {
            reject(new Error('No emails found with the given subject.'));
            return;
          }

          const fetchOptions = { bodies: '', markSeen: false }; 
          const f = imap.fetch(results[0], fetchOptions);

          f.on('message', function (msg) {
            msg.on('body', function (stream) {
              simpleParser(stream, (err, parsed) => {
                if (err) {
                  reject(err);
                } else {
                  const emailBody = parsed.html || parsed.text || '';

                  const apiKeyMatch = emailBody.match(/<textarea[^>]*>(.*?)<\/textarea>/s); 

                  if (apiKeyMatch) {
                    const apiKey = apiKeyMatch[1].trim();
                    resolve(apiKey); 
                  } else {
                    reject(new Error('API Key not found in email body.'));
                  }
                }
              });
            });
          });

          f.once('end', function () {
            imap.end();
          });
        });
      });
    });

    imap.once('error', function (err) {
      reject(err);
    });

    imap.once('end', function () {
      console.log('IMAP connection closed');
    });

    imap.connect(); 
  });
};
