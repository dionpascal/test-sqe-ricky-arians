import './App.css';
import axios from 'axios';
import {useEffect, useState} from 'react'
import data from './pokemon.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col,Card, Input, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';


function App() {
 const [detailPokemin, setDetailPokemon] = useState(null)
 const [dataPaging, setDataPaging] = useState({
   limit : 20,
   currentPage: 1,
   totalPage: 0,
   pageData: []
 })

 const [modal, setModal] = useState(false);
 const toggle = () => setModal(!modal);

  const getandshow = (url) => {
    axios.get(url).then(res =>{
        console.log(res.data)
        setDetailPokemon(res.data)
        setModal(true)
    })
  }

  const currentPageNumber = (dataPaging.currentPage * dataPaging.limit) - dataPaging.limit

  const listPokemon = data.results.splice(currentPageNumber, dataPaging.limit)


  return (
    <div className="container mt-5">
        <div>
        <Row>
          <Col>
              <h1>Pokedex</h1>
          </Col>
          <Col>
          <Input
        />
          </Col>
        </Row>
        </div>
        <div>
           <Row>
              {
                listPokemon.length > 0 && listPokemon.map((item, index) => {
                  return (
                    <Col lg={3} className="my-2">
                        <Card className="px-3 py-3" onClick={() => getandshow(item.url)}>
                            <h5 className="mb-0">#{index+1}</h5>
                            <h3>{item.name}</h3> 
                        </Card>
                    </Col>
                  )
                })
              }
           </Row>
        </div>

        <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Modal title</ModalHeader>
        <ModalBody>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Do Something
          </Button>{' '}
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default App;
