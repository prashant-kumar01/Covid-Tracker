import React,{ useEffect , useState } from 'react';
import "./App.css";
import Card from 'react-bootstrap/Card'
import CardDeck from 'react-bootstrap/CardDeck'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Columns from "react-columns";
import Form from 'react-bootstrap/Form'
import { MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBCardImage, MDBRow, MDBCol } from 'mdb-react-ui-kit';

function App() {
  const [latest, setLatest] = useState([]);
  const [results, setResults] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    axios
    .all([
    axios.get("https://corona.lmao.ninja/v2/all"),
    axios.get("https://corona.lmao.ninja/v2/countries?sort=country")
    ])
    .then(responseArr => {
      setLatest(responseArr[0].data);
      setResults(responseArr[1].data);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  const date = new Date(parseInt(latest.updated));
  const lastUpdated = date.toString();

  const filterCountry = results.filter((item) => {
    return searchCountry !== ""
      ? item.country.toLowerCase().includes(searchCountry.toLowerCase())
      : "";
  });
  const countries = filterCountry.map((data, i) => {
    return (
      // <Card
      //   key={i}
      //   bg={"light"}
      //   text={"dark"}
      //   className="text-center"
      //   style={{ margin: "10px", width: '20rem' }}
      // >
      //   <Card.Img variant="top" src={data.countryInfo.flag} />
      //   <Card.Body class="font-weight-bold text-#f5f5f5">
      //     <Card.Title>{data.country}</Card.Title>
      //     <Card.Text>Cases - {data.cases}</Card.Text>
      //     <Card.Text>Deaths - {data.deaths}</Card.Text>
      //     <Card.Text>Recovered - {data.recovered}</Card.Text>
      //   </Card.Body>
      // </Card>
      <MDBCard key={i}
        bg={"light"}
        text={"dark"}
        className="text-center abc"
        >
      <MDBRow className='g-0 block-example border border-dark box'>
        <MDBCol>
          <MDBCardImage  style={{height: '100%', width: '100%'}} variant="top" src={data.countryInfo.flag} />
        </MDBCol>
        <MDBCol >
          <MDBCardBody>
            <MDBCardTitle>{data.country}</MDBCardTitle>
            <MDBCardText>Cases - {data.cases}</MDBCardText>
            <MDBCardText>Deaths - {data.deaths}</MDBCardText>
            <MDBCardText>Recovered - {data.recovered}</MDBCardText>
          </MDBCardBody>
        </MDBCol>
      </MDBRow>

    </MDBCard>

    );
  });

  var queries = [{
    columns: 2,
    query: 'min-width: 500px'
  }, {
    columns: 3,
    query: 'min-width: 1000px'
  }];

  return (
    <div className="body1">
      <div className="header">
      <p class="name" >COVID-19 Live Stats <i class="fas fa-virus virus"></i><i class="fas fa-virus virus1"></i></p>
      <p><a href="https://selfregistration.cowin.gov.in/" target="_blank"><i class="fas fa-syringe link"></i></a></p>
      </div>
      <p class="quote">
      <marquee behavior="scroll" direction="left">"COVID vaccine is safe, and you can't get safer than safe."  Click on the <i class="fas fa-syringe"></i> to Register</marquee>
      </p>
      <p class="world">COVID-19 stats across the world <i class="fas fa-globe-africa"></i></p>
    <CardDeck>
    <Card bg="primary" text="white" className="text-center box" style={{margin:'10px'}}>
      <Card.Body>
        <Card.Title>Cases</Card.Title>
        <Card.Text>
        {latest.cases}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small >Last updated {lastUpdated}</small>
      </Card.Footer>
    </Card>
    <Card bg="danger" text={"white"} className="text-center box" style={{margin:'10px'}}>
      <Card.Body>
        <Card.Title>Deaths</Card.Title>
        <Card.Text>
        {latest.deaths}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small >Last updated {lastUpdated}</small>
      </Card.Footer>
    </Card>
    <Card bg="success" text="white" className="text-center box" style={{margin:'10px'}}>
      <Card.Body>
        <Card.Title>Recovered</Card.Title>
        <Card.Text>
        {latest.recovered}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
        <small >Last updated {lastUpdated}</small>
      </Card.Footer>
    </Card>
  </CardDeck>
  <Form>
        <Form.Group controlId="formGroupSearch">
        <Form.Label class="form">Search any country <i class="far fa-flag"></i></Form.Label>
          <Form.Control
            bg="dark"
            type="text"
            style={{width:'30%',margin:'10px'}}
            className="search"
            placeholder="Search"
            onChange={(e) => setSearchCountry(e.target.value)}
          />
        </Form.Group>
      </Form>
  <Columns queries={queries}>
    {countries}
  </Columns>
  </div>
  );
}

export default App;
