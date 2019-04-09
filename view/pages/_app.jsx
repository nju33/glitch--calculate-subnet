import React from 'react';
import NextApp, {Container} from 'next/app';
import {createGlobalStyle} from 'styled-components';
// import 'terminal.css';

const GlobalStyle = createGlobalStyle`
	/* ! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.csshtml{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}main{display:block}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}template{display:none}[hidden]{display:none} */

	:root {
    --global-font-size: 15px;
    --global-line-height: 1.4em;
    --global-space: 10px;
    --font-stack: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
    --mono-font-stack: Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
    --background-color: #222225;
    --page-width: 60em;
    --font-color: #e8e9ed;
    --invert-font-color: #222225;
    --secondary-color: #a3abba;
    --tertiary-color: #a3abba;
    --primary-color: #62c4ff;
    --error-color: #ff3c74;
    --progress-bar-background: #3f3f44;
    --progress-bar-fill: #62c4ff;
    --code-bg-color: #3f3f44;
    --input-style: solid;
    --display-h1-decoration: none;
	}

  html {
    height: 100%;
  }

  body {
		margin: 0;
    height: 100%;
		/* font-family: 'Karla', sans-serif; */
		/* color: #f8f8f8; */
		/* background: #292929; */
  }

	#__next {
		height: 100%;
	}
`;

export default class App extends NextApp {
  state = {
    mounted: false
  };

  render() {
    const {Component, pageProps} = this.props;

    return (
      <Container>
        <GlobalStyle />
        <Component {...pageProps} />
      </Container>
    );
  }
}
