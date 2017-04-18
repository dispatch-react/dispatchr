import React from 'react';
import Autosuggest from 'react-autosuggest';

const contacts = [
  {
    name: 'C',
    year: 1972
  },
  {
    name: 'Elm',
    year: 2012
  },
  {
    name: 'Javascript',
    year: 1995
  },
  {
    name: 'Python',
    year: 1991
  }
];

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim()); // See: https://github.com/moroshko/react-autosuggest/blob/master/demo/src/components/utils/utils.js#L2-L4

  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');

  return contacts.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) { // when suggestion selected, this function tells
  return suggestion.name;                 // what should be the value of the input
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.name}</span>
  );
}

export default class setRecipient extends React.Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: getSuggestions('')
    };

    this.onChange = this.onChange.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  onChange(event, { newValue, method }) {
    if (method === 'type') {
      this.setState({
        value: newValue,
        suggestions: getSuggestions(newValue)
      });
    } else {
      this.setState({
        value: newValue
      });
    }
  }

  onBlur(event, { value, valueBeforeUpDown, method }) {
    if (method !== 'click' && valueBeforeUpDown !== null && value !== valueBeforeUpDown) {
      this.setState({
        suggestions: getSuggestions(value)
      });
    }
  }

  onSuggestionSelected(event, { suggestionValue }) {
    this.setState({
      suggestions: getSuggestions(suggestionValue)
    });
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Select Contact',
      value,
      onChange: this.onChange,
      onBlur: this.onBlur
    };

    return (
      <Autosuggest suggestions={suggestions}
                   getSuggestionValue={getSuggestionValue}
                   renderSuggestion={renderSuggestion}
                   inputProps={inputProps}
                   onSuggestionSelected={this.onSuggestionSelected} />
    );
  }
}

module.exports = setRecipient;