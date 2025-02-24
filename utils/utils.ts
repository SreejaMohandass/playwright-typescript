const Imap = require('imap'); // Import IMAP correctly
const { simpleParser } = require('mailparser'); // Import mailparser for parsing email bodies

// Function to fetch email body
export const fetchEmailBody = (imapConfig: any): Promise<string> => {
  return new Promise((resolve, reject) => {
    const imap = new Imap(imapConfig); // ✅ Correct instantiation

    imap.once('ready', function () {
      imap.openBox('INBOX', true, function (err, box) {
        if (err) {
          reject(err);
          return;
        }

        const f = imap.seq.fetch(box.messages.total + ':*', { bodies: '' }); // Fetch the latest email

        f.on('message', function (msg, seqno) {
          msg.on('body', function (stream) {
            simpleParser(stream, (err, parsed) => {
              if (err) {
                reject(err);
              } else {
                resolve(parsed.text || ''); // Resolve the email body
              }
            });
          });
        });

        f.once('end', function () {
          imap.end(); // Close IMAP connection
        });
      });
    });

    imap.once('error', function (err) {
      reject(err);
    });

    imap.once('end', function () {
      console.log('IMAP connection closed');
    });

    imap.connect(); // Establish the IMAP connection
  });
};

// Function to fetch email body by subject and extract the value of the textarea
export const fetchEmailBodyBySubject = (imapConfig: any, subject: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const imap = new Imap(imapConfig);

    imap.once('ready', function () {
      imap.openBox('INBOX', true, function (err, box) {
        if (err) {
          reject(err);
          return;
        }

        // Use a more flexible search (contains subject part)
        imap.search([['TEXT', subject]], function (err, results) {
          if (err) {
            reject(err);
            return;
          }

          if (results.length === 0) {
            reject(new Error('No emails found with the given subject.'));
            return;
          }

          // Fetch the email body for the first matching email
          const fetchOptions = { bodies: '', markSeen: false }; // Don't mark as read
          const f = imap.fetch(results[0], fetchOptions);

          f.on('message', function (msg) {
            msg.on('body', function (stream) {
              simpleParser(stream, (err, parsed) => {
                if (err) {
                  reject(err);
                } else {
                  // The email body might be in HTML, so we'll check for that first
                  const emailBody = parsed.html || parsed.text || '';

                  // Now extract the API key from the <textarea> content using regex
                  const apiKeyMatch = emailBody.match(/<textarea[^>]*>(.*?)<\/textarea>/s); // Match content inside <textarea>

                  if (apiKeyMatch) {
                    const apiKey = apiKeyMatch[1].trim(); // Extract the API key from the match
                    resolve(apiKey); // Return the API key
                  } else {
                    reject(new Error('API Key not found in email body.'));
                  }
                }
              });
            });
          });

          f.once('end', function () {
            imap.end(); // Close IMAP connection
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

    imap.connect(); // Establish the IMAP connection
  });
};
