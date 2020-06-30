const Packet = require('./packet')
const EncapsulatedPacket = require('./encapsulated_packet')
const BitFlags = require('./bitflags')
const BinaryStream = require('jsbinaryutils')

'use strict'

class DataPacket extends Packet {

    /** @type {EncapsulatedPacket[]} */
    packets = []

    // Packet sequence number
    // used to check for missing packets
    #sequenceNumber

    read() {
        super.read()
        this.#sequenceNumber = this.readLTriad()
        while (!this.feof()) {
            this.packets.push(EncapsulatedPacket.fromBinary(this))
        }
    }

    write() {
        this.writeByte(BitFlags.Valid | 0)
        this.writeLTriad(this.#sequenceNumber)
        for (let packet of this.packets) {
            this.append(packet instanceof EncapsulatedPacket ? packet.toBinary() : packet.buffer)
        }
    }

    length() {
        let length = 4
        for (let packet of this.packets) {
            length += packet instanceof EncapsulatedPacket ? packet.getTotalLength() : packet.buffer.length
        }
        return length
    }

    get sequenceNumber() {
        return this.#sequenceNumber
    }

    set sequenceNumber(sequenceNumber) {
        this.#sequenceNumber = sequenceNumber
    }

}
module.exports = DataPacket