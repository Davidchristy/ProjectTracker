import React from "react";
import {Alert, Button, Form, Modal} from "react-bootstrap";
import axios from "axios";


type MyProps = {
    // TODO: Sending the parent down probably isn't expandable
    App: any
};
type MyState = {
    showCardCreationError: boolean,
    cardCreationErrorText: string,
    tempListOfKanbans: string[]
    title: string,
    description: string,
    cardType: string,
    kanbanBoard: string,
    minutesToCompletion: number
};
class CreateCardModal extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            showCardCreationError: false,
            cardCreationErrorText: "",
            tempListOfKanbans: this.getListOfKanbans(),
            title: "",
            description: "",
            cardType: "Task",
            kanbanBoard: "",
            minutesToCompletion: 0
        };
    }

    changeInForm(name: string, value: string) {
        console.log(name, value)
        this.setState((current) => ({
            ...current,
            [name]: value
        }));
    }


    submit(e: React.FormEvent<HTMLElement>){

        console.log(this.state.kanbanBoard);
        e.preventDefault();
        //TODO: Do some validation stuff here, are any empty? HTML5 might do that...
        axios.put('http://localhost:9000/cards/createCard', {
            jwt: localStorage.getItem('jwt'),
            title: this.state.title,
            longFormDescription: this.state.description,
            cardType: this.state.cardType,
            kanbanBoard: this.state.kanbanBoard,
            itemsNeeded: [null],
            //TODO Add this below
            minutesToCompletion: 10
        }).then(response =>{
            // Success
            this.props.App.handleShowHideCreateCardModal.bind(this.props.App)(false)
        //    Popup box on bottom right should

        }, err =>{
            // Error

        })
    }

     getListOfKanbans(){
        // TODO: Send a message to the server/DB to get all the KanBan Boards this user can access
        function promiseTimeout (time: number) {
            return new Promise(function(resolve,reject){
                setTimeout(function(){resolve(time);},time);
            });
        };
        const success = () => {
            //TODO: While building this out there will only be one board, but many boards will be possible in full product
            this.setState({
                tempListOfKanbans: ["", "ProjectBoard1", "ProjectBoard2"]
            })
        }
        function failure(){
            return []
        }
        promiseTimeout(3000).then(success.bind(this), failure)

        return []
    }


    render(){
        return(
          <Modal
              show={this.props.App.state.showCreateCardModal}
              backdrop="static"
              >
              <Modal.Header closeButton onClick={()=>{
                  this.props.App.handleShowHideCreateCardModal.bind(this.props.App)(false)}}>
                  Create a new card
              </Modal.Header>
              <Form onSubmit={e=> {this.submit(e)}}>
                  <Modal.Body>
                      <Alert variant="danger"
                             show={this.state.showCardCreationError}
                             dismissible
                             onClose={() => {this.setState({
                                 showCardCreationError: false
                             })}}>
                          {this.state.cardCreationErrorText}
                      </Alert>

                      {/* Title */}
                      <Form.Label className="sr-only" htmlFor="accountCreationFormInputEmail">
                          Title
                      </Form.Label>
                      <span>Title:</span>
                      <Form.Control name="title"
                                    type="text"
                                    className="form-control mb-2 mr-sm-2"
                                    id="cardCreationFormInputTitle"
                                    placeholder="Title"
                                    onChange={e => {this.changeInForm(e.target.name, e.target.value);}}
                      />

                      {/*    What type of card is this? */}
                      <Form.Label className="sr-only" htmlFor="cardCreationFormInputType">
                          Type
                      </Form.Label>
                      <span>Type</span>
                      <Form.Control name="cardType"
                                    className="form-control mb-2 mr-sm-2"
                                    id="cardCreationFormInputType"
                                    as="select"
                                    onChange={e => {this.changeInForm(e.target.name, e.target.value);}}>
                          <option>Task</option>
                          <option>Bug</option>
                          <option>Feature</option>
                          <option>Project</option>
                      </Form.Control>

                      {/* Description */}
                      <Form.Label className="sr-only" htmlFor="cardCreationFormInputDescription">
                          Description
                      </Form.Label>
                      <span>Description:</span>
                      <Form.Control
                                    as="textarea"
                                    rows={3}
                                    name="description"
                                    className="form-control mb-2 mr-sm-2"
                                    id="cardCreationFormInputDescription"
                                    placeholder="Description"
                                    onChange={e => {this.changeInForm(e.target.name, e.target.value);}}
                      />

                      {/*    Which Kanban board it goes on */}
                      {/* TODO: We might want one card on many boards, a task for later*/}
                      <Form.Label className="sr-only" htmlFor="cardCreationFormInputKanbanBoard">
                          Kanban Board
                      </Form.Label>
                      <span>Kanban Board</span>
                      <Form.Control
                                    as="select"
                                    name="kanbanBoard"
                                    className="form-control mb-2 mr-sm-2"
                                    id="cardCreationFormInputKanbanBoard"
                                    onChange={(e) => {
                                        this.changeInForm(e.target.name, e.target.value);}}>

                          {this.state.tempListOfKanbans.map(board => <option>{board}</option>)}

                      </Form.Control>

                  {/* Do you need any items/locations to do/be at to complete */}

                  {/* Who is the owner of the card: Default to you (and only you for now)*/}

                  </Modal.Body>
                  <Modal.Footer>
                      <Button variant="primary" type="submit">
                          Submit
                      </Button>
                      <Button variant="secondary" onClick={()=>{
                          this.props.App.handleShowHideCreateCardModal.bind(this.props.App)(false)}}>
                          Close
                      </Button>
                  </Modal.Footer>
              </Form>
          </Modal>
        );
    }
}
export default CreateCardModal