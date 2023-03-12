import Card from '../Card';
import React from 'react';
import { UserInterface, SearchWordInterface } from '../../types/interfaces';
import getUsers from '../../utils';
import './style.css';
import UserData from '../../utils/UserData';

type CardsContainerStateType = { users: UserData[] };

export default class CardsContainer extends React.Component<SearchWordInterface, CardsContainerStateType> {
  usersData: UserData[];

  constructor(props: { searchWord: string }) {
    super(props);
    this.state = { users: [] };
    this.usersData = [];
    console.log('cardContainre constructor', this.props.searchWord);
  }

  async componentDidMount() {
    await this.loadUsers.call(this);
    this.setState({ users: this.usersData });
  }

  async componentDidUpdate(
    prevProps: Readonly<SearchWordInterface>,
    prevState: Readonly<CardsContainerStateType>,
    snapshot?: any,
  ) {
    if (prevProps.searchWord != this.props.searchWord) {
      await this.updateUsers.call(this);
    }
  }

  async loadUsers() {
    const rawUsers = await getUsers();
    this.usersData = rawUsers.map((u: UserInterface) => new UserData(u));
  }
  async updateUsers() {
    const newUsers = this.usersData.filter((u: UserData) => {
      const userSearchFields = Object.entries(u)
        .filter((key) => key[0] !== 'image')
        .map((key) => String(key[1]));
      return userSearchFields.some((key) => key.toLowerCase().includes(this.props.searchWord.toLowerCase()));
    });
    this.setState({ users: newUsers });
  }

  render(): React.ReactNode {
    console.log('rerender cards', this.state.users.length, this.props.searchWord);
    console.log(
      `this.usersData.length = ${this.usersData.length} and this.state.users.length = ${this.state.users.length}`,
    );

    return (
      <div className='main__cards-container cards__container'>
        {this.state.users.length > 0 ? this.state.users.map((u, i) => <Card {...u} key={u.id} />) : ''}
      </div>
    );
  }
}
