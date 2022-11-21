import { render, screen, cleanup, getByAltText, within, fireEvent } from "@testing-library/react";
import { GameCards } from "../gamecard";
import { defaultContext, store } from "../../store";
import { MockedProvider } from "@apollo/client/testing";
import { Provider } from "mobx-react";
import { Game, Comment } from "../../types";
import renderer, { act } from "react-test-renderer";
import userEvent from "@testing-library/user-event";
import { games } from "./testData/Games"
import { BackToTopButton } from "../gamecard/BackToTopButton";
import { CommentView } from "../gamecard/Comment";
import { GameCardModal } from "../gamecard/GameCardModal";

const comment: Comment = {
  name: "the watcher",
  rating: 3,
  comment: "i recommend this game",
};



window.scrollTo = jest.fn();

afterEach(cleanup);

beforeEach(() => {
  store.resetStores()
  for (let i = 0; i < 16; i++) {
    store.dataStore.data.push(games[i]);
  }
})

describe("GameCards test", () => {

  afterAll(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing, and shows correct games", async () => {
    render(
      <Provider {...defaultContext}>
        <MockedProvider addTypename={false}>
          <GameCards />
        </MockedProvider>
      </Provider>
    );

    screen.getByText(/overcooked/i);
    screen.getByText(/May 12, 1962/i);
    screen.getByText(/Action/i);
    screen.getByText(/84%/i);

    screen.getByText(/elden ring/i);
    screen.getByText(/trackmania/i);
    screen.getByText(/Mamma mia/i);
    
    screen.queryByTestId("back-to-top-button");

    fireEvent.click(screen.getByText(/overcooked/i));
  });


  it("game card modal test", () => {
    expect(store.modalStore.game).toBeUndefined();
    store.modalStore.selectGame(games[0].appId)
    render(
      <Provider {...defaultContext}>
        <MockedProvider addTypename={false}> 
          <GameCardModal open={true} onClose={() => {}} />
        </MockedProvider>
      </Provider>
    );

    expect(store.modalStore.game).toBeUndefined();
    store.modalStore.selectGame(games[0].appId)


    console.log(store.modalStore.game);
    screen.getByText(/mamamsds/i);
    expect(store.modalStore.showModal).toEqual(true);
    expect(store.modalStore.game).toEqual(games[0]);
    
  });  


  it("comment view test", () => {
    render(<CommentView name={comment.name} rating={comment.rating} comment={comment.comment} />);
    screen.getByText(/the watcher/i);
    screen.getByText(/i recommend this game/i);
  });  

  it("back to top button", async () => {
    render(<BackToTopButton />);
    
    const button = screen.getByTestId("back-to-top");
    expect(button).toBeInTheDocument();
    
    fireEvent.scroll(window, { target: { scrollY: 200 } });
    expect(screen.queryByTestId("ArrowIcon")).toBeNull();;

    fireEvent.scroll(window, { target: { scrollY: 1500 } });
    expect(screen.getByTestId("ArrowIcon")).toBeInTheDocument();;

    fireEvent.click(screen.getByTestId("ArrowIcon"));

    expect(window.screenY).toBe(0);
    expect(screen.queryByTestId("ArrowIcon")).toBeNull();;
  });  
});

/*
describe("Filter snapshot test", () => {
  it("render filter component", () => {
    const tree = renderer
      .create(
        <Provider {...defaultContext}>
          <MockedProvider addTypename={false}>
            <GameCards />
          </MockedProvider>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
}); */
