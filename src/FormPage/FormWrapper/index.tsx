import Form from '../Form';
import React from 'react';
import './style.css';
import { EmptyProps } from '../../types/interfaces';
import UserData from '../../utils/UserData';
import Card from '../../MainPage/Card';
import ModalInfoComponent from '../../UnrelatedComponents/ModalInfoComponent';

export interface FormWrapperState {
  cards: UserData[];
  showMessage: boolean;
}
export default class FormPage extends React.Component<EmptyProps, FormWrapperState> {
  cardNumber: number;
  constructor(props: EmptyProps) {
    super(props);
    this.cardNumber = 0;
    this.state = {
      cards: [],
      showMessage: false,
    };
  }
  handleFormWrapperState(card: UserData) {
    this.setState({ showMessage: true });
    setTimeout(() => {
      this.setState({ cards: [...this.state.cards, card] });
      this.cardNumber++;
      this.setState({ showMessage: false });
    }, 800);
  }
  render(): React.ReactNode {
    return (
      <>
        {this.state.showMessage && <ModalInfoComponent />}
        <div className="formsPage__wrapper" role={'forms-page'}>
          <Form cardNumber={this.cardNumber} callback={this.handleFormWrapperState.bind(this)} />
          <div className="main__cards-container" role="form-cards-container">
            {this.state.cards.map((card) => (
              <Card {...card} key={card.id} />
            ))}
          </div>
        </div>
      </>
    );
  }
}
