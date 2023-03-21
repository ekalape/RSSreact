import Form from '../Form';
import React from 'react';
import './style.css';
import { EmptyProps } from '../../types/interfaces';
import UserData from '../../utils/UserData';
import Card from '../../MainPage/Card';

export interface FormWrapperState {
  cards: UserData[];
}
export default class FormPage extends React.Component<EmptyProps, FormWrapperState> {
  cardNumber: number;
  constructor(props: EmptyProps) {
    super(props);
    this.cardNumber = 0;
    this.state = {
      cards: [],
    };
  }
  handleFormWrapperState(card: UserData) {
    this.setState({ cards: [...this.state.cards, card] }, () => console.log(this.state));
    this.cardNumber++;
  }
  render(): React.ReactNode {
    return (
      <div className="formsPage__wrapper" role={'forms-page'}>
        <Form cardNumber={this.cardNumber} callback={this.handleFormWrapperState.bind(this)} />
        <div className="formsResult-container">
          {this.state.cards.map((card) => (
            <Card {...card} key={card.id} />
          ))}
        </div>
      </div>
    );
  }
}
