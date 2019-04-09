import React from 'react';
import {form} from '../component';

export default class IndexPage extends React.Component {
  state = {
    fetching: false,
    result: {},
    errors: {},
  };

  preFetch = () => {
    this.setState({fetching: true});
  };

  postFetch = result => {
    this.setState({
      fetching: false,
      errors: {},
      result,
    });
  };

  showErrors = errors => {
    this.setState({
      fetching: false,
      errors,
    });
  };

  render() {
    return (
      <div className="terminal">
        <div className="container">
          <div className="terminal-nav">
            <div className="terminal-logo">
              <div className="logo terminal-prompt">
                <a href="#" className="no-style">
                  calculate subnet
                </a>
              </div>
            </div>
          </div>
          <form.input
            fetching={this.state.fetching}
            errors={this.state.errors}
            onSubmit={async values => {
              this.preFetch();

              const result = await fetch('/api/v1/calc', {
                method: 'POST',
                body: JSON.stringify({
                  ipAddress: values.ipAddress,
                  subnetmask: values.subnetmask,
                }),
                headers: {
                  'Content-type': 'application/json; charset=utf-8',
                },
              }).then(res => res.json());

              if (result.ok) {
                return this.postFetch(result.payload);
              }

              return this.showErrors(result.errors);
            }}
          />

          <form.output result={this.state.result} />

          <hr />

          <section>
            <header>
              <h2>Navigation Lists</h2>
            </header>
            <nav>
              <ul>
                <li>
                  <span>Libraries</span>
                  <ul>
                    <li>
                      <a href="https://www.npmjs.com/package/react">React</a>
                    </li>
                    <li>
                      <a href="https://www.npmjs.com/package/next">NextJS</a>
                    </li>
                    <li>
                      <a href="https://www.npmjs.com/package/terminal.css">
                        Terminal.css
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <span>Author - nju33</span>
                  <ul>
                    <li>
                      <a href="https://github.com/nju33">GItHub</a>
                    </li>
                    <li>
                      <a href="https://nju33.com">Blog</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </nav>
          </section>
        </div>
      </div>
    );
  }
}
