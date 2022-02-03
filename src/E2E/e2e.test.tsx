import fs from "fs";
import dgram from "dgram";

import "../UdpListener/index"
import { store } from "..";

describe("Test with a buffer from a file", () => {
    // const consoleSpy = jest.spyOn(console, 'log');  
    
    beforeEach(() => {
        
        const rawdata = fs.readFileSync(__dirname + "/buffer.json");
        const jsonBuffer = JSON.parse(rawdata.toString());
        const newBuffer = Buffer.from(jsonBuffer.data);

        const client = dgram.createSocket({ type: "udp4", reuseAddr: true });

        client.bind(60084, "255.255.255.255");

        setTimeout(() => {
            client.setBroadcast(true);
            client.send(newBuffer, 0, newBuffer.length, 60084, "255.255.255.255", (err) => {
                client.close();
            });
        }, 1500);
    });

    it("should have the correct values in the buffer", async () => {
        const wait = true;
        await new Promise((r) => setTimeout(r, 2000));
        expect(wait).toBeDefined();

        expect(store.getState().msgBlock.length).toEqual(8);

        // const loggedData = consoleSpy.mock.calls[1][0][0]
        // expect(loggedData).toContain("Row 00: 11011001000010010010101100000000")
    });
});
