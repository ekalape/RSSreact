import React, { ChangeEvent } from 'react';
import { InputSearch } from 'types/interfaces';

export default class Search extends React.Component<{}, InputSearch> {
  constructor(props: {}) {
    super(props);

    this.state = {
      searchText: '',
      sum: 0,
    };
  }

  onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        searchText: event.target.value,
      },
      () => {
        this.summarize();
        console.log(this.state);
      },
    );

    console.log(event.target.value);
  };

  summarize = () => {
    if (this.state.searchText.length > 0) {
      const s = this.state.searchText
        .split('')
        .map((x: string) => Number(x))
        .reduce((x, acc) => acc + x);
      this.setState({ sum: s });
    }
  };

  componentDidMount() {
    console.log('did mount');
    const storagedInput = localStorage.getItem('eklp-storagedInput');
    console.log(storagedInput);

    if (storagedInput) this.setState({ searchText: storagedInput }, () => this.summarize());
  }
  componentWillUnmount(): void {
    const { searchText } = this.state;
    localStorage.setItem('eklp-storagedInput', searchText);
    console.log('unmaunted');
  }
  componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<InputSearch>, snapshot?: any): void {}
  render(): React.ReactNode {
    return (
      <div className='search__wrapper'>
        <label htmlFor='search__input'>
          {this.state.sum}
          <br />
          <input
            type='text'
            role='searchbox'
            id='search__input'
            value={this.state.searchText}
            onChange={this.onChangeHandle.bind(this)}
          />
        </label>
      </div>
    );
  }
}
