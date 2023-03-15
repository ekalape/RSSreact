import Card from '../Card';
import React from 'react';
import { UserInterface, SearchWordInterface } from '../../types/interfaces';
import getUsers from '../../utils';
import './style.css';
import UserData from '../../utils/UserData';

type CardsContainerStateType = { users: UserData[] };

export default class CardsContainer extends React.Component<
  SearchWordInterface,
  CardsContainerStateType
> {
  usersData: UserData[];

  constructor(props: { searchWord: string }) {
    super(props);
    this.state = { users: [] };
    this.usersData = [];
  }

  async componentDidMount() {
    await this.loadUsers.call(this);
    await this.updateUsers.call(this);
  }

  async componentDidUpdate(prevProps: Readonly<SearchWordInterface>) {
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
      return userSearchFields.some((key) =>
        key.toLowerCase().includes(this.props.searchWord.toLowerCase())
      );
    });
    this.setState({ users: newUsers });
  }

  render(): React.ReactNode {
    return (
      <div className="main__cards-container cards__container" role="cards-container">
        {this.state.users.length > 0 ? (
          this.state.users.map((u) => <Card {...u} key={u.id} />)
        ) : (
          <p>No items found</p>
        )}
      </div>
    );
  }
}
