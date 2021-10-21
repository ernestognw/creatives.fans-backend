import './App.css';
import {Container} from 'react-bootstrap';
import {Row} from 'react-bootstrap';
import {Col} from 'react-bootstrap';
//import Button from '@material-ui/core/Button'

function App() {
  return (
      <Container fluid="md" className="App">
        <h1> CreativesFans </h1>
        <h3>Acepta donaciones de tus fans y <br></br> 
        sigue financiando tu trabajo creativo.</h3>
      
        <Row>
          
          <Col>  
            <button className="App-login">
            Iniciar Sesión
            </button>
          </Col>

          <Col>
            <button className="App-create-profile">
            Crear perfil →
            </button>
          </Col>

        </Row>
        <Row>
          <Col>
            <button className="App-login">
            🔍 Creadores
            </button>
          </Col>
        </Row>
      </Container>

  );
}

export default App;
