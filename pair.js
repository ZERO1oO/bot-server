const {
  default: makeWASocket,
  useMultiFileAuthState
} = require("@whiskeysockets/baileys");

async function pairNumber(number) {
  const { state, saveCreds } = await useMultiFileAuthState("sessions/" + number);

  const sock = makeWASocket({
    auth: state
  });

  sock.ev.on("creds.update", saveCreds);

  const code = await sock.requestPairingCode(number);

  return code;
}

module.exports = { pairNumber };