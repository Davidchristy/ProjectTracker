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
};
class CreateCardModal extends React.Component<MyProps, MyState> {
    constructor(props: any) {
        super(props);
        this.state = {
            showCardCreationError: false,
            cardCreationErrorText: "",
            tempListOfKanbans: this.getListOfKanbans()
        };
        console.log(this.state.tempListOfKanbans)

    }

    submit(e: React.FormEvent<HTMLElement>){
        e.preventDefault();
        axios.put('http://localhost:9000/cards/createCard', {
            title: null,
            //TODO: Add this to form below
            longFormDescription: null,
            cardType: null,
            kanbanBoard: null,
            itemsNeeded: [null],
            timeToCompletion: null
        }).then(response =>{
            // Success

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
            this.setState({
                tempListOfKanbans: ["New1", "New2"]
            })
        }
        function failure(){
            return []
        }
        promiseTimeout(3000).then(success.bind(this), failure)

        return []
    }


    render(){
        console.log(this.state.tempListOfKanbans)
        return(
          <Modal
              show={this.props.App.state.showCreateCardModal}
              backdrop="static"
              >
              <Modal.Header closeButton onClick={()=>{
                  this.props.App.handleShowHideCreateCardModal.bind(this.props.App)(false)}}>
                  Create a new card
              </Modal.Header>
              <Form>
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
                      <Form.Control name="Title"
                                    type="text"
                                    className="form-control mb-2 mr-sm-2"
                                    id="cardCreationFormInputTitle"
                                    placeholder="Title"
                      />

                      {/*    What type of card is this? */}
                      <Form.Label className="sr-only" htmlFor="cardCreationFormInputType">
                          Type
                      </Form.Label>
                      <span>Type</span>
                      <Form.Control name="cardType"
                                    className="form-control mb-2 mr-sm-2"
                                    id="cardCreationFormInputType"
                                    as="select" >
                          <option>Task</option>
                          <option>Bug</option>
                          <option>Feature</option>
                          <option>Project</option>
                      </Form.Control>

                      {/*    Which Kanban board it goes on */}
                      {/* TODO: We might want one card on many boards, a task for later*/}
                      <Form.Label className="sr-only" htmlFor="cardCreationFormInputType">
                          Kanban Board
                      </Form.Label>
                      <span>Kanban Board</span>
                      <Form.Control name="kanbanBoard"
                                    className="form-control mb-2 mr-sm-2"
                                    id="cardCreationFormInputKanbanBoard"
                                    as="select" >

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