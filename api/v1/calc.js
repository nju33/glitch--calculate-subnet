const bodyParser = require('body-parser');

const splitAddress = str => str.split('.');

module.exports = async (req, res) => {
  await new Promise(resolve => {
    bodyParser.json()(req, res, resolve);
  });

  const {ipAddress, subnetmask} = req.body;

  const splittedIpAddress = splitAddress(ipAddress);
  const splittedsubnetmask = splitAddress(subnetmask);

  const networkAddress = Array.from(Array(4)).map((_, i) => {
    return Number(splittedIpAddress[i] & splittedsubnetmask[i]);
  });
  // Const networkAddressStr = networkAddress.join('.');
  const hostRanges = Array.from(Array(4)).map((_, i) => {
    if (splittedsubnetmask[i] === '255') {
      return undefined;
    }

    return '255' & String(255 - Number(splittedsubnetmask[i]));
  });

  res.setHeader('Content-type', 'application/json; charset=utf-8');

  return res.end(
    JSON.stringify({
      ok: true,
      payload: {
        networkAddress,
        broadcastAddress: hostRanges.map((item, i) => {
          if (typeof item === 'undefined') {
            return networkAddress[i];
          }

          return (
            Number(networkAddress[i]) + 255 - Number(splittedsubnetmask[i])
          );
        }),
        hostAddressRange: [
          hostRanges.map((item, i) => {
            if (typeof item === 'undefined') {
              return networkAddress[i];
            }

            // ネットワーク分だけ +1
            if (i === 3) {
              return networkAddress[i] + 1;
            }

            return networkAddress[i];
          }),
          hostRanges.map((item, i) => {
            if (typeof item === 'undefined') {
              return networkAddress[i];
            }

            // ブロードキャスト分だけ -1
            if (i === 3) {
              return (
                Number(networkAddress[i]) +
                255 -
                Number(splittedsubnetmask[i]) -
                1
              );
            }

            return (
              Number(networkAddress[i]) + 255 - Number(splittedsubnetmask[i])
            );
          }),
        ],
      },
    }),
  );
};
