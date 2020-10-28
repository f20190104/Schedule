import React, {Component} from 'react';
import {Navbar, NavbarBrand, ListGroup, ListGroupItem, Container, Row, Col, Card, CardTitle, Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';

class Schedule extends Component{
    constructor(props){
        super(props);
        this.state ={
            isModalOpen : false,
            title: "",
            date: "",
            startTime: "",
            endTime:"",
            participants: "",
            data: []
        }
        this.toggleModal = this.toggleModal.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }
    submitForm(){
        const data = {
            title: this.state.title,
            date: this.state.date,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            participants: this.state.participants
        };
        console.log(JSON.stringify(data));
        this.setState({
            isModalOpen : false,
            title: "",
            date: "",
            startTime: "",
            endTime:"",
            participants: ""
        });
    this.render();
    }
    render(){
        const query_schedule = gql`
        {
            schedule_schedule {
                title
                endTime
                startTime
                date
                participants
            }
        }`;
        const POST = gql`
        mutation insert_schedule_schedules_one($title:String!, $date: String!, $startTime: String!, $endTime:String!,$participants:Int!){
            insert_schedule_schedule_one(object: {title:$title, date: $date, startTime: $startTime, endTime:$endTime, participants:$participants}){
                title
            }
        }`
        return(<div>
           <Navbar color="light" light>
               <NavbarBrand href="/">Schedules</NavbarBrand>
           </Navbar>
            <Container style={{marginTop: 20}}>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader>Schedule a New Meeting</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label>Title</Label>
                                <Input type="text" value={this.state.title} 
                                placeholder="Enter the title of your meeting" 
                                onChange={(event)=>{this.setState({title:event.target.value})}}></Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Date</Label>
                                <Input type="date" value={this.state.date} 
                                placeholder="Enter the date of your meeting" 
                                onChange={(event)=>{this.setState({date:event.target.value});}}></Input>
                            </FormGroup>
                            <Row>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>Start Time</Label>
                                        <Input type="time" value={this.state.startTime}  
                                        onChange={(event)=>{this.setState({startTime:event.target.value});}}></Input>
                                    </FormGroup>
                                </Col>
                                <Col md={6}>
                                    <FormGroup>
                                        <Label>End Time</Label>
                                        <Input type="time" value={this.state.endTime}  
                                        onChange={(event)=>{this.setState({endTime:event.target.value});}}></Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <FormGroup>
                                <Label>Number of Participants</Label>
                                <Input type="number" value={this.state.participants} 
                                placeholder="Enter the number of participants of the meeting" 
                                onChange={(event)=>{this.setState({participants: parseInt(event.target.value,10)});}}></Input>
                            </FormGroup>
                            <Mutation mutation={POST} variables={{title: this.state.title,startTime: this.state.startTime, endTime: this.state.endTime, date:this.state.date, participants:this.state.participants}}>
                            {postmutation=><Button onClick={()=>{postmutation();this.submitForm();}}>Submit</Button>}
                            </Mutation>
                        </Form>
                    </ModalBody>
                </Modal>
                
                <div style={{display:"flex", flexDirection:"row-reverse", marginBottom: 10}}>
                    <Button onClick={this.toggleModal}>Schedule New Meeting</Button>
                </div>
                <Query query={query_schedule}>
                        {({loading,error,data})=>{
                            if (loading) return <div>Loading</div>
                            if (error) return <div>Error</div>
                           const schedules = data.schedule_schedule;
                           return(<ListGroup>
                            {schedules.map((item)=>{return (
                            <ListGroupItem>
                                <Row>
                                    <Col md ={4}>
                                        <Card style={{backgroundColor:"#FDC05D", display:'flex', alignContent:'center', justifyContent:'center'}}>
                                            <CardTitle style={{fontSize: "150%", marginLeft: 10, textAlign:'center'}}>{item.title}</CardTitle>
                                        </Card>
                                    </Col>
                                    <Col md={8}>
                                        <Row>
                                            <Col md={4}>Date : {item.date}</Col>
                                            <Col md={4}>Time: {item.startTime} to {item.endTime}</Col>
                                            <Col md={4}> Participants: {item.participants}</Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </ListGroupItem>
                            );
                            })}
                        </ListGroup>);
                        }}
                </Query>
                <Row>
                    <Col md={8}>

                    </Col>
                    <Col md={4}>
                        Note: You may have to refresh the webpage to be able to see newly created schedules
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}
export default Schedule;