import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { AppStore, createAppStore } from "../../../Store/AppState"
import { BlockList } from "../BlockList";

describe('When the redux store gets a new msgBlock', () => {
    let mockStore: AppStore;
    beforeEach(() => {
        mockStore = createAppStore();

        render(
            <Provider store={mockStore}>
                <BlockList />
            </Provider>
        )

        mockStore.dispatch({ type: "SET_MESSAGE_BLOCK", msgBlock: [["test 1", "line 1"], ["test 2", "line 2"]] });
    })

    it("should display a line with the blocks of the message", () => {
        expect(screen.getByText("test 1")).toBeInTheDocument();
        expect(screen.getByText("line 1")).toBeInTheDocument();
        expect(screen.getByText("test 2")).toBeInTheDocument();
        expect(screen.getByText("line 2")).toBeInTheDocument();
        expect(screen.queryByText("test 3")).not.toBeInTheDocument();
        expect(screen.queryByText("line 3")).not.toBeInTheDocument();
    })
})