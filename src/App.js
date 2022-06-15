import React, {useState, Component} from "react";
import "./style.css";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }
  
  render() {
    if (this.state.errorInfo) {
      // Error path
      return (
        <div>
          <h2>Something went wrong.</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }

    return(
      <div>
        {this.props.children}
      </div>
    )
  }
}

function ErrorSample(){
  const [counter, setCounter] = useState(0)
  const error = () => {
    setCounter(counter + 1)
    if(counter === 5) throw new Error('out of range')
  }

  return(
    <div>
      <button onClick={error}>{counter}</button>
    </div>
  )
}


export default function App() {
  return (
    <div>
      <ErrorBoundary>
      <h1>Hello StackBlitz!</h1>
      <ErrorSample />
      </ErrorBoundary>
      <p>Start editing to see some magic happen :)</p>
    </div>
  );
}
