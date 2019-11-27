import React from 'react';
import { Link } from 'react-router-dom';

class SeasonalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      produceList: []
    };
    this.name = props.match.params.name;
    this.getProduceList = this.getProduceList.bind(this);
  }

  getProduceList(name) {
    fetch(`/api/produce-in-season?seasonName=${name}`)
      .then(results => results.json())
      .then(produce => this.setState({ produceList: produce }))
      .catch(error => console.error(error.message));
  }

  componentDidMount() {
    this.getProduceList(this.name);
  }

  render() {
    if (!this.state.produceList.length) {
      return <h1>This is a Seasonal page</h1>;
    } else {
      return (
        <div>
          <h1>This is a {this.name} page</h1>
          <ul>
            {this.state.produceList.map(produce => {
              return (
                <li key={produce.id}>
                  <Link to={`/produce/${produce.name}`}>
                    {produce.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  }
}

export default SeasonalPage;
