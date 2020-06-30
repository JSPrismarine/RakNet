'use strict'

// Identifiers used to identify incoming packets
const Identifiers = {

    UnconnectedPing: 0x01,
    UnconnectedPong: 0x1c,
    OpenConnectionRequest1: 0x05,
    OpenConnectionReply1: 0x06,
    OpenConnectionRequest2: 0x07,
    OpenConnectionReply2: 0x08,
    ConnectionRequest: 0x09,
    ConnectionRequestAccepted: 0x10,
    NewIncomingConnection: 0x13,
    DisconnectNotification: 0x15,
    IncompatibleProtocolVersion: 0x19,

    AcknowledgePacket: 0xc0,
    NacknowledgePacket: 0xa0

}
module.exports = Identifiers