import React from 'react';
import styled from 'styled-components';
import {Formik} from 'formik';
import {object, string} from 'yup';

const Form = styled.form`
  .error {
    color: var(--error-color);
    margin-bottom: 0;
  }

  button[disabled] {
    cursor: default;

    &:hover {
      background-color: var(--font-color);
      border-color: var(--invert-font-color);
      color: var(--invert-font-color);
    }
  }

  .subnetmask-row {
    display: flex;

    & > * {
      flex: 1;
    }

    & > input:first-child {
      flex: 10;
    }
  }
`;

/* eslint-disable react/prop-types */
export const input = class Input extends React.Component {
  render() {
    return (
      <>
        <Formik
          initialValues={{roundsOfSalt: 13, text: ''}}
          validationSchema={object().shape({
            ipAddress: string()
              .matches(
                /^(?:[0-9]|[1-9][0-9]|[12][0-9][0-9])\.(?:[0-9]|[1-9][0-9]|[12][0-9][0-9])\.(?:[0-9]|[1-9][0-9]|[12][0-9][0-9])\.(?:[0-9]|[1-9][0-9]|[12][0-9][0-9])$/,
                'Format is different',
              )
              .required('Required'),
            subnetmask: string()
              .matches(
                /^(?:[0-9]|[1-9][0-9]|[12][0-9][0-9])\.(?:[0-9]|[1-9][0-9]|[12][0-9][0-9])\.(?:[0-9]|[1-9][0-9]|[12][0-9][0-9])\.(?:[0-9]|[1-9][0-9]|[12][0-9][0-9])$/,
                'Format is different',
              )
              .required('Required'),
          })}
          onSubmit={this.props.onSubmit}
        >
          {formikProps => {
            return (
              <Form onSubmit={formikProps.handleSubmit}>
                <fieldset>
                  <legend>INPUT</legend>
                  <div className="form-group">
                    <label htmlFor="ipAddress">IP Address:</label>
                    <input
                      name="ipAddress"
                      id="ipAddress"
                      type="text"
                      placeholder="127.0.0.1"
                      required
                      value={formikProps.values.ipAddress}
                      onBlur={formikProps.handleBlur}
                      onChange={formikProps.handleChange}
                    />
                    {formikProps.touched.ipAddress &&
                      formikProps.errors.ipAddress && (
                        <p className="error">{formikProps.errors.ipAddress}</p>
                      )}
                    {this.props.errors.ipAddress && (
                      <p className="error">{this.props.errors.ipAddress}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="subnetmask">Subnetmask:</label>
                    <div className="subnetmask-row">
                      <input
                        name="subnetmask"
                        id="subnetmask"
                        type="text"
                        required
                        placeholder="255.255.255.0"
                        value={formikProps.values.subnetmask}
                        onBlur={formikProps.handleBlur}
                        onChange={formikProps.handleChange}
                      />
                      <input
                        name="subnetmaskNumber"
                        id="subnetmaskNumber"
                        type="text"
                        readOnly
                        value={(formikProps.values.subnetmask || '')
                          .split('.')
                          .reduce((sum, numStr) => {
                            sum += Number(numStr)
                              .toString(2)
                              .replace(/0/g, '').length;
                            return sum;
                          }, 0)}
                      />
                    </div>
                    {formikProps.touched.subnetmask &&
                      formikProps.errors.subnetmask && (
                        <p className="error">{formikProps.errors.subnetmask}</p>
                      )}
                    {this.props.errors.subnetmask && (
                      <p className="error">{this.props.errors.subnetmask}</p>
                    )}
                  </div>
                  <div className="form-group">
                    <button
                      className={
                        formikProps.isValid
                          ? 'btn btn-primary'
                          : 'btn btn-default'
                      }
                      type="submit"
                      role="button"
                      name="submit"
                      disabled={!formikProps.isValid || this.props.fetching}
                    >
                      Calculate
                    </button>
                  </div>
                </fieldset>
              </Form>
            );
          }}
        </Formik>
        <section style={{marginTop: 24}}>
          <header>
            <h2>Supplement</h2>
          </header>
          <ul>
            <li>`IP Address` An Internet Protocol address</li>
            <li>`Subnetmask` a logical subdivision of an IP network</li>
          </ul>
        </section>
      </>
    );
  }
};
