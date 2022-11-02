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
    window.resizeTo(700, 700);


    return (
        <div className="message-block-holder">
            <div>{altCount}</div>
            <div style={{ whiteSpace: "pre" }}>{message}</div>
            <div style={{ whiteSpace: "pre" }}>{latLon}</div>
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
