import React from 'react';
import styled from 'styled-components';
import {Formik} from 'formik';
import Clipboard from 'clipboard';

const Form = styled.form`
  .row {
    display: flex;
    align-items: center;
  }

  .row span {
    padding: 10px;
  }

  .row .terminal-alert {
    padding: 0.55em 2em;
    margin-left: 0.5em;
    margin-bottom: 0;
  }
`;

/* eslint-disable react/prop-types */
export const output = class Output extends React.Component {
  copyBtnRef = React.createRef();

  state = {
    successMessage: undefined,
  };

  componentDidMount() {
    if (this.copyBtnRef.current === null) {
      return;
    }

    const clipboard = new Clipboard(this.copyBtnRef.current);
    clipboard.on('success', () => {
      this.setState({successMessage: 'Copied!'});

      setTimeout(() => {
        this.setState({successMessage: undefined});
      }, 3000);
    });
  }

  get networkAddress() {
    if (Object.keys(this.props.result).length === 0) {
      return [];
    }

    return this.props.result.networkAddress;
  }

  get broadcastAddress() {
    if (Object.keys(this.props.result).length === 0) {
      return [];
    }

    return this.props.result.broadcastAddress;
  }

  get hostAddressRange() {
    if (Object.keys(this.props.result).length === 0) {
      return [[], []];
    }

    return this.props.result.hostAddressRange;
  }

  render() {
    return (
      <Formik
        initialValues={{
          networkAddress: this.networkAddress.join('.'),
          broadcastAddress: this.broadcastAddress.join('.'),
          hostAddressFrom: this.hostAddressRange[0].join('.'),
          hostAddressTo: this.hostAddressRange[1].join('.'),
        }}
        enableReinitialize
        onSubmit={() => {}}
      >
        {formikProps => {
          return (
            <Form onSubmit={formikProps.handleSubmit}>
              <fieldset>
                <legend>OUTPUT</legend>
                <div className="form-group">
                  <label htmlFor="networkAddressDecimal">
                    Network Address:
                    {this.networkAddress
                      .map(number =>
                        ('00000000' + number.toString(2)).slice(-8),
                      )
                      .join('.')}
                  </label>
                  <input
                    name="networkAddressDecimal"
                    id="networkAddressDecimal"
                    type="text"
                    readOnly
                    value={formikProps.values.networkAddress}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="hostAddressFrom">
                    Host Address:{' '}
                    <span style={{display: 'inline-block'}}>
                      {this.hostAddressRange
                        .map(address => {
                          if (address.length === 0) {
                            return undefined;
                          }

                          return address
                            .map(number =>
                              ('00000000' + number.toString(2)).slice(-8),
                            )
                            .join('.');
                        })
                        .filter(Boolean)
                        .join(' ~ ')}
                    </span>
                  </label>
                  <div className="row">
                    <input
                      name="hostAddressFrom"
                      id="hostAddressFrom"
                      type="text"
                      readOnly
                      value={formikProps.values.hostAddressFrom}
                    />
                    <span> ~ </span>
                    <input
                      name="hostAddressTo"
                      id="hostAddressTo"
                      type="text"
                      readOnly
                      value={formikProps.values.hostAddressTo}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="broadcastAddress">
                    Broadcast Address:{' '}
                    {this.networkAddress
                      .map(number =>
                        ('00000000' + number.toString(2)).slice(-8),
                      )
                      .join('.')}
                  </label>
                  <div className="row">
                    <input
                      name="broadcastAddress"
                      id="broadcastAddress"
                      type="text"
                      readOnly
                      value={formikProps.values.broadcastAddress}
                    />
                  </div>
                </div>
              </fieldset>
            </Form>
          );
        }}
      </Formik>
    );
  }
};
