import { useSelector } from "react-redux";
import { useAppSelector } from "../../Store/AppState";
import { v4 as uuidv4 } from "uuid";
// import '../../UdpListener/index';
import "./BlockList.css";

export const BlockList = () => {
    const msgBlock = useAppSelector((state) => state.msgBlock);
    const altCount = useAppSelector((state) => state.altitudeCount);
    const message = useAppSelector((state) => state.message);
    const latLon = useAppSelector((state) => state.latLon);
    const fuel = useAppSelector((state) => state.fuel);
    const callsign = useAppSelector((state) => state.callsign);
    const temperature = useAppSelector((state) => state.temperature);
    window.resizeTo(700, 700);


    return (
        <div className="message-block-holder">
            <div>{altCount}</div>
            <div style={{ whiteSpace: "pre" }}>{message}</div>
            <div style={{ whiteSpace: "pre" }}>{latLon}</div>
            <div style={{ whiteSpace: "pre" }}>{fuel}</div>
            <div style={{ whiteSpace: "pre" }}>{callsign}</div>
            <div style={{ whiteSpace: "pre" }}>{temperature}</div>
            {msgBlock.map((block) => {
                return (
                    <div
                        key={uuidv4()}
                        className="message-block-individual-block"
                    >
                        {block.map((row) => {
                            return (
                                <div
                                    key={uuidv4()}
                                    className="message-block-individual-row"
                                >
                                    {row}
                                </div>
                            );
                        })}
                        <br />
                    </div>
                );
            })}
        </div>
    );
};
