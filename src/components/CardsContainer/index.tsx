import Card from '../Card';
import React from 'react';
import { UserInterface } from '../../types/interfaces';
import getUsers from '../../utils';
import './style.css';

export default class CardsContainer extends React.Component<
  { searchWord: string },
  { users: UserInterface[] }
> {
  word: string;
  constructor(props: { searchWord: string }) {
    super(props);
    this.state = { users: [] };
    this.word = this.props.searchWord;
  }

  async componentDidMount() {
    const users = await getUsers();

    this.setState({
      users: users.filter((u: UserInterface) => JSON.stringify(u).toLowerCase().includes(this.word)),
    });
  }

  render(): React.ReactNode {
    return (
      <div className='main__cards-container cards__container'>
        {this.state.users.length > 0 && this.state.users.map((u, i) => <Card {...u} key={i} />)}
      </div>
    );
  }
}
